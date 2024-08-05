import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ApiUrl='http://localhost:3000/api'
  constructor(private http:HttpClient) { }
  

  login(codigo: string, contraseña: string): Observable<any> {
    const body = { codigo, contraseña };
    return this.http.post<any>(`${this.ApiUrl}/auth/login`, body)
      .pipe(
        tap(response => {
          if (response && response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('UserLogeado', response.data.userDetails.name);
            console.log(localStorage.getItem('token'))
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('UserLogeado');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
 
    return !!localStorage.getItem('token');
  }


}
