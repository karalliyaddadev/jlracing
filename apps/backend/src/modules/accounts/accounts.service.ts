import { prisma } from "../../database/prisma.client";
import { AppError } from "../../common/utils/errors";
import {
  ChequeStatus,
  PaymentMethod,
  TransactionDirection,
  TransactionType,
} from "../../generated/prisma";
import type {
  CreateAccountDto,
  UpdateAccountDto,
  CreateReceiptDto,
  UpdateReceiptDto,
  CreateVoucherDto,
  UpdateVoucherDto,
  ReceiptQueryDto,
  InvoiceQueueQueryDto,
  InvoicePaymentQueryDto,
  GenerateReceiptFromPaymentDto,
  CreateDepositDto,
  DepositQueryDto,
  VoucherQueryDto,
  LedgerQueryDto,
} from "./dto/account.dto";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function generateAccountCode(): Promise<string> {
  const count = await prisma.account.count();
  return `ACC-${String(count + 1).padStart(3, "0")}`;
}

function voucherTypeLabel(type: string): string {
  const map: Record<string, string> = {
    VEHICLE_CLEARANCE: "Vehicle Clearance Payment",
    BILL: "Bill",
    OTHER_PAYMENT: "Other Payment",
    PERMIT: "Permit Payment",
    LEASING_PAYMENT: "Leasing Payment",
    LOAN_PAYMENT: "Loan Payment",
    SALARY: "Salary",
    CUSTOMER_REFUND: "Customer Refund",
    VEHICLE_PURCHASE: "Vehicle Purchase",
    ADVANCE_REFUND: "Advance Invoice Refund",
    ACCOUNT_TRANSFER: "Account Transfer",
  };
  return map[type] ?? type;
}

function calculateTotalReceivable(p: {
  finalSellingPrice: number;
  totalWithInterest: number | null;
  hasRegistrationFee: boolean;
  registrationFeeAmount: number;
  purchaseChannel: string;
  leasingDownPaymentAmount: number;
}): number {
  const regFee = p.hasRegistrationFee ? p.registrationFeeAmount : 0;
  if (p.purchaseChannel === "LEASING") {
    return p.leasingDownPaymentAmount + regFee;
  }
  return (p.totalWithInterest ?? p.finalSellingPrice) + regFee;
}

// ─── Chart of Accounts ────────────────────────────────────────────────────────

export async function listAccounts() {
  return prisma.account.findMany({
    orderBy: { code: "asc" },
  });
}

export async function createAccount(dto: CreateAccountDto) {
  const code = await generateAccountCode();
  return prisma.account.create({
    data: {
      name: dto.name,
      type: dto.type,
      openingBalance: dto.openingBalance ?? 0,
      code,
    },
  });
}

export async function updateAccount(id: number, dto: UpdateAccountDto) {
  const account = await prisma.account.findUnique({ where: { id } });
  if (!account) throw AppError.notFound("Account not found");
  return prisma.account.update({
    where: { id },
    data: {
      ...(dto.name !== undefined && { name: dto.name }),
      ...(dto.type !== undefined && { type: dto.type }),
      ...(dto.openingBalance !== undefined && { openingBalance: dto.openingBalance }),
    },
  });
}

export async function toggleAccountActive(id: number) {
  const account = await prisma.account.findUnique({ where: { id } });
  if (!account) throw AppError.notFound("Account not found");
  return prisma.account.update({
    where: { id },
    data: { isActive: !account.isActive },
  });
}

// ─── Invoice Queue (for creating receipts) ───────────────────────────────────

export async function listPurchasesForReceipt(dto: InvoiceQueueQueryDto) {
  const fromDate = dto.from ? new Date(dto.from) : undefined;
  const toDate = dto.to ? new Date(dto.to + "T23:59:59.999Z") : undefined;

  const searchClause = dto.search?.trim()
    ? {
        OR: [
          {
            customer: {
              OR: [
                { firstName: { contains: dto.search, mode: "insensitive" as const } },
                { lastName: { contains: dto.search, mode: "insensitive" as const } },
                { nic: { contains: dto.search, mode: "insensitive" as const } },
              ],
            },
          },
          { invoiceGroupCode: { contains: dto.search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const purchases = await prisma.posCustomerPurchase.findMany({
    where: {
      ...searchClause,
      ...(fromDate && { purchasedAt: { gte: fromDate } }),
      ...(toDate && { purchasedAt: { lte: toDate } }),
    },
    include: {
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          nic: true,
          mobileNumber: true,
          address: true,
        },
      },
      bikeVehicle: {
        select: {
          displayId: true,
          brand: { select: { name: true } },
          model: { select: { name: true } },
        },
      },
      inventoryProduct: {
        select: { displayId: true, name: true },
      },
      receipts: {
        where: { isVoided: false },
        select: { amount: true },
      },
    },
    orderBy: { purchasedAt: "desc" },
    take: dto.limit,
  });

  const rows = purchases.map((p) => {
    const totalReceivable = calculateTotalReceivable(p);
    const totalReceipted = p.receipts.reduce((sum, r) => sum + r.amount, 0);
    const outstanding = Math.max(0, totalReceivable - totalReceipted);

    const itemLabel =
      p.bikeVehicle
        ? `${p.bikeVehicle.brand.name} ${p.bikeVehicle.model.name} (${p.bikeVehicle.displayId})`
        : p.inventoryProduct
        ? `${p.inventoryProduct.name} (${p.inventoryProduct.displayId})`
        : "—";

    return {
      id: p.id,
      invoiceRef: p.invoiceGroupCode ?? `INV-${String(p.id).padStart(5, "0")}`,
      customer: p.customer,
      itemLabel,
      itemType: p.itemType,
      purchaseChannel: p.purchaseChannel,
      paymentType: p.paymentType,
      finalSellingPrice: p.finalSellingPrice,
      hasRegistrationFee: p.hasRegistrationFee,
      registrationFeeAmount: p.registrationFeeAmount,
      leasingDownPaymentAmount: p.leasingDownPaymentAmount,
      totalReceivable,
      totalReceipted,
      outstanding,
      receiptCount: p.receipts.length,
      purchasedAt: p.purchasedAt,
    };
  });

  return dto.showAll ? rows : rows.filter((r) => r.outstanding > 0);
}

// ─── Receipts ─────────────────────────────────────────────────────────────────

export async function listReceipts(dto: ReceiptQueryDto) {
  const skip = (dto.page - 1) * dto.limit;

  const fromDate = dto.from ? new Date(`${dto.from}T00:00:00`) : undefined;
  const toDate = dto.to ? new Date(`${dto.to}T23:59:59.999`) : undefined;

  const where = {
    ...(dto.accountId && { accountId: dto.accountId }),
    ...(fromDate || toDate ? { createdAt: { ...(fromDate && { gte: fromDate }), ...(toDate && { lte: toDate }) } } : {}),
    ...(dto.search?.trim() && {
      OR: [
        { receiptNo: { contains: dto.search, mode: "insensitive" as const } },
        {
          purchase: {
            customer: {
              OR: [
                { firstName: { contains: dto.search, mode: "insensitive" as const } },
                { lastName: { contains: dto.search, mode: "insensitive" as const } },
                { nic: { contains: dto.search, mode: "insensitive" as const } },
              ],
            },
          },
        },
      ],
    }),
  };

  const [total, receipts] = await Promise.all([
    prisma.accountReceipt.count({ where }),
    prisma.accountReceipt.findMany({
      where,
      include: {
        account: { select: { id: true, name: true, code: true } },
        purchase: {
          select: {
            id: true,
            invoiceGroupCode: true,
            customer: { select: { firstName: true, lastName: true, nic: true, mobileNumber: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: dto.limit,
    }),
  ]);

  return {
    data: receipts,
    pagination: { total, page: dto.page, limit: dto.limit, pages: Math.ceil(total / dto.limit) },
  };
}

export async function createReceipt(dto: CreateReceiptDto, adminId: number) {
  const [account, purchase] = await Promise.all([
    prisma.account.findUnique({ where: { id: dto.accountId } }),
    prisma.posCustomerPurchase.findUnique({ where: { id: dto.purchaseId } }),
  ]);
  if (!account || !account.isActive) throw AppError.notFound("Account not found or inactive");
  if (!purchase) throw AppError.notFound("Purchase/invoice not found");

  const isChecque = dto.paymentMethod === PaymentMethod.CHEQUE;

  return prisma.$transaction(async (tx) => {
    const created = await tx.accountReceipt.create({
      data: {
        receiptNo: "TEMP",
        purchaseId: dto.purchaseId,
        accountId: dto.accountId,
        amount: dto.amount,
        paymentMethod: dto.paymentMethod,
        chequeNo: isChecque ? dto.chequeNo : undefined,
        chequeBank: isChecque ? dto.chequeBank : undefined,
        chequeDate: isChecque ? dto.chequeDate : undefined,
        chequeStatus: isChecque ? ChequeStatus.PENDING : undefined,
        description: dto.description,
        createdById: adminId,
      },
    });

    const receiptNo = `REC-${String(created.id).padStart(5, "0")}`;

    const [receipt] = await Promise.all([
      tx.accountReceipt.update({
        where: { id: created.id },
        data: { receiptNo },
        include: {
          account: { select: { id: true, name: true, code: true } },
          purchase: {
            select: {
              id: true,
              invoiceGroupCode: true,
              customer: { select: { firstName: true, lastName: true, nic: true, mobileNumber: true, address: true } },
            },
          },
        },
      }),
      tx.accountTransaction.create({
        data: {
          accountId: dto.accountId,
          type: TransactionType.RECEIPT,
          direction: TransactionDirection.DR,
          amount: dto.amount,
          receiptId: created.id,
          refNo: receiptNo,
          description: dto.description,
          chequeNo: isChecque ? dto.chequeNo : undefined,
          createdById: adminId,
        },
      }),
    ]);

    return receipt;
  });
}

export async function updateReceipt(id: number, dto: UpdateReceiptDto, adminId: number) {
  const receipt = await prisma.accountReceipt.findUnique({
    where: { id },
    include: { transactions: { where: { isReversal: false } } },
  });
  if (!receipt) throw AppError.notFound("Receipt not found");
  if (receipt.isVoided) throw new AppError("Cannot edit a voided receipt", 400);

  if (dto.accountId !== undefined) {
    const account = await prisma.account.findUnique({ where: { id: dto.accountId } });
    if (!account || !account.isActive) throw AppError.notFound("Account not found or inactive");
  }

  const isChecque =
    (dto.paymentMethod ?? receipt.paymentMethod) === PaymentMethod.CHEQUE;

  return prisma.$transaction(async (tx) => {
    const originalTx = receipt.transactions.find((t) => t.type === TransactionType.RECEIPT);

    if (originalTx) {
      await tx.accountTransaction.update({
        where: { id: originalTx.id },
        data: {
          ...(dto.amount !== undefined && { amount: dto.amount }),
          ...(dto.accountId !== undefined && { accountId: dto.accountId }),
          ...(dto.description !== undefined && { description: dto.description }),
          ...(isChecque && dto.chequeNo !== undefined && { chequeNo: dto.chequeNo }),
        },
      });
    }

    return tx.accountReceipt.update({
      where: { id },
      data: {
        ...(dto.amount !== undefined && { amount: dto.amount }),
        ...(dto.accountId !== undefined && { accountId: dto.accountId }),
        ...(dto.paymentMethod !== undefined && { paymentMethod: dto.paymentMethod }),
        ...(isChecque && dto.chequeNo !== undefined && { chequeNo: dto.chequeNo }),
        ...(isChecque && dto.chequeBank !== undefined && { chequeBank: dto.chequeBank }),
        ...(isChecque && dto.chequeDate !== undefined && { chequeDate: dto.chequeDate }),
        ...(dto.description !== undefined && { description: dto.description }),
      },
      include: {
        account: { select: { id: true, name: true, code: true } },
        purchase: {
          select: {
            id: true,
            invoiceGroupCode: true,
            customer: { select: { firstName: true, lastName: true, nic: true } },
          },
        },
      },
    });
  });
}

export async function voidReceipt(id: number, adminId: number) {
  const receipt = await prisma.accountReceipt.findUnique({
    where: { id },
    include: { transactions: true },
  });
  if (!receipt) throw AppError.notFound("Receipt not found");
  if (receipt.isVoided) throw new AppError("Receipt is already voided", 400);

  const originalTx = receipt.transactions.find(
    (t) => t.type === TransactionType.RECEIPT && !t.isReversal
  );

  return prisma.$transaction(async (tx) => {
    await tx.accountReceipt.update({ where: { id }, data: { isVoided: true } });

    if (originalTx && receipt.accountId) {
      await tx.accountTransaction.create({
        data: {
          accountId: receipt.accountId,
          type: TransactionType.REVERSAL,
          direction: TransactionDirection.CR,
          amount: originalTx.amount,
          receiptId: id,
          refNo: receipt.receiptNo,
          description: `Void of ${receipt.receiptNo}`,
          isReversal: true,
          createdById: adminId,
        },
      });
    }

    return { message: "Receipt voided successfully" };
  });
}

export async function bounceReceipt(id: number, adminId: number) {
  const receipt = await prisma.accountReceipt.findUnique({
    where: { id },
    include: { transactions: true },
  });
  if (!receipt) throw AppError.notFound("Receipt not found");
  if (receipt.paymentMethod !== PaymentMethod.CHEQUE) {
    throw new AppError("Only cheque receipts can be marked as bounced", 400);
  }
  if (receipt.chequeStatus !== ChequeStatus.PENDING) {
    throw new AppError("Cheque is not in PENDING status", 400);
  }

  const originalTx = receipt.transactions.find(
    (t) =>
      (t.type === TransactionType.RECEIPT || t.type === TransactionType.DEPOSIT) &&
      !t.isReversal
  );

  return prisma.$transaction(async (tx) => {
    await tx.accountReceipt.update({
      where: { id },
      data: { chequeStatus: ChequeStatus.BOUNCED },
    });

    if (originalTx && receipt.accountId) {
      await tx.accountTransaction.create({
        data: {
          accountId: receipt.accountId,
          type: TransactionType.REVERSAL,
          direction: TransactionDirection.CR,
          amount: originalTx.amount,
          receiptId: id,
          refNo: receipt.receiptNo,
          description: `Cheque bounced: ${receipt.receiptNo}`,
          chequeNo: receipt.chequeNo ?? undefined,
          isReversal: true,
          createdById: adminId,
        },
      });
    }

    return { message: "Cheque marked as bounced and transaction reversed" };
  });
}

export async function clearCheque(id: number) {
  const receipt = await prisma.accountReceipt.findUnique({ where: { id } });
  if (!receipt) throw AppError.notFound("Receipt not found");
  if (receipt.paymentMethod !== PaymentMethod.CHEQUE) {
    throw new AppError("Not a cheque receipt", 400);
  }
  if (receipt.chequeStatus !== ChequeStatus.PENDING) {
    throw new AppError("Cheque is not in PENDING status", 400);
  }
  return prisma.accountReceipt.update({
    where: { id },
    data: { chequeStatus: ChequeStatus.CLEARED },
  });
}

export async function getReceiptById(id: number) {
  const receipt = await prisma.accountReceipt.findUnique({
    where: { id },
    include: {
      account: { select: { id: true, name: true, code: true, type: true } },
      purchase: {
        select: {
          id: true,
          invoiceGroupCode: true,
          finalSellingPrice: true,
          hasRegistrationFee: true,
          registrationFeeAmount: true,
          purchaseChannel: true,
          leasingDownPaymentAmount: true,
          customer: {
            select: {
              firstName: true,
              lastName: true,
              nic: true,
              mobileNumber: true,
              address: true,
              district: true,
            },
          },
          bikeVehicle: {
            select: { displayId: true, brand: { select: { name: true } }, model: { select: { name: true } } },
          },
          inventoryProduct: { select: { displayId: true, name: true } },
        },
      },
    },
  });
  if (!receipt) throw AppError.notFound("Receipt not found");
  return receipt;
}

// ─── Vouchers ─────────────────────────────────────────────────────────────────

export async function listVouchers(dto: VoucherQueryDto) {
  const skip = (dto.page - 1) * dto.limit;
  const where = dto.accountId ? { accountId: dto.accountId } : {};

  const [total, vouchers] = await Promise.all([
    prisma.accountVoucher.count({ where }),
    prisma.accountVoucher.findMany({
      where,
      include: {
        account: { select: { id: true, name: true, code: true } },
        toAccount: { select: { id: true, name: true, code: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: dto.limit,
    }),
  ]);

  return {
    data: vouchers.map((v) => ({ ...v, typeLabel: voucherTypeLabel(v.type) })),
    pagination: { total, page: dto.page, limit: dto.limit, pages: Math.ceil(total / dto.limit) },
  };
}

export async function createVoucher(dto: CreateVoucherDto, adminId: number) {
  const account = await prisma.account.findUnique({ where: { id: dto.accountId } });
  if (!account || !account.isActive) throw AppError.notFound("Account not found or inactive");

  let toAccount = null;
  if (dto.type === "ACCOUNT_TRANSFER") {
    toAccount = await prisma.account.findUnique({ where: { id: dto.toAccountId } });
    if (!toAccount || !toAccount.isActive) throw AppError.notFound("Destination account not found or inactive");
  }

  const allTx = await prisma.accountTransaction.findMany({
    where: { accountId: dto.accountId },
    select: { direction: true, amount: true },
  });
  const currentBalance =
    account.openingBalance +
    allTx.reduce(
      (sum, t) => sum + (t.direction === TransactionDirection.DR ? t.amount : -t.amount),
      0
    );
  if (currentBalance < dto.amount) {
    throw new AppError(
      `Insufficient funds. Available balance: Rs. ${currentBalance.toLocaleString("en-LK", { minimumFractionDigits: 2 })}`,
      400
    );
  }

  return prisma.$transaction(async (tx) => {
    const created = await tx.accountVoucher.create({
      data: {
        voucherNo: "TEMP",
        accountId: dto.accountId,
        toAccountId: dto.type === "ACCOUNT_TRANSFER" ? dto.toAccountId : undefined,
        type: dto.type,
        amount: dto.amount,
        description: dto.description,
        payee: dto.payee,
        paymentDate: dto.paymentDate,
        referenceNo: dto.referenceNo,
        createdById: adminId,
      },
    });

    const voucherNo = `VCH-${String(created.id).padStart(5, "0")}`;

    if (dto.type === "ACCOUNT_TRANSFER" && toAccount) {
      const [voucher] = await Promise.all([
        tx.accountVoucher.update({
          where: { id: created.id },
          data: { voucherNo },
          include: {
            account: { select: { id: true, name: true, code: true } },
            toAccount: { select: { id: true, name: true, code: true } },
          },
        }),
        // CR on source account (money leaves)
        tx.accountTransaction.create({
          data: {
            accountId: dto.accountId,
            type: TransactionType.TRANSFER,
            direction: TransactionDirection.CR,
            amount: dto.amount,
            voucherId: created.id,
            refNo: voucherNo,
            description: dto.description ?? `Transfer to ${toAccount.name}`,
            createdById: adminId,
          },
        }),
        // DR on destination account (money enters)
        tx.accountTransaction.create({
          data: {
            accountId: dto.toAccountId!,
            type: TransactionType.TRANSFER,
            direction: TransactionDirection.DR,
            amount: dto.amount,
            voucherId: created.id,
            refNo: voucherNo,
            description: dto.description ?? `Transfer from ${account.name}`,
            createdById: adminId,
          },
        }),
      ]);

      return { ...voucher, typeLabel: voucherTypeLabel(voucher.type) };
    }

    const [voucher] = await Promise.all([
      tx.accountVoucher.update({
        where: { id: created.id },
        data: { voucherNo },
        include: {
          account: { select: { id: true, name: true, code: true } },
          toAccount: { select: { id: true, name: true, code: true } },
        },
      }),
      tx.accountTransaction.create({
        data: {
          accountId: dto.accountId,
          type: TransactionType.VOUCHER,
          direction: TransactionDirection.CR,
          amount: dto.amount,
          voucherId: created.id,
          refNo: voucherNo,
          description: dto.description ?? voucherTypeLabel(dto.type),
          createdById: adminId,
        },
      }),
    ]);

    return { ...voucher, typeLabel: voucherTypeLabel(voucher.type) };
  });
}

export async function updateVoucher(id: number, dto: UpdateVoucherDto, adminId: number) {
  const voucher = await prisma.accountVoucher.findUnique({
    where: { id },
    include: { transactions: { where: { isReversal: false } } },
  });
  if (!voucher) throw AppError.notFound("Voucher not found");
  if (voucher.isVoided) throw new AppError("Cannot edit a voided voucher", 400);

  const isTransfer = voucher.type === "ACCOUNT_TRANSFER";

  if (isTransfer && (dto.type !== undefined || dto.amount !== undefined)) {
    throw new AppError("Type and amount cannot be changed on an account transfer", 400);
  }

  const originalTx = isTransfer
    ? null
    : voucher.transactions.find((t) => t.type === TransactionType.VOUCHER);

  return prisma.$transaction(async (tx) => {
    if (originalTx && dto.amount !== undefined) {
      await tx.accountTransaction.update({
        where: { id: originalTx.id },
        data: {
          amount: dto.amount,
          ...(dto.description !== undefined && { description: dto.description }),
        },
      });
    }

    const updated = await tx.accountVoucher.update({
      where: { id },
      data: {
        ...(dto.type !== undefined && { type: dto.type }),
        ...(dto.amount !== undefined && { amount: dto.amount }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(!isTransfer && dto.payee !== undefined && { payee: dto.payee }),
        ...(dto.paymentDate !== undefined && { paymentDate: dto.paymentDate }),
        ...(dto.referenceNo !== undefined && { referenceNo: dto.referenceNo }),
      },
      include: {
        account: { select: { id: true, name: true, code: true } },
        toAccount: { select: { id: true, name: true, code: true } },
      },
    });

    return { ...updated, typeLabel: voucherTypeLabel(updated.type) };
  });
}

export async function voidVoucher(id: number, adminId: number) {
  const voucher = await prisma.accountVoucher.findUnique({
    where: { id },
    include: { transactions: true },
  });
  if (!voucher) throw AppError.notFound("Voucher not found");
  if (voucher.isVoided) throw new AppError("Voucher is already voided", 400);

  const isTransfer = voucher.type === "ACCOUNT_TRANSFER";

  return prisma.$transaction(async (tx) => {
    await tx.accountVoucher.update({ where: { id }, data: { isVoided: true } });

    if (isTransfer) {
      // Find the two TRANSFER transactions (one CR on source, one DR on dest)
      const sourceTx = voucher.transactions.find(
        (t) => t.type === TransactionType.TRANSFER && t.direction === TransactionDirection.CR && !t.isReversal
      );
      const destTx = voucher.transactions.find(
        (t) => t.type === TransactionType.TRANSFER && t.direction === TransactionDirection.DR && !t.isReversal
      );

      const reversals: Promise<unknown>[] = [];

      if (sourceTx) {
        // Restore source account: DR reversal
        reversals.push(
          tx.accountTransaction.create({
            data: {
              accountId: sourceTx.accountId,
              type: TransactionType.REVERSAL,
              direction: TransactionDirection.DR,
              amount: sourceTx.amount,
              voucherId: id,
              refNo: voucher.voucherNo,
              description: `Void of transfer ${voucher.voucherNo}`,
              isReversal: true,
              createdById: adminId,
            },
          })
        );
      }

      if (destTx) {
        // Remove from destination account: CR reversal
        reversals.push(
          tx.accountTransaction.create({
            data: {
              accountId: destTx.accountId,
              type: TransactionType.REVERSAL,
              direction: TransactionDirection.CR,
              amount: destTx.amount,
              voucherId: id,
              refNo: voucher.voucherNo,
              description: `Void of transfer ${voucher.voucherNo}`,
              isReversal: true,
              createdById: adminId,
            },
          })
        );
      }

      await Promise.all(reversals);
    } else {
      const originalTx = voucher.transactions.find(
        (t) => t.type === TransactionType.VOUCHER && !t.isReversal
      );

      if (originalTx) {
        await tx.accountTransaction.create({
          data: {
            accountId: voucher.accountId,
            type: TransactionType.REVERSAL,
            direction: TransactionDirection.DR,
            amount: originalTx.amount,
            voucherId: id,
            refNo: voucher.voucherNo,
            description: `Void of ${voucher.voucherNo}`,
            isReversal: true,
            createdById: adminId,
          },
        });
      }
    }

    return { message: "Voucher voided successfully" };
  });
}

export async function getVoucherById(id: number) {
  const voucher = await prisma.accountVoucher.findUnique({
    where: { id },
    include: {
      account: { select: { id: true, name: true, code: true, type: true } },
      toAccount: { select: { id: true, name: true, code: true, type: true } },
    },
  });
  if (!voucher) throw AppError.notFound("Voucher not found");
  return { ...voucher, typeLabel: voucherTypeLabel(voucher.type) };
}

// ─── Invoice Payment Queue ────────────────────────────────────────────────────

export async function listInvoicePayments(dto: InvoicePaymentQueryDto) {
  const skip = (dto.page - 1) * dto.limit;

  const fromDate = dto.from ? new Date(`${dto.from}T00:00:00`) : undefined;
  const toDate = dto.to ? new Date(`${dto.to}T23:59:59.999`) : undefined;

  const searchClause = dto.search?.trim()
    ? {
        purchase: {
          OR: [
            { customer: { firstName: { contains: dto.search, mode: "insensitive" as const } } },
            { customer: { lastName: { contains: dto.search, mode: "insensitive" as const } } },
            { customer: { nic: { contains: dto.search, mode: "insensitive" as const } } },
            { invoiceGroupCode: { contains: dto.search, mode: "insensitive" as const } },
          ],
        },
      }
    : {};

  const where = {
    receiptId: null,
    ...searchClause,
    ...(fromDate || toDate
      ? { paidAt: { ...(fromDate && { gte: fromDate }), ...(toDate && { lte: toDate }) } }
      : {}),
  };

  const [total, payments] = await Promise.all([
    prisma.invoicePayment.count({ where }),
    prisma.invoicePayment.findMany({
      where,
      include: {
        purchase: {
          select: {
            id: true,
            invoiceGroupCode: true,
            customer: { select: { firstName: true, lastName: true, nic: true, mobileNumber: true } },
            bikeVehicle: {
              select: { displayId: true, brand: { select: { name: true } }, model: { select: { name: true } } },
            },
            inventoryProduct: { select: { displayId: true, name: true } },
          },
        },
      },
      orderBy: { paidAt: "desc" },
      skip,
      take: dto.limit,
    }),
  ]);

  const data = payments.map((p) => ({
    ...p,
    invoiceRef: p.purchase.invoiceGroupCode ?? `INV-${String(p.purchaseId).padStart(5, "0")}`,
    itemLabel: p.purchase.bikeVehicle
      ? `${p.purchase.bikeVehicle.brand.name} ${p.purchase.bikeVehicle.model.name} (${p.purchase.bikeVehicle.displayId})`
      : p.purchase.inventoryProduct
      ? `${p.purchase.inventoryProduct.name} (${p.purchase.inventoryProduct.displayId})`
      : "—",
  }));

  return {
    data,
    pagination: { total, page: dto.page, limit: dto.limit, pages: Math.ceil(total / dto.limit) },
  };
}

export async function generateReceiptFromPayment(
  paymentId: number,
  dto: GenerateReceiptFromPaymentDto,
  adminId: number,
) {
  const payment = await prisma.invoicePayment.findUnique({
    where: { id: paymentId },
    include: { purchase: true },
  });
  if (!payment) throw AppError.notFound("Invoice payment not found");
  if (payment.receiptId !== null) throw new AppError("Receipt already generated for this payment", 400);

  const isChecque = payment.paymentMethod === PaymentMethod.CHEQUE;

  return prisma.$transaction(async (tx) => {
    const created = await tx.accountReceipt.create({
      data: {
        receiptNo: "TEMP",
        purchaseId: payment.purchaseId,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        chequeNo: isChecque ? (payment.chequeNo ?? undefined) : undefined,
        chequeBank: isChecque ? (payment.chequeBank ?? undefined) : undefined,
        chequeDate: isChecque ? (payment.chequeDate ?? undefined) : undefined,
        chequeStatus: isChecque ? ChequeStatus.PENDING : undefined,
        description: dto.description ?? payment.description ?? undefined,
        createdById: adminId,
      },
    });

    const receiptNo = `REC-${String(created.id).padStart(5, "0")}`;

    const [receipt] = await Promise.all([
      tx.accountReceipt.update({
        where: { id: created.id },
        data: { receiptNo },
        include: {
          account: { select: { id: true, name: true, code: true } },
          purchase: {
            select: {
              id: true,
              invoiceGroupCode: true,
              customer: { select: { firstName: true, lastName: true, nic: true, mobileNumber: true, address: true } },
              bikeVehicle: {
                select: { displayId: true, brand: { select: { name: true } }, model: { select: { name: true } } },
              },
              inventoryProduct: { select: { displayId: true, name: true } },
            },
          },
        },
      }),
      tx.invoicePayment.update({
        where: { id: paymentId },
        data: { receiptId: created.id },
      }),
    ]);

    return receipt;
  });
}

// ─── Deposits ─────────────────────────────────────────────────────────────────

export async function listDeposits(dto: DepositQueryDto) {
  const skip = (dto.page - 1) * dto.limit;
  const fromDate = dto.from ? new Date(`${dto.from}T00:00:00`) : undefined;
  const toDate = dto.to ? new Date(`${dto.to}T23:59:59.999`) : undefined;

  const where = {
    ...(dto.accountId && { accountId: dto.accountId }),
    ...(fromDate || toDate
      ? { createdAt: { ...(fromDate && { gte: fromDate }), ...(toDate && { lte: toDate }) } }
      : {}),
  };

  const [total, deposits] = await Promise.all([
    prisma.accountDeposit.count({ where }),
    prisma.accountDeposit.findMany({
      where,
      include: {
        account: { select: { id: true, name: true, code: true } },
        items: { select: { id: true, receiptId: true, amount: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: dto.limit,
    }),
  ]);

  return {
    data: deposits.map((d) => ({ ...d, receiptCount: d.items.length })),
    pagination: { total, page: dto.page, limit: dto.limit, pages: Math.ceil(total / dto.limit) },
  };
}

export async function getDeposit(id: number) {
  const deposit = await prisma.accountDeposit.findUnique({
    where: { id },
    include: {
      account: { select: { id: true, name: true, code: true } },
      items: {
        include: {
          receipt: {
            include: {
              purchase: {
                select: {
                  id: true,
                  invoiceGroupCode: true,
                  customer: { select: { firstName: true, lastName: true, nic: true } },
                },
              },
            },
          },
        },
      },
    },
  });
  if (!deposit) throw AppError.notFound("Deposit not found");
  return deposit;
}

export async function createDeposit(dto: CreateDepositDto, adminId: number) {
  const account = await prisma.account.findUnique({ where: { id: dto.accountId } });
  if (!account || !account.isActive) throw AppError.notFound("Account not found or inactive");

  const receipts = await prisma.accountReceipt.findMany({
    where: { id: { in: dto.receiptIds }, isVoided: false, isDeposited: false },
  });

  if (receipts.length !== dto.receiptIds.length) {
    throw new AppError("Some receipts are invalid, already deposited, or voided", 400);
  }

  const totalAmount = receipts.reduce((sum, r) => sum + r.amount, 0);

  return prisma.$transaction(async (tx) => {
    // Receipts are confirmed isDeposited=false above, so any existing deposit items
    // for them must belong to previously reversed deposits. Remove them so re-deposit works.
    await tx.accountDepositItem.deleteMany({
      where: { receiptId: { in: receipts.map((r) => r.id) } },
    });

    const deposit = await tx.accountDeposit.create({
      data: {
        depositNo: "TEMP",
        accountId: dto.accountId,
        totalAmount,
        notes: dto.notes,
        createdById: adminId,
      },
    });

    const depositNo = `DEP-${String(deposit.id).padStart(5, "0")}`;

    await Promise.all([
      tx.accountDeposit.update({ where: { id: deposit.id }, data: { depositNo } }),
      tx.accountDepositItem.createMany({
        data: receipts.map((r) => ({ depositId: deposit.id, receiptId: r.id, amount: r.amount })),
      }),
      tx.accountReceipt.updateMany({
        where: { id: { in: dto.receiptIds } },
        data: { isDeposited: true, accountId: dto.accountId },
      }),
      tx.accountTransaction.create({
        data: {
          accountId: dto.accountId,
          type: TransactionType.DEPOSIT,
          direction: TransactionDirection.DR,
          amount: totalAmount,
          depositId: deposit.id,
          refNo: depositNo,
          description: dto.notes ?? `Deposit batch ${depositNo}`,
          createdById: adminId,
        },
      }),
    ]);

    return { ...deposit, depositNo, receiptCount: receipts.length };
  });
}

export async function reverseDeposit(depositId: number, adminId: number) {
  const deposit = await prisma.accountDeposit.findUnique({
    where: { id: depositId },
    include: { items: true },
  });
  if (!deposit) throw AppError.notFound("Deposit not found");
  if (deposit.isReversed) throw new AppError("Deposit is already reversed", 400);

  return prisma.$transaction(async (tx) => {
    await tx.accountDeposit.update({
      where: { id: depositId },
      data: { isReversed: true, reversedAt: new Date() },
    });

    // Remove deposit items so the same receipts can be re-deposited after reversal.
    // The AccountDeposit record + AccountTransaction provide the full audit trail.
    await tx.accountDepositItem.deleteMany({ where: { depositId } });

    await tx.accountReceipt.updateMany({
      where: { id: { in: deposit.items.map((i) => i.receiptId) } },
      data: { isDeposited: false },
    });

    await tx.accountTransaction.create({
      data: {
        accountId: deposit.accountId,
        type: TransactionType.REVERSAL,
        direction: TransactionDirection.CR,
        amount: deposit.totalAmount,
        depositId,
        refNo: deposit.depositNo,
        description: `Reversal of deposit ${deposit.depositNo}`,
        isReversal: true,
        createdById: adminId,
      },
    });

    return { message: "Deposit reversed successfully" };
  });
}

// ─── General Ledger ───────────────────────────────────────────────────────────

export async function getLedger(dto: LedgerQueryDto) {
  const account = await prisma.account.findUnique({ where: { id: dto.accountId } });
  if (!account) throw AppError.notFound("Account not found");

  const fromDate = new Date(dto.from);
  const toDate = new Date(dto.to + "T23:59:59.999Z");

  // Opening balance = account.openingBalance + all DR before fromDate - all CR before fromDate
  const preTransactions = await prisma.accountTransaction.findMany({
    where: {
      accountId: dto.accountId,
      createdAt: { lt: fromDate },
    },
    select: { direction: true, amount: true },
  });

  const openingBalance =
    account.openingBalance +
    preTransactions.reduce((sum, t) => {
      return sum + (t.direction === TransactionDirection.DR ? t.amount : -t.amount);
    }, 0);

  // Transactions within date range
  const transactions = await prisma.accountTransaction.findMany({
    where: {
      accountId: dto.accountId,
      createdAt: { gte: fromDate, lte: toDate },
    },
    orderBy: { createdAt: "asc" },
  });

  let runningBalance = openingBalance;
  const rows = transactions.map((t) => {
    const drAmount = t.direction === TransactionDirection.DR ? t.amount : 0;
    const crAmount = t.direction === TransactionDirection.CR ? t.amount : 0;
    runningBalance = runningBalance + drAmount - crAmount;

    return {
      id: t.id,
      type: t.type,
      typeLabel: t.isReversal
        ? "Reversal"
        : t.type === TransactionType.RECEIPT
        ? "Receipt"
        : t.type === TransactionType.DEPOSIT
        ? "Deposit"
        : t.type === TransactionType.TRANSFER
        ? "Transfer"
        : "Voucher",
      refNo: t.refNo,
      createdById: t.createdById,
      date: t.createdAt,
      description: t.description,
      chequeNo: t.chequeNo,
      drAmount,
      crAmount,
      balance: runningBalance,
    };
  });

  const totalDr = rows.reduce((s, r) => s + r.drAmount, 0);
  const totalCr = rows.reduce((s, r) => s + r.crAmount, 0);

  return {
    account: { id: account.id, name: account.name, code: account.code, type: account.type },
    openingBalance,
    rows,
    totalDr,
    totalCr,
    closingBalance: openingBalance + totalDr - totalCr,
  };
}

// ─── Account Balance ──────────────────────────────────────────────────────────

export async function getAccountBalance(accountId: number) {
  const account = await prisma.account.findUnique({ where: { id: accountId } });
  if (!account) throw AppError.notFound("Account not found");

  const transactions = await prisma.accountTransaction.findMany({
    where: { accountId },
    select: { direction: true, amount: true },
  });

  const balance =
    account.openingBalance +
    transactions.reduce(
      (sum, t) => sum + (t.direction === TransactionDirection.DR ? t.amount : -t.amount),
      0
    );

  return { accountId, balance };
}
