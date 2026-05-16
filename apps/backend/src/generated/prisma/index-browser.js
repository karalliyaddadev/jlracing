
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  passwordHash: 'passwordHash',
  role: 'role',
  refreshToken: 'refreshToken',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BikeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  brand: 'brand',
  model: 'model',
  year: 'year',
  price: 'price',
  inStock: 'inStock',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PosAdminScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  passwordHash: 'passwordHash',
  isActive: 'isActive',
  lastLoginAt: 'lastLoginAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BikeBrandScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BikeModelScalarFieldEnum = {
  id: 'id',
  name: 'name',
  brandId: 'brandId',
  lowStockThreshold: 'lowStockThreshold',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BikeColorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BikeSupplierScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  contactPerson: 'contactPerson',
  telephone: 'telephone',
  address: 'address',
  fax: 'fax',
  email: 'email',
  vatRegistrationNo: 'vatRegistrationNo',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BikeVehicleScalarFieldEnum = {
  id: 'id',
  displayId: 'displayId',
  brandId: 'brandId',
  modelId: 'modelId',
  supplierId: 'supplierId',
  colour: 'colour',
  engineCapacityCc: 'engineCapacityCc',
  year: 'year',
  fileNo: 'fileNo',
  manufactureDate: 'manufactureDate',
  registerNo: 'registerNo',
  chassisNo: 'chassisNo',
  engineNo: 'engineNo',
  registrationType: 'registrationType',
  condition: 'condition',
  mileage: 'mileage',
  description: 'description',
  purchasePrice: 'purchasePrice',
  taxAmount: 'taxAmount',
  sellingPrice: 'sellingPrice',
  status: 'status',
  soldAt: 'soldAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BikeVehicleImageScalarFieldEnum = {
  id: 'id',
  vehicleId: 'vehicleId',
  url: 'url',
  isPrimary: 'isPrimary',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.BikeVehicleExpenseScalarFieldEnum = {
  id: 'id',
  vehicleId: 'vehicleId',
  description: 'description',
  amount: 'amount',
  createdAt: 'createdAt'
};

exports.Prisma.InventoryBrandScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InventoryCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InventoryProductScalarFieldEnum = {
  id: 'id',
  displayId: 'displayId',
  brandId: 'brandId',
  categoryId: 'categoryId',
  supplierId: 'supplierId',
  name: 'name',
  partNumber: 'partNumber',
  compatibleWith: 'compatibleWith',
  quantity: 'quantity',
  soldQuantity: 'soldQuantity',
  lowStockThreshold: 'lowStockThreshold',
  purchasePrice: 'purchasePrice',
  taxPaid: 'taxPaid',
  additionalExpenses: 'additionalExpenses',
  sellingPrice: 'sellingPrice',
  description: 'description',
  lastSoldAt: 'lastSoldAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InventoryProductExpenseScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  description: 'description',
  amount: 'amount',
  createdAt: 'createdAt'
};

exports.Prisma.InventoryProductImageScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  url: 'url',
  isPrimary: 'isPrimary',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.PosCustomerScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  nic: 'nic',
  mobileNumber: 'mobileNumber',
  email: 'email',
  province: 'province',
  district: 'district',
  address: 'address',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PosLeasingCompanyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PosCustomerDreamBikeScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  bikeVehicleId: 'bikeVehicleId',
  createdAt: 'createdAt'
};

exports.Prisma.PosCustomerPurchaseScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  itemType: 'itemType',
  purchaseMode: 'purchaseMode',
  invoiceGroupCode: 'invoiceGroupCode',
  bikeVehicleId: 'bikeVehicleId',
  inventoryProductId: 'inventoryProductId',
  currentSellingPrice: 'currentSellingPrice',
  finalSellingPrice: 'finalSellingPrice',
  paymentType: 'paymentType',
  downPaymentAmount: 'downPaymentAmount',
  remainingAmount: 'remainingAmount',
  settlementStatus: 'settlementStatus',
  purchaseChannel: 'purchaseChannel',
  leasingCompanyId: 'leasingCompanyId',
  leasingDownPaymentAmount: 'leasingDownPaymentAmount',
  leasingFinancedAmount: 'leasingFinancedAmount',
  hasRegistrationFee: 'hasRegistrationFee',
  registrationFeeAmount: 'registrationFeeAmount',
  quantity: 'quantity',
  purchasedAt: 'purchasedAt'
};

exports.Prisma.PosInvoiceTermScalarFieldEnum = {
  id: 'id',
  text: 'text',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PreOrderScalarFieldEnum = {
  id: 'id',
  displayId: 'displayId',
  brand: 'brand',
  model: 'model',
  year: 'year',
  cc: 'cc',
  colour: 'colour',
  price: 'price',
  depositRequired: 'depositRequired',
  expectedArrival: 'expectedArrival',
  status: 'status',
  description: 'description',
  pdfUrl: 'pdfUrl',
  isPublished: 'isPublished',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PreOrderImageScalarFieldEnum = {
  id: 'id',
  preOrderId: 'preOrderId',
  url: 'url',
  isPrimary: 'isPrimary',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.ContactRequestScalarFieldEnum = {
  id: 'id',
  displayId: 'displayId',
  name: 'name',
  email: 'email',
  phone: 'phone',
  city: 'city',
  interests: 'interests',
  message: 'message',
  status: 'status',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExportVehicleScalarFieldEnum = {
  id: 'id',
  displayId: 'displayId',
  category: 'category',
  brand: 'brand',
  model: 'model',
  year: 'year',
  colour: 'colour',
  engineCc: 'engineCc',
  mileage: 'mileage',
  condition: 'condition',
  description: 'description',
  price: 'price',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExportVehicleImageScalarFieldEnum = {
  id: 'id',
  vehicleId: 'vehicleId',
  url: 'url',
  isPrimary: 'isPrimary',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER'
};

exports.PosPurchaseItemType = exports.$Enums.PosPurchaseItemType = {
  BIKE: 'BIKE',
  INVENTORY: 'INVENTORY'
};

exports.PosPurchaseMode = exports.$Enums.PosPurchaseMode = {
  SINGLE: 'SINGLE',
  BULK: 'BULK'
};

exports.PosPaymentType = exports.$Enums.PosPaymentType = {
  DIRECT: 'DIRECT',
  DOWNPAYMENT: 'DOWNPAYMENT'
};

exports.PosSettlementStatus = exports.$Enums.PosSettlementStatus = {
  SETTLED: 'SETTLED',
  TO_SETTLE: 'TO_SETTLE'
};

exports.PosPurchaseChannel = exports.$Enums.PosPurchaseChannel = {
  PERSONAL: 'PERSONAL',
  LEASING: 'LEASING'
};

exports.ExportVehicleCategory = exports.$Enums.ExportVehicleCategory = {
  AUTOMOBILE: 'AUTOMOBILE',
  HEAVY_MACHINERY: 'HEAVY_MACHINERY'
};

exports.Prisma.ModelName = {
  User: 'User',
  Bike: 'Bike',
  PosAdmin: 'PosAdmin',
  BikeBrand: 'BikeBrand',
  BikeModel: 'BikeModel',
  BikeColor: 'BikeColor',
  BikeSupplier: 'BikeSupplier',
  BikeVehicle: 'BikeVehicle',
  BikeVehicleImage: 'BikeVehicleImage',
  BikeVehicleExpense: 'BikeVehicleExpense',
  InventoryBrand: 'InventoryBrand',
  InventoryCategory: 'InventoryCategory',
  InventoryProduct: 'InventoryProduct',
  InventoryProductExpense: 'InventoryProductExpense',
  InventoryProductImage: 'InventoryProductImage',
  PosCustomer: 'PosCustomer',
  PosLeasingCompany: 'PosLeasingCompany',
  PosCustomerDreamBike: 'PosCustomerDreamBike',
  PosCustomerPurchase: 'PosCustomerPurchase',
  PosInvoiceTerm: 'PosInvoiceTerm',
  PreOrder: 'PreOrder',
  PreOrderImage: 'PreOrderImage',
  ContactRequest: 'ContactRequest',
  ExportVehicle: 'ExportVehicle',
  ExportVehicleImage: 'ExportVehicleImage'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
