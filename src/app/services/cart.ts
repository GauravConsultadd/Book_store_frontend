import { Observable } from "rxjs";
import { CartItem } from "../models/cartItem";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    // baseUrl='https://bookbackend.azurewebsites.net'
    baseUrl = 'https://bookbackend.azurewebsites.net'

    addToCart(userId: number,bookId: number,price: number,quantity: number ): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });
        return this.http.post(`${this.baseUrl}/carts/`,{userId,bookId,price,quantity},{headers: headers})
    }


    getCart(): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.get(`${this.baseUrl}/carts/`,{headers: headers})
    }

    removeFromCart(id: number): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.delete(`${this.baseUrl}/carts/${id}/`,{headers: headers})
    }

    removeAllCart() : Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.delete(`${this.baseUrl}/carts/`,{headers: headers})
    }

    constructor(private http: HttpClient) {}
}