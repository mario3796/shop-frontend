import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProductDetailsComponent implements OnInit {
  product?: Product
  apiUrl = environment.apiUrl;
  isLoading = false;
  
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getProduct()
  }

  getProduct() {
    const id = this.route.snapshot.params['id']!
    this.productService.getProduct(id)
    .subscribe(product => {
      this.product = product
      this.isLoading = false;
    }, err => {
      this.isLoading = false
      console.log(err)
    })
  }

}
