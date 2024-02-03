import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { createOrderModel } from "../models/order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    baseUrl = 'https://bookbackend.azurewebsites.net'

    createOrder(order: createOrderModel) : Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });
        
        return this.http.post(`${this.baseUrl}/orders/create/`,{...order},{headers: headers})
    }

    getMyOrders(): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });
        
        return this.http.get(`${this.baseUrl}/orders/my/`,{headers: headers})
    }

    getAllOrders() : Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });
        
        return this.http.get(`${this.baseUrl}/orders/getAll/`,{headers: headers})
    }

    generateInvoice(id: number): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });
        
        return this.http.get(`${this.baseUrl}/orders/invoice/${id}/`,{headers: headers,responseType: 'blob'})
    }
    constructor(private http: HttpClient) {}
}