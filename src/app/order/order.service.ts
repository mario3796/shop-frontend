import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getOrders() {
        let params = new HttpParams()
        .set('userId', '' + localStorage.getItem('userId'))
        return this.http.get<{ orders: [] }>(`${this.apiUrl}orders`, {
            params: params
        })
    }

    getOrder(orderId: string) {
        return this.http.get<{ order: any }>(`${this.apiUrl}orders/${orderId}`)
    }

}