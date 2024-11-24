import { Request, Response } from 'express';
import Nutrition from '../models/nutritionModel';
import path from 'path';
import fs from 'fs';

// Endpoint privat: Obține și salvează informațiile nutriționale
export const getAndSaveNutritionInfo = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id; // Obținem ID-ul utilizatorului din middleware-ul `protect`
  
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated.' });
      }
  
      // Informațiile furnizate (pot fi și statice)
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
  
      // Salvăm datele în baza de date
      const savedNutrition = await Nutrition.create({
        userId,
        dailyKcalIntake: nutritionData.dailyKcalIntake,
        notRecommendedProducts: nutritionData.notRecommendedProducts,
      });
  
      // Returnăm datele salvate
      res.status(200).json({
        message: 'Nutrition data retrieved and saved successfully.',
        data: savedNutrition,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving and saving nutrition data.',
        error: error.message || error,
      });
    }
  };

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