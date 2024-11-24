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
import { authorize } from '../middlewares/roleMiddleware';

const router = Router();

router.get('/', protect, authorize(['admin']), getUsers); // Doar adminii pot accesa lista de utilizatori
router.post('/', protect, authorize(['admin']), createUser); // Doar adminii pot crea utilizatori
router.put('/:id', protect, authorize(['admin']), updateUser); // Doar adminii pot actualiza utilizatori
router.delete('/:id', protect, authorize(['admin']), deleteUser); // Doar adminii pot șterge utilizatori

// Endpoint-uri generale
router.post('/register', registerUser); // Oricine se poate înregistra
router.post('/login', loginUser); // Oricine se poate autentifica
router.post('/logout', protect, logoutUser); // Orice utilizator autentificat se poate deconecta

export default router;