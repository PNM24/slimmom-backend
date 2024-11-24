import { Request, Response } from 'express';
import products from '../data/products.json';

export const getProduse = (req: Request, res: Response) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};