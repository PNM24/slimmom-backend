import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

// Caută produse în products.json
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string; // Obținem șirul de interogare

    if (!query) {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    // Citim fișierul products.json
    const filePath = path.join(__dirname, '../data/products.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);

    // Filtrăm produsele pe baza interogării
    const filteredProducts = products.filter((product: any) =>
      product.title.toLowerCase().includes(query.toLowerCase()) || // Caută în titlu
      product.categories.toLowerCase().includes(query.toLowerCase()) // Caută în categorie
    );

    res.status(200).json({
      message: 'Products retrieved successfully.',
      data: filteredProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error searching for products.',
      error: error.message || error,
    });
  }
};