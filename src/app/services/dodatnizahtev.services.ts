import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DodatniZahtev } from '../models/dodatni_zahtev';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class DodatniZahtevService {

  private readonly API_URL = 'http://localhost:8081/api/dodatniZahtev';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/dodatniZahtev/';

  dataChange: BehaviorSubject<DodatniZahtev[]> = new BehaviorSubject<DodatniZahtev[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllDodatniZahtev(): Observable<DodatniZahtev[]> {
      this.httpClient.get<DodatniZahtev[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }

  // tslint:disable-next-line:variable-name
  public addDodatniZahtev(dodatni_zahtev: DodatniZahtev): void {
    console.log(this.API_URL, dodatni_zahtev);
    this.httpClient.post(this.API_URL, dodatni_zahtev).subscribe();
  }

  // tslint:disable-next-line:variable-name
  public updateDodatniZahtev(dodatni_zahtev: DodatniZahtev): void {
    this.httpClient.put(this.API_URL + '/' + dodatni_zahtev.dodatniZahtevID, dodatni_zahtev).subscribe();
  }

  public deleteDodatniZahtev(dodatniZahtevID: number): void {
    console.log(this.API_URL_ID_W + dodatniZahtevID);
    this.httpClient.delete(this.API_URL_ID_W + dodatniZahtevID).subscribe();
  }
}
