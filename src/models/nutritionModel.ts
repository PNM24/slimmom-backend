import mongoose, { Schema, Document } from 'mongoose';

export interface INutrition extends Document {
  userId: string; // ID-ul utilizatorului care accesează endpoint-ul
  dailyKcalIntake: {
    male: number;
    female: number;
  };
  notRecommendedProducts: string[];
  accessedAt: Date; // Data accesării
}

const NutritionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  dailyKcalIntake: {
    male: { type: Number, required: true },
    female: { type: Number, required: true },
  },
  notRecommendedProducts: [{ type: String, required: true }],
  accessedAt: { type: Date, default: Date.now },
});

export default mongoose.model<INutrition>('Nutrition', NutritionSchema);