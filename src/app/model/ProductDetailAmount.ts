import {OrderDetail, OrderDetails} from "./OrderDetails";

export interface ProductDetailAmount {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  discountedPrice: number ;
  category: any; // Remplacez "any" par le type approprié pour la catégorie
  imageUrls: string[];
  detailAmount: number;
  available: boolean;
  orderDetail: OrderDetail;
  orderId: number;

}
