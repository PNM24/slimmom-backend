import { Router } from 'express';
import {
  addConsumedProduct,
  deleteConsumedProduct,
  getConsumedProducts,
  getDailySummary,
} from '../controllers/consumedProductController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Adaugă un produs consumat
router.post('/add', protect, addConsumedProduct);

// Obține produsele consumate într-o zi
router.get('/get', protect, getConsumedProducts);

// Șterge un produs consumat
router.delete('/delete/:id', protect, deleteConsumedProduct);

// Obține toate informațiile despre o zi
router.get('/summary', protect, getDailySummary);

export default router;