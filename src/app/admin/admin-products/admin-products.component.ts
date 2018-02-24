import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  products: Product[];
  filterdProducts: any[];
  subscription: Subscription;
  
  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll().subscribe(prods=>this.filterdProducts = this.products = prods);
  }

  filter(query: string){
    this.filterdProducts = (query)? 
      this.products.filter(p=>p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
      this.filterdProducts = this.products; 
  }

  ngOnInit() {
  
  }
 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
