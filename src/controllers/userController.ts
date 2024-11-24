import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';

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