import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/register', registerUser);

export default router;