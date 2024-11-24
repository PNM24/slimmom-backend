import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';

// Funcție pentru generarea unui access token
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '15m' }); // Expiră după 15 minute
};

// Funcție pentru generarea unui refresh token
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' }); // Expiră după 7 zile
};

// Funcție pentru verificarea unui refresh token
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};