import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marka } from '../models/marka';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class MarkaService {

  private readonly API_URL = 'http://localhost:8081/api/marka';
  private readonly API_URL_ID = 'http://localhost:8081/api/marka/markaID';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/marka/';

  dataChange: BehaviorSubject<Marka[]> = new BehaviorSubject<Marka[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllMarka(): Observable<Marka[]> {
      this.httpClient.get<Marka[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }

  public addMarka(marka: Marka): void {
    this.httpClient.post(this.API_URL, marka).subscribe();
  }

  public updateMarka(marka: Marka): void {
    this.httpClient.put(this.API_URL_ID, marka).subscribe();
  }

  public deleteMarka(markaID: number): void {
    console.log(this.API_URL_ID_W + markaID);
    this.httpClient.delete(this.API_URL_ID_W + markaID).subscribe();
  }
}
