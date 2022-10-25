import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class CartService {
    apiUrl = environment.apiUrl
    constructor(private http: HttpClient) {}

    getCart() {
       return this.http.get<{ cart: [], totalPrice: number }>
       (`${this.apiUrl}cart/${localStorage.getItem('userId')}`)
    }

    addProduct(productId: string) {
        return this.http.post(`${this.apiUrl}cart`, {
            productId: productId,
            userId: localStorage.getItem('userId')
        }, { headers: {
            'Content-Type': 'application/json'
        } })
    }

    removeProduct(productId: string) {
        return this.http.put(`${this.apiUrl}cart`, {
            productId: productId,
            userId: localStorage.getItem('userId')
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    clearCart() {
        return this.http.delete(`${this.apiUrl}cart/${localStorage.getItem('userId')}`)
    }
    
    addOrder(totalPrice: number, products: any[]) {
        return this.http.post(`${this.apiUrl}orders`, JSON.stringify({
            userId: localStorage.getItem('userId'),
            price: totalPrice,
            products: products
        }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }

}