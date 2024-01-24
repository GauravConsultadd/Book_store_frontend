import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookService {
    baseUrl = 'http://localhost:8000'

    getAllBooks(): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });
        
        return this.http.get(`${this.baseUrl}/books/`,{headers: headers})
    }

    getInventory(): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });
        
        return this.http.get(`${this.baseUrl}/books/inventory/`,{headers: headers})
    }

    constructor(private http: HttpClient) {}
}