import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { updateBookModel } from "../models/book";

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

    deleteBook(id: number): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.delete(`${this.baseUrl}/books/${id}/`,{headers: headers})
    }

    updateBook(book: updateBookModel): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });
        return this.http.put(`${this.baseUrl}/books/${book.id}/`,{...book},{headers: headers})
    }

    createBook(book: updateBookModel): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.post(`${this.baseUrl}/books/create/`,{...book},{headers: headers})
    }

    searchBook(searchText: string,authors: string[],genres: string[]): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.post(`${this.baseUrl}/books/search/`,{searchText,authors,genres},{headers: headers})
    }

    constructor(private http: HttpClient) {}
}