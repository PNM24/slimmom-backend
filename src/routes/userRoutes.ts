import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Endpoint pentru înregistrare
router.post('/register', registerUser);

// Endpoint pentru autentificare
router.post('/login', loginUser);

export default router;