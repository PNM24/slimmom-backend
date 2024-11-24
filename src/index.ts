import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import { getProduse } from './controllers/produseController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware-uri
app.use(cors());
app.use(express.json());

// Rute
app.use('/users', userRoutes);
app.get('/products', getProduse);

app.get('/', (req, res) => {
  res.send('Slimmom backend is running!');
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();