import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {

  cartId; 

  constructor(private db: AngularFireDatabase) { }
  
  addToCart(product){
    this.getOrCreateCart()
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

  private async getOrCreateCart(){
    this.cartId = localStorage.getItem('cartId');
    if(!this.cartId){
      let result = await this.create();
      localStorage.setItem('cartId',result.key);
      return this.getCart(result.key);
    }
    this.getCart(this.cartId);
  }

  addProduct(product){
    return this.db.list('/shopping-carts/'+this.cartId).push(product);
  }

  getCart(cartId:String){
    return this.db.object('/shopping-carts/'+this.cartId);
  }
}
