import { Request, Response } from 'express';
import Nutrition from '../models/nutritionModel';
import path from 'path';
import fs from 'fs';

// Endpoint privat: Obține și salvează informațiile nutriționale
export const getAndSaveNutritionInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const nutritionData = {
      dailyKcalIntake: {
        male: 2500,
        female: 2000,
      },
      notRecommendedProducts: [
        'Fast food',
        'Sugary drinks',
        'High-fat snacks',
        'Processed meats',
        'Sugary cereals',
        'Deep-fried foods',
        'High-sodium foods',
      ],
    };

    const savedNutrition = await Nutrition.create({
      userId,
      dailyKcalIntake: nutritionData.dailyKcalIntake,
      notRecommendedProducts: nutritionData.notRecommendedProducts,
    });

    res.status(200).json({
      message: 'Nutrition data retrieved and saved successfully.',
      data: savedNutrition,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error retrieving and saving nutrition data.',
      error: error.message || error,
    });
  }
};

// Endpoint pentru obținerea informațiilor nutriționale din fișier JSON
export const getNutritionInfo = (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../data/nutrition.json');

    // Verificăm dacă fișierul există
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Nutrition file not found.' });
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    const nutritionInfo = JSON.parse(data);

    res.status(200).json({
      message: 'Nutrition information retrieved successfully.',
      data: nutritionInfo,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error retrieving nutrition information.',
      error: error.message || error,
    });
  }
};