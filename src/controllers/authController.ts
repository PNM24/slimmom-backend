import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/tokenUtils';
import User from '../models/userModel'; // Asigură-te că ai modelul User pentru a căuta utilizatorul după ID-ul din refresh token

// Endpoint pentru obținerea unui nou access token folosind un refresh token
export const refreshTokens = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    // Verificăm dacă refresh token-ul a fost trimis
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required.' });
    }

    // Verificăm și decodăm refresh token-ul
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return res.status(403).json({ message: 'Invalid refresh token.' });
    }

    // Căutăm utilizatorul folosind id-ul din decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Generăm un nou access token și un nou refresh token
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      message: 'Tokens refreshed successfully.',
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error refreshing tokens.',
      error: error.message || error,
    });
  }
};