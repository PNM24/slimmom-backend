import { Router } from 'express';
import { searchProducts } from '../controllers/productController';

const router = Router();

// Ruta pentru căutarea produselor
router.get('/search', searchProducts);

export default router;