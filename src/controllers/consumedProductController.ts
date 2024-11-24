import { Request, Response } from 'express';
import ConsumedProduct from '../models/consumedProductModel';
import Product from '../models/productModel';

// Funcție pentru validarea formatului unei date
const isValidDate = (date: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

// Endpoint pentru adăugarea unui produs consumat
export const addConsumedProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // ID-ul utilizatorului din middleware-ul `protect`
    const { productId, weight, date } = req.body;

    // Validăm datele primite
    if (!userId || !productId || !weight || !date) {
      return res.status(400).json({ message: 'All fields are required: productId, weight, and date.' });
    }

    if (!isValidDate(date)) {
      return res.status(400).json({ message: 'Invalid date format. Expected YYYY-MM-DD.' });
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
  } catch (error: any) {
    res.status(500).json({ message: 'Error adding consumed product.', error: error.message || error });
  }
};

// Endpoint pentru obținerea produselor consumate într-o zi
export const getConsumedProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date query parameter is required.' });
    }

    if (!isValidDate(date as string)) {
      return res.status(400).json({ message: 'Invalid date format. Expected YYYY-MM-DD.' });
    }

    const consumedProducts = await ConsumedProduct.find({ userId, date });
    res.status(200).json({
      message: 'Consumed products retrieved successfully.',
      data: consumedProducts,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving consumed products.', error: error.message || error });
  }
};

// Endpoint pentru ștergerea unui produs consumat
export const deleteConsumedProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }

    const consumedProduct = await ConsumedProduct.findById(id);

    if (!consumedProduct) {
      return res.status(404).json({ message: 'Consumed product not found.' });
    }

    if (consumedProduct.userId !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this product.' });
    }

    await ConsumedProduct.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Consumed product deleted successfully.',
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting consumed product.', error: error.message || error });
  }
};

// Endpoint pentru obținerea informațiilor despre o zi
export const getDailySummary = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date query parameter is required.' });
    }

    if (!isValidDate(date as string)) {
      return res.status(400).json({ message: 'Invalid date format. Expected YYYY-MM-DD.' });
    }

    const consumedProducts = await ConsumedProduct.find({ userId, date });

    if (!consumedProducts.length) {
      return res.status(404).json({ message: 'No data found for the specified date.' });
    }

    const totalCalories = consumedProducts.reduce((sum, product) => sum + product.calories, 0);

    res.status(200).json({
      message: 'Daily summary retrieved successfully.',
      data: {
        date,
        totalCalories,
        products: consumedProducts,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving daily summary.', error: error.message || error });
  }
};