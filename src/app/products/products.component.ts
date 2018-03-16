import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { Product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[]= [];
  category : String;
  filterdProducts: Product[] = [];
  cart: any ={};
  subscription : Subscription;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) { 
   
    productService  
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }
    ).subscribe(params=>{
        this.category = params.get('category');
        this.filterdProducts = (this.category)?
        this.products.filter( p=>p.category === this.category) :
        this.products;
    })

  
  }
  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart=>{
        this.cart=cart
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
