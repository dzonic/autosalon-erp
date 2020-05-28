import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Servis } from '../models/servis';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';



@Injectable()
export class ServisService {

  private readonly API_URL = 'http://localhost:8081/api/servis';
  //private readonly API_URL_BYID = 'http://localhost:8081/api/servis/servisID';

  dataChange: BehaviorSubject<Servis[]> = new BehaviorSubject<Servis[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllServis(): Observable<Servis[]> {
      this.httpClient.get<Servis[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }

  public addServis(servis: Servis): void {
    this.httpClient.post(this.API_URL, servis).subscribe();
  }

  public updateServis(servis: Servis): void {
    this.httpClient.put(this.API_URL, servis).subscribe();
  }

  public deleteServis(servisID: number): void {
    console.log(this.API_URL);
    this.httpClient.delete(this.API_URL + '/' + servisID ).subscribe();
  }
}
