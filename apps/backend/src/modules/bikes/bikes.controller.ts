import type { Request, Response, NextFunction } from "express";
import { validate } from "../../common/utils/errors";
import { sendSuccess, sendCreated } from "../../common/utils/response";
import { createBikeSchema, updateBikeSchema, bikeQuerySchema } from "./dto/bike.dto";
import * as bikesService from "./bikes.service";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const query = validate(bikeQuerySchema, req.query);
    const result = await bikesService.listBikes(query);
    return sendSuccess(res, result);
  } catch (err) {
    return next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const bike = await bikesService.getBike(id);
    return sendSuccess(res, bike);
  } catch (err) {
    return next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const dto = validate(createBikeSchema, req.body);
    const bike = await bikesService.createBike(dto);
    return sendCreated(res, bike);
  } catch (err) {
    return next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const dto = validate(updateBikeSchema, req.body);
    const bike = await bikesService.updateBike(id, dto);
    return sendSuccess(res, bike);
  } catch (err) {
    return next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await bikesService.deleteBike(id);
    return sendSuccess(res, { message: "Bike deleted" });
  } catch (err) {
    return next(err);
  }
}
