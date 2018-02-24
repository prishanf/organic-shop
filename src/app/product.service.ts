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
  //update product, firebase does not like to when id is part of the object when it updated. 
  //therefore productId is pass as a seperate parameter to the update method. 
  update(productId,product){
    return this.db.object('/products/'+productId).update(product);
  }

  //delete product by Id
  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }

}
