import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { Product } from './product';
import { environment } from '../../environments/environment';

declare global {
    interface FormData {
      entries(): any;
    }
  }

@Injectable({ providedIn: 'root' })
export class ProductService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {
    }
    
    getProducts(page = '1'): Observable<{products: Product[], totalItems: number}> {
        return this.http.get<{products: Product[], totalItems: number}>(`${this.apiUrl}products?page=${page}`)
        .pipe(map(data => {
            console.log(data)
            return data
        }), catchError(err => {
            throw err
        }))
    }

    getProduct(productId: string): Observable<Product> {
        return this.http.get<{product: Product}>(`${this.apiUrl}products/${productId}`)
        .pipe(map(data => {
            console.log(data)
            const product = {...data.product} 
            return product
        }), catchError(err => {
            throw err
        }))
    }

    addProduct(product: Product): Observable<Product> {
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('price', '' + product.price);
        formData.append('image', product.image);
        formData.append('description', product.description)
        return this.http.post<{product: Product}>(`${this.apiUrl}products`,
        formData, {
            headers: {
                'Authentication': localStorage.getItem('token')!
            }
        })
        .pipe(map(data => {
            console.log(data)
            const product = { ...data.product };
            return product
        }), catchError(err => {
            throw err
        }))
    }

    editProduct(product: Product): Observable<Product> {
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('price', '' + product.price);
        formData.append('image', product.image);
        formData.append('description', product.description);
        return this.http.put<{product: Product}>(`${this.apiUrl}products/${product._id}`,
        formData, {
            headers: {
                'Authentication': localStorage.getItem('token')!
            }
        })
        .pipe(map(data => {
            console.log(data)
            const product = { ...data.product };
            return product
        }), catchError(err => {
            throw err
        }))
    }

    deleteProduct = (productId: string) => (
        this.http.delete(`${this.apiUrl}products/${productId}`, {
            headers: {
                'Authentication': localStorage.getItem('token')!
            }
        })
        .pipe(catchError(err => {
            throw err
        }))
    )
}