import { Document, model, Schema } from 'mongoose';

interface Car {
  name: string;
  year: number;
  price: number;
  brandId: string;
}

const CarSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brandId: {
    type: String,
    required: true,
  }
});

export const CarModel = model<Car & Document>('Car', CarSchema);
