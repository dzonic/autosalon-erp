import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  logIn(email, password): any {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json' );
    headers.set('KlijentID', email);
    headers.set('KlijentLozinka', password);
    return this.http.get('http://localhost:8081/api/login', { headers: {KlijentID : email, KlijentLozinka : password} });
    }

  }



