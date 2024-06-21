export interface ICategory {}

export type TOrder = "asc" | "desc";
export type TSortBy = "title" | "price" | "rating";

export interface IProduct {
  availabilityStatus: string;
  category: string;
  description: string;
  dimensions: { width: number; height: number; depth: number };
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: {}[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}
