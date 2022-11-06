import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class OrderDetailsComponent implements OnInit {
  order: any
  isLoading = false
  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getOrder();
  }

  getOrder() {
    const id = this.route.snapshot.params['id'];
    this.orderService.getOrder(id)
    .subscribe(data => {
      console.log(data);
      this.order = {...data.order};
      this.isLoading = false
    }, err => {
      console.log(err);
      this.isLoading = false
    })
  }

}
