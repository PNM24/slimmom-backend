import { Request, Response } from 'express';
import ConsumedProduct from '../models/consumedProductModel';
import Product from '../models/productModel';

// Endpoint pentru adăugarea unui produs consumat
export const addConsumedProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // ID-ul utilizatorului din middleware-ul `protect`
    const { productId, weight, date } = req.body;

    // Validăm datele primite
    if (!userId || !productId || !weight || !date) {
      return res.status(400).json({ message: 'All fields are required: productId, weight, and date.' });
    }

    // Verificăm dacă produsul există
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Calculăm caloriile pe baza greutății consumate
    const calories = (product.calories / product.weight) * weight;

    // Salvăm produsul consumat în baza de date
    const consumedProduct = await ConsumedProduct.create({
      userId,
      productId,
      title: product.title,
      calories,
      weight,
      date,
    });

    res.status(201).json({
      message: 'Consumed product added successfully.',
      data: consumedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding consumed product.', error: error.message });
  }
};

export const getConsumedProducts = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      const { date } = req.query;
  
      if (!date) {
        return res.status(400).json({ message: 'Date query parameter is required.' });
      }
  
      const consumedProducts = await ConsumedProduct.find({ userId, date });
      res.status(200).json({
        message: 'Consumed products retrieved successfully.',
        data: consumedProducts,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving consumed products.', error: error.message });
    }
  };