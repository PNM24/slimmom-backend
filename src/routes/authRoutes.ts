import { Router } from 'express';
import { refreshTokens } from '../controllers/authController';

const router = Router();

// Rute pentru refresh token
router.post('/refresh-tokens', refreshTokens);

export default router;