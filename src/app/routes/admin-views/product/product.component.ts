import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../admin-views/product.service';
import {MtxGridColumn} from "@ng-matero/extensions/grid";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // Define the columns array

  product : any;
  constructor(private s :ProductService, private router:Router) {



  }

  ngOnInit(): void {
    this.findAllProducts();
  }

  findAllProducts(): void {
    this.s.findAllProduct().subscribe((products) => {
      this.product = products;
    });
  }

  deleteProduct(id: number): void {
    this.s.deleteProduct(id).subscribe(() => {
      // Optional: Show success message or perform any other desired actions
      // After successful deletion, refresh the product list
      this.findAllProducts();
    });
  }

}
