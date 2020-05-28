import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    private readonly API_URL = 'http://localhost:8081/api/login';
    constructor(private http: HttpClient) { }

    loginUser(user) {
      return this.http.post<any>(this.API_URL, user);
    }
  }
