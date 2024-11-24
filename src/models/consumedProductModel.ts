import mongoose, { Schema, Document } from 'mongoose';

export interface IConsumedProduct extends Document {
  userId: string; // ID-ul utilizatorului care a consumat produsul
  productId: string; // ID-ul produsului consumat
  title: string; // Numele produsului
  calories: number; // Calorii consumate
  weight: number; // Greutatea consumată (în grame)
  date: string; // Ziua în care a fost consumat (format YYYY-MM-DD)
}

const ConsumedProductSchema: Schema = new Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  title: { type: String, required: true },
  calories: { type: Number, required: true },
  weight: { type: Number, required: true },
  date: { type: String, required: true }, // Ziua în format YYYY-MM-DD
});

export default mongoose.model<IConsumedProduct>('ConsumedProduct', ConsumedProductSchema);
