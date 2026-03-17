import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import * as bikesService from "./bikes.service";

const listBikesSchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
  brand: z.string().optional(),
  inStock: z.enum(['true', 'false']).optional()
});

const createBikeSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  price: z.number().positive(),
  model: z.string().optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  inStock: z.boolean().default(true)
});

const updateBikeSchema = createBikeSchema.partial();

export async function listBikes(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listBikesSchema.parse(req.query);
    
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    
    const result = await bikesService.listBikes({
      page: isNaN(page) ? 1 : page,
      limit: isNaN(limit) ? 10 : limit,
      brand: query.brand,
      inStock: query.inStock
    });
    
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getBike(req: Request, res: Response, next: NextFunction) {
  try {
    // FIX: Convert params.id to string
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }
    
    const bike = await bikesService.getBike(id);
    res.status(200).json(bike);
  } catch (err) {
    next(err);
  }
}

export async function createBike(req: Request, res: Response, next: NextFunction) {
  try {
    const dto = createBikeSchema.parse(req.body);
    const bike = await bikesService.createBike(dto);
    res.status(201).json(bike);
  } catch (err) {
    next(err);
  }
}

export async function updateBike(req: Request, res: Response, next: NextFunction) {
  try {
    // FIX: Convert params.id to string
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }
    
    const dto = updateBikeSchema.parse(req.body);
    const bike = await bikesService.updateBike(id, dto);
    res.status(200).json(bike);
  } catch (err) {
    next(err);
  }
}

export async function deleteBike(req: Request, res: Response, next: NextFunction) {
  try {
    // FIX: Convert params.id to string
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }
    
    await bikesService.deleteBike(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}