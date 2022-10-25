import { Component, OnInit } from '@angular/core';

import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart = []
  totalPrice = 0
  isLoading = false;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getCart();
  }
  
  getCart() {
    this.cartService.getCart()
    .subscribe(data => {
      console.log(data)
      this.cart = [...data.cart]
      this.totalPrice = data.totalPrice
      this.isLoading = false
    })  
  }

  increment(productId: string) {
    this.cartService.addProduct(productId)
    .subscribe(data => {
      console.log(data);
      this.getCart()
    })
  }

  decrement(productId: string) {
    this.cartService.removeProduct(productId)
    .subscribe(data => {
      console.log(data);
      this.getCart()
    })
  }

  clearCart() {
    this.cartService.clearCart()
    .subscribe(data => {
      console.log(data)
      this.isLoading = true;
      this.getCart()
    })
  }

  addOrder() {
    this.isLoading = true
    this.cartService.addOrder(this.totalPrice, this.cart)
    .subscribe(data => {
      console.log(data)
      this.getCart();
    })
  }

}
