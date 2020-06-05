import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Kupac } from '../models/kupac';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class KupacService {

  private readonly API_URL = 'http://localhost:8081/api/kupac';
  private readonly API_URL_ID = 'http://localhost:8081/api/kupac/kupacID';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/kupac/';

  dataChange: BehaviorSubject<Kupac[]> = new BehaviorSubject<Kupac[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllKupac(): Observable<Kupac[]> {
      this.httpClient.get<Kupac[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }

  public addKupac(kupac: Kupac): void {
    console.log(this.API_URL, kupac);
    this.httpClient.post(this.API_URL, kupac).subscribe();
  }

  public updateKupac(kupac: Kupac): void {
    this.httpClient.put(this.API_URL_ID, kupac).subscribe();
  }

  public deleteKupac(kupacID: number): void {
    console.log(this.API_URL_ID_W + kupacID);
    this.httpClient.delete(this.API_URL_ID_W + kupacID).subscribe();
  }
}
