import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { isTokenBlacklisted } from '../utils/tokenBlacklist';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Verificăm dacă header-ul Authorization este prezent
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  // Extragem token-ul
  const token = authHeader.split(' ')[1];

  // Verificăm dacă token-ul este în lista neagră
  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ message: 'Token is invalidated, please log in again.' });
  }

  try {
    // Verificăm și decodăm token-ul
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded; // Setăm user-ul decodat pe request
    next(); // Continuăm către următorul middleware
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token, authorization denied.' });
  }
};