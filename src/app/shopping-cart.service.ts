import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/operators/take';

@Injectable()
export class ShoppingCartService {

  cartId; 

  constructor(private db: AngularFireDatabase) { }
  
  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId +'/items/'+ product.$key);
    item$.take(1).subscribe(item=>{
       if(item.$exists()){
         item$.update({quantity:item.quantity + 1});
       }else{
        item$.set({product:product,quantity :1});
       } 
    })
 
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  /*private getOrCreateCart(){
    this.cartId = localStorage.getItem('cartId');
    if(!this.cartId){
      this.create().then(result=>{
        localStorage.setItem('cartId',result.key);
        // Addproduct to cart
        return this.getCart(result.key)
      });
    }else{
        this.getCart(this.cartId);
    }
  }*/

  private async getOrCreateCartId(){
    this.cartId = localStorage.getItem('cartId');
    if(this.cartId){
      return this.cartId;
    }
    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
    
    
  }

  addProduct(product){
    return this.db.list('/shopping-carts/'+this.cartId).push(product);
  }

  getCart(cartId:String){
    return this.db.object('/shopping-carts/'+this.cartId);
  }
}
