import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from "../product.service";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Product} from "../../../model/Product";

@Component({
  selector: 'app-ajout-product',
  templateUrl: './ajout-product.component.html',
  styleUrls: ['./ajout-product.component.scss'],

})
export class AjoutProductComponent implements OnInit{
   product: any ;



  constructor(private s :ProductService, private router:Router) {   this.product = new Product();}
  ngOnInit(): void {

  }

  savedata(){

    this.s.addProduct(this.product).subscribe(
      () => {
        alert("Product created successfully.");
        this.product.price = '';
        this.product.name = '';
        this.product.description = '';
        this.product.quantity = '';
      }
    );





}}
