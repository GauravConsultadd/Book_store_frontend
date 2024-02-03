import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { updateBookModel } from "../models/book";

@Injectable({
    providedIn: 'root'
})
export class BookService {
    baseUrl = 'https://bookbackend.azurewebsites.net'

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
        const formData = new FormData()
        formData.set('title',book.title)
        formData.set('description',book.description)
        formData.set('author',book.author)
        formData.set('genre',book.genre)
        formData.set('cover_image_url',book.cover_image_url,book.cover_image_url.name)
        formData.set('price',book.price.toString())

        console.log(formData,"inside createBook")
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.post(`${this.baseUrl}/books/create/`,formData,{headers: headers})
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