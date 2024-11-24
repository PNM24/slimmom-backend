import { Request, Response, NextFunction } from 'express';

// Middleware pentru verificarea rolului
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role; // `req.user` este setat de middleware-ul `protect`

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
    }

    next();
  };
};