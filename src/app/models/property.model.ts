// src/app/models/property.model.ts
export interface Property {
  _id?: string;
  title: string;
  location: string;
  description: string;
  price: number;
  phone: string;
  image?: string; // 👈 خليها اختيارية
}
