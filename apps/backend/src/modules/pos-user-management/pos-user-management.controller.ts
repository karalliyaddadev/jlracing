import type { NextFunction, Request, Response } from "express";
import { sendCreated, sendSuccess } from "../../common/utils/response";
import { validate } from "../../common/utils/errors";
import {
  createPurchaseSchema,
  createPosUserSchema,
  purchaseQuerySchema,
  posUserQuerySchema,
  updatePosUserSchema,
} from "./dto/pos-user.dto";
import * as service from "./pos-user-management.service";

export async function getProvinceDistrictMeta(_req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, service.getProvinceDistrictMeta());
  } catch (error) {
    return next(error);
  }
}

export async function getDreamBikeOptions(_req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, await service.listDreamBikeOptions());
  } catch (error) {
    return next(error);
  }
}

export async function getPosUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const query = validate(posUserQuerySchema, req.query);
    return sendSuccess(res, await service.listPosUsers(query));
  } catch (error) {
    return next(error);
  }
}

export async function getPosUser(req: Request, res: Response, next: NextFunction) {
  try {
    return sendSuccess(res, await service.getPosUser(Number(req.params.id)));
  } catch (error) {
    return next(error);
  }
}

export async function createPosUser(req: Request, res: Response, next: NextFunction) {
  try {
    const dto = validate(createPosUserSchema, req.body);
    return sendCreated(res, await service.createPosUser(dto));
  } catch (error) {
    return next(error);
  }
}

export async function updatePosUser(req: Request, res: Response, next: NextFunction) {
  try {
    const dto = validate(updatePosUserSchema, req.body);
    return sendSuccess(res, await service.updatePosUser(Number(req.params.id), dto));
  } catch (error) {
    return next(error);
  }
}

export async function deletePosUser(req: Request, res: Response, next: NextFunction) {
  try {
    await service.deletePosUser(Number(req.params.id));
    return sendSuccess(res, { message: "User deleted" });
  } catch (error) {
    return next(error);
  }
}

export async function createPurchase(req: Request, res: Response, next: NextFunction) {
  try {
    const dto = validate(createPurchaseSchema, req.body);
    const data = await service.createPurchase(Number(req.params.id), dto);
    return sendCreated(res, data);
  } catch (error) {
    return next(error);
  }
}

export async function getPurchases(req: Request, res: Response, next: NextFunction) {
  try {
    const query = validate(purchaseQuerySchema, req.query);
    return sendSuccess(res, await service.listPurchases(query));
  } catch (error) {
    return next(error);
  }
}

export async function getPurchasesByUser(req: Request, res: Response, next: NextFunction) {
  try {
    const query = validate(purchaseQuerySchema, req.query);
    return sendSuccess(res, await service.listPurchasesByUser(Number(req.params.id), query));
  } catch (error) {
    return next(error);
  }
}