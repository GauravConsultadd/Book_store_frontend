import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { deleteGenre } from "../actions/genre";

@Injectable({providedIn: 'root'})
export class GenreService {
    // baseUrl='https://bookbackend.azurewebsites.net'
    baseUrl = 'http://localhost:8000'

    getAllGenre(): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.get(`${this.baseUrl}/genres/`,{headers: headers})
    }

    createGenre(name:string,description:string): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.post(`${this.baseUrl}/genres/create/`,{name,description},{headers: headers})
    }

    updateGenre(name: string,description: string, id: number): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.put(`${this.baseUrl}/genres/${id}/`,{name,description},{headers: headers})
    }

    deleteGenre(id: number): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.delete(`${this.baseUrl}/genres/${id}/`,{headers: headers})
    }

    getGenreNames(): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.get(`${this.baseUrl}/genres/names/`,{headers: headers})
    }

    getAuthorNames(): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.get(`${this.baseUrl}/books/authors/`,{headers: headers})
    }


    constructor(private http: HttpClient) {}
}