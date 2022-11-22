import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product';

import { ProductService } from '../product.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = []
  isLoading = false
  isAuthenticated = false
  totalItems = 0
  page = 1

  private authListenerSub?: Subscription;
  
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private modalService: ModalService,
    private route: ActivatedRoute) { }

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
    this.route.queryParams
    .subscribe(params => {
      this.page = +params['page'] || this.page
      this.productService.getProducts(params['page'])
      .subscribe(data => {
        this.products = [...data.products]
        this.totalItems = data.totalItems
        this.isLoading = false
      }, err => {
        console.log(err);
        this.isLoading = false
      })
    })
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
    .subscribe(data => {
      console.log(data)
      this.isLoading = true;
      this.modalService.setModal('PRODUCT_DELETED')
      this.getProducts()
    })
  }

}
