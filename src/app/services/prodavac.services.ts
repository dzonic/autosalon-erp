import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prodavac } from '../models/prodavac';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class ProdavacService {

  private readonly API_URL = 'http://localhost:8081/api/prodavac';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/prodavac/';

  dataChange: BehaviorSubject<Prodavac[]> = new BehaviorSubject<Prodavac[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllProdavac(): Observable<Prodavac[]> {
      this.httpClient.get<Prodavac[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }

  public addProdavac(prodavac: Prodavac): void {
    console.log(this.API_URL, prodavac);
    this.httpClient.post(this.API_URL, prodavac).subscribe();
  }

  public updateProdavac(prodavac: Prodavac): void {
    this.httpClient.put(this.API_URL + '/' + prodavac.prodavacID, prodavac).subscribe();
  }

  public deleteProdavac(prodavacID: number): void {
    console.log(this.API_URL_ID_W + prodavacID);
    this.httpClient.delete(this.API_URL_ID_W + prodavacID).subscribe();
  }
}
