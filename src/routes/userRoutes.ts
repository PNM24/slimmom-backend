import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Endpoint pentru înregistrare
router.post('/register', registerUser);

// Endpoint pentru autentificare
router.post('/login', loginUser);

// Endpoint pentru deconectare
router.post('/logout', protect, logoutUser); // Protejat pentru a asigura autentificarea

export default router;