import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
    orders = []
    isLoading = false;
    constructor(private orderService: OrderService) {}
    
    ngOnInit() {
        this.isLoading = true;
        this.getOrders();
    }

    getOrders() {
        this.orderService.getOrders()
        .subscribe(data => {
            console.log(data);
            this.orders = [...data.orders];
            this.isLoading = false
        })
    }
}