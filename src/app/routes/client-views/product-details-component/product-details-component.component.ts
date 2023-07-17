import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/Product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../admin-views/product.service";
import {ProductDTO} from "../../../model/ProductDTO";
import {ProductFrontServiceService} from "../list-product-front/product-front-service.service";
import {AuthService} from "@core";

@Component({
  selector: 'app-product-details-component',
  templateUrl: './product-details-component.component.html',
  styleUrls: ['./product-details-component.component.scss']
})
export class ProductDetailsComponentComponent implements OnInit{
  //authService: AuthService = new AuthService();
  product: ProductDTO = {} as ProductDTO;



  quantities: number[] = [1, 2, 3, 4, 5]; // Remplacez par les quantités souhaitées
  selectedQuantity = 1;
  successMessage: string | undefined;
  showSuccessMessage = false;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private userId: number;
  constructor(private authService: AuthService,private route: ActivatedRoute, private productService: ProductFrontServiceService,private router:Router) {}
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   // @ts-ignore
  discountedPrice = this.route.snapshot.queryParamMap.get('discountedPrice');

  ngOnInit() {
    const discountedPrice = this.route.snapshot.queryParamMap.get('discountedPrice');

    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.productService.getProductById(productId).subscribe(
        (data: ProductDTO) => {
          this.product = data;
        },
        (error: any) => {
          console.log('An error occurred while fetching product details:', error);
        }
      );
    });
  }

  addToCart(productId: number) {
    const quantity = this.selectedQuantity;
    const id = productId; // Déclarez une variable 'id' et attribuez la valeur de 'productId'

    this.productService.addToCart(id, quantity, this.userId).subscribe(
      () => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000); // Afficher le message pendant 3 secondes
      },
      error => {
        console.error('Failed to add product to cart:', error);
      }
    );
  }


  goToCartPage() {
    // Navigate to the cart page
    this.router.navigate(['/order/1/orders']); // Adjust the route according to your application's routes
  }
}
