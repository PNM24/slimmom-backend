import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const getNutritionInfo = (req: Request, res: Response) => {
  try {
    // Citim fișierul JSON
    const filePath = path.join(__dirname, '../data/nutrition.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const nutritionInfo = JSON.parse(data);

    res.status(200).json({
      message: 'Nutrition information retrieved successfully.',
      data: nutritionInfo
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving nutrition information.',
      error: error.message || error
    });
  }
};