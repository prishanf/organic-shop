import { CategoryService } from './../category.service';
import { Product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  categories$;
  constructor(private productService:  ProductService, private categoryService: CategoryService) { 
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();

  }

}
