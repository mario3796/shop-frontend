import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class OrderItemComponent implements OnInit {
  @Input() item: any
  apiUrl = environment.apiUrl
  constructor() { }

  ngOnInit(): void {
  }

}
