import { Document, model, Schema } from 'mongoose';

export interface ICar {
  _id: string;
  name: string;
  year: number;
  price: number;
  // in order to save time I will use the brand as string,
  // but in a real project I would use a reference to the brand model like brandId or brandCode
  brand: string;
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
  brand: {
    type: String,
    required: true,
  }
});

export const CarEntity = model<ICar & Document>('Car', CarSchema);

