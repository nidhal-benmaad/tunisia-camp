import {Component, OnInit} from '@angular/core';
import {ProductFrontServiceService} from "./product-front-service.service";
import {Product} from "../../../model/Product";
import {ProductDTO} from "../../../model/ProductDTO";
import {MatCardModule} from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-product-front',
  templateUrl: './list-product-front.component.html',
  styleUrls: ['./list-product-front.component.scss']
})
export class ListProductFrontComponent implements OnInit {
  @Component({
    selector: 'card-fancy-example',
    templateUrl: 'card-fancy-example.html',
    styleUrls: ['card-fancy-example.css'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule],
  })
  products: ProductDTO[] = [];
  imageUrl: string[] = [];
  categories: string[] = []; // Liste des catégories disponibles
  selectedCategory = ''; // Catégorie sélectionnée dans le filtre
  filteredProducts: ProductDTO[] = []; // Produits filtrés en fonction de la catégorie
  constructor(private productService: ProductFrontServiceService,private route: ActivatedRoute,private router: Router) { }

  discountedPrice = 0;


  ngOnInit(): void {
    this.getProductsAfterPromotion();
    const discountedPrice = this.route.snapshot.queryParamMap.get('discountedPrice');

  }
  // Function to navigate to the cart page
  goToCartPage() {
    // Navigate to the cart page
    this.router.navigate(['/order/1/orders']); // Adjust the route according to your application's routes
  }

  getProductsAfterPromotion(): void {
    this.productService.getProductsAfterPromotion().subscribe(
      (response: ProductDTO[]) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error retrieving products after promotion:', error);
      }
    );
  }
  navigateToProductDetails(productId: string, discountedPrice: number) {
    this.router.navigate(['/product', productId], { queryParams: { discountedPrice: discountedPrice } });
  }



}
