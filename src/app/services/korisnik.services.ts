import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Korisnik } from '../models/korisnik';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class KorisnikService {

  private readonly API_URL = 'http://localhost:8081/api/korisnik';
  private readonly API_URL_ID = 'http://localhost:8081/api/korisnik/korisnikID';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/korisnik/';

  dataChange: BehaviorSubject<Korisnik[]> = new BehaviorSubject<Korisnik[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllKorisnik(): Observable<Korisnik[]> {
      this.httpClient.get<Korisnik[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }

  public addKorisnik(korisnik: Korisnik): void {
    console.log(this.API_URL, korisnik);
    this.httpClient.post(this.API_URL, korisnik).subscribe();
  }

  public updateKorisnik(korinsik: Korisnik): void {
    this.httpClient.put(this.API_URL_ID, korinsik).subscribe();
  }

  public deleteKorisnik(korisnikID: number): void {
    console.log(this.API_URL_ID_W + korisnikID);
    this.httpClient.delete(this.API_URL_ID_W + korisnikID).subscribe();
  }
}
