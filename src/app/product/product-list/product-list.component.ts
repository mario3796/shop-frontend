import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

import { Product } from '../product';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = []
  isLoading = false
  isAuthenticated = false
  private authListenerSub?: Subscription;
  
  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.isAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated
    })
    this.getProducts()
  }

  ngOnDestroy() {
    this.authListenerSub?.unsubscribe();
  }

  getProducts() {
    this.productService.getProducts()
    .subscribe(products => {
      this.products = [...products]
      this.isLoading = false
    }, err => {
      console.log(err);
      this.isLoading = false
    })
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
    .subscribe(data => {
      console.log(data)
      this.isLoading = true
      this.getProducts()
    })
  }

}
