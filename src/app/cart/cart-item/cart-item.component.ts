import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CartItemComponent implements OnInit {
  @Input() item: any;
  @Output() increment = new EventEmitter<string>();
  @Output() decrement = new EventEmitter<string>();
  apiUrl = environment.apiUrl;

  constructor() { }

  ngOnInit(): void {
  }

  onAdding(productId: string) {
    this.increment.emit(productId)
  }

  onRemoving(productId: string) {
    this.decrement.emit(productId)
  }

}
