import mongoose, { Schema, Document } from 'mongoose';

export interface INutrition extends Document {
  userId: string;
  dailyKcalIntake: {
    male: number;
    female: number;
  };
  notRecommendedProducts: string[];
  accessedAt: Date;
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