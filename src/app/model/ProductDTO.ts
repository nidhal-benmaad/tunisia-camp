export interface ProductDTO {
  category: string ;
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  discountedPrice: number;
  isAvailable: boolean;
  imageUrls: string[];
  currentImageIndex:number;
  position: number; // Ajouter la propriété position

  totalQuantity:number;

  message:string;

}
