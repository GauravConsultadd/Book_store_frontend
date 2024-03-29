import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // baseUrl="https://bookbackend.azurewebsites.net"
    baseUrl = 'https://bookbackend.azurewebsites.net'

    constructor(private http: HttpClient) {}

    login(email:string, password:string): Observable<any> {
        console.log(email,password)
        return this.http.post(`${this.baseUrl}/users/login/`,{email,password})
    }

    register(username: string, email: string,password: string,role: string): Observable<any> {
        console.log(email,password,role,username)
        const res=this.http.post(`${this.baseUrl}/users/register/`,{username,email,password,role})
        console.log(res)
        return res;
    }

    loadUser(token: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/api/token/refresh/`,{refresh: token})
    }

    getUser(): Observable<any> {
        let access_token = localStorage.getItem('access_token')
        // console.log("ac token", access_token)
        if(access_token) {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${access_token}`,
            });
            return this.http.get(`${this.baseUrl}/users/getCurrentUser/`,{headers: headers})
        }
        else return of({'message':'something went wrong'})
    }

    logoutUser(): Observable<any> {
        let refresh_token = localStorage.getItem('refresh_token')
        let access_token = localStorage.getItem('access_token')

        const headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        localStorage.clear()
        return this.http.post(`${this.baseUrl}/users/logout/`,{refresh_token: refresh_token},{headers: headers})
    }

    getAllUser(): Observable<any> {
        let refresh_token = localStorage.getItem('refresh_token')
        let access_token = localStorage.getItem('access_token')

        const headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.get(`${this.baseUrl}/users/admin/`,{headers: headers})
    }

    changeUserRole(id: number,role: string): Observable<any> {
        let refresh_token = localStorage.getItem('refresh_token')
        let access_token = localStorage.getItem('access_token')

        const headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${access_token}`,
        });

        return this.http.put(`${this.baseUrl}/users/role/`,{id,role},{headers: headers})
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/users/forgot/`,{email})
    }

    resetPassword(password: string,uidb64: string,token: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/users/reset/${uidb64}/${token}/`,{password: password})
    }

}