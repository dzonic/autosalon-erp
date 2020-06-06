import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Automobil } from '../models/automobil';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class AutomobilService {

  private readonly API_URL = 'http://localhost:8081/api/automobil';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/automobil/';

  dataChange: BehaviorSubject<Automobil[]> = new BehaviorSubject<Automobil[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllAutomobil(): Observable<Automobil[]> {
      this.httpClient.get<Automobil[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }

  // tslint:disable-next-line:variable-name
  public addAutomobil(automobil: Automobil): void {
    console.log(this.API_URL, automobil);
    this.httpClient.post(this.API_URL, automobil).subscribe();
  }

  // tslint:disable-next-line:variable-name
  public updateAutomobil(automobil: Automobil): void {
    this.httpClient.put(this.API_URL + '/' + automobil.automobilID, automobil).subscribe();
  }

  public deleteAutomobil(automobilID: number): void {
    console.log(this.API_URL_ID_W + automobilID);
    this.httpClient.delete(this.API_URL_ID_W + automobilID).subscribe();
  }
}
