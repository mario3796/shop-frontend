import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CartService } from '../../../cart/cart.service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Input() isAuthenticated?: boolean;
  @Output() deleteProduct = new EventEmitter<string>();
  apiUrl = environment.apiUrl;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  onDelete(id: string) {
    this.deleteProduct.emit(id)
  }

  addToCart(id: string) {
    this.cartService.addProduct(id)
    .subscribe(data => {
      console.log(data)
    })
  }

}
