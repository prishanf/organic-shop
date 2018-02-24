import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }
  //create new product
  create(product){
    return this.db.list('/products').push(product);
  }
  // get all products
  getAll(){
    return this.db.list('/products');
  }
  //get product by product Id
  get(productId){
    return this.db.object('/products/'+productId);
  }

}
