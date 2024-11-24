import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Înregistrare utilizator
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({ message: 'User registered successfully.', user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.', error });
  }
};

// Endpoint pentru autentificare
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validăm dacă email-ul și parola sunt furnizate
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Verificăm dacă utilizatorul există
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Verificăm parola
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generăm un token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Token-ul expiră după o oră
    );

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error });
  }
};

// Alte funcții (placeholder pentru moment)
export const getUsers = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get users not implemented yet.' });
};
export const createUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Create user not implemented yet.' });
};
export const updateUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Update user not implemented yet.' });
};
export const deleteUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Delete user not implemented yet.' });
};