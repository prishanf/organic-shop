import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { Product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[]= [];
  category : String;
  filterdProducts: Product[] = [];
  
  constructor(
    private productService:  ProductService, 
    private route:ActivatedRoute) { 
    
    productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }
    ).subscribe(params=>{
       this.category = params.get('category');
       
        console.log(this.products,this.category);
        this.filterdProducts = (this.category)?
        this.products.filter( p=>p.category === this.category) :
        this.products;
    })
    

  }

}
