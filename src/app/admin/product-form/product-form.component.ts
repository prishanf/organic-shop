import { CategoryService } from './../../category.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  
  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit() {
  }

}
