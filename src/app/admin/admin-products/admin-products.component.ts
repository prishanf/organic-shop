import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  products: Product[];
  //filterdProducts: any[];
  subscription: Subscription;
  tableResource :DataTableResource<Product>;
  items: Product[] =[];
  itemCount: number;
  
  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll().
    subscribe(prods=>{
      this.items = this.products = prods;
      this.initializeTable(prods);
    });
   
  }

  private initializeTable(products:Product[]){
      this.tableResource = new DataTableResource(products);
      this.tableResource.query({
        offset:0
      }).then(items=>this.items=items);
      this.tableResource.count()
      .then(count=>this.itemCount=count);
  }  

  reloadItems(params){
    if(!this.tableResource) return;
    this.tableResource.query(params).then(items=>this.items=items);
  }

  filter(query: string){
   let filterdProducts = (query)? 
      this.products.filter(p=>p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
      this.products;
    this.initializeTable(filterdProducts);
  }

  ngOnInit() {
  
  }
 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}