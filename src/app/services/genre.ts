import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { deleteGenre } from "../actions/genre";

@Injectable({providedIn: 'root'})
export class GenreService {
    baseUrl='http://localhost:8000'

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

    updateGenre(name: string,description: string, id: number) {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        console.log(name,description,id)
        return this.http.put(`${this.baseUrl}/genres/${id}/`,{name,description},{headers: headers})
    }

    deleteGenre(id: number) {
        let access_token = localStorage.getItem('access_token')
        let headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.delete(`${this.baseUrl}/genres/${id}/`,{headers: headers})
    }


    constructor(private http: HttpClient) {}
}