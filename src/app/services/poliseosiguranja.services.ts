import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PoliseOsiguranja } from '../models/polise_osiguranja';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';



@Injectable()
export class TipAutomobilaService {

  private readonly API_URL = 'http://localhost:8081/api/poliseOsiguranja';
  private readonly API_URL_ID = 'http://localhost:8081/api/poliseOsiguranja/poliseOsiguranjaID';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/tipAutomobila/';

  dataChange: BehaviorSubject<PoliseOsiguranja[]> = new BehaviorSubject<PoliseOsiguranja[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllTipAutomobila(): Observable<PoliseOsiguranja[]> {
      this.httpClient.get<PoliseOsiguranja[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }
  // tslint:disable-next-line:variable-name
  public addPoliseOsiguranja(polise_osiguranja: PoliseOsiguranja): void {
    console.log(this.API_URL, polise_osiguranja);
    this.httpClient.post(this.API_URL, polise_osiguranja).subscribe();
  }

  // tslint:disable-next-line:variable-name
  public updatePoliseOsiguranja(polise_osiguranja: PoliseOsiguranja): void {
    this.httpClient.put(this.API_URL_ID, polise_osiguranja).subscribe();
  }

  public deletePoliseOsigiguranja(poliseOsiguranjaID: number): void {
    console.log(this.API_URL_ID_W + poliseOsiguranjaID);
    this.httpClient.delete(this.API_URL_ID_W + poliseOsiguranjaID).subscribe();
  }

}
