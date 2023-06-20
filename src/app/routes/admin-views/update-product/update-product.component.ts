import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/Product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Promotion} from "../../../model/Promotion";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  product: Product = new Product();

  productId: number | undefined;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.getProductById();
  }


  getProductById() {
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error: any) => {
        console.error('Error retrieving promotion:', error);
      }
    );
  }

  updateProduct() {
    this.productService.updateProduct(this.productId, this.product).subscribe(
      (response: any) => {
        console.log('Product updated successfully:', response);
        this.router.navigateByUrl('http://localhost:2022/tunisia-camp/products');
      },
      (error: any) => {
        console.error('Error updating promotion:', error);
      }
    );
  }
}
