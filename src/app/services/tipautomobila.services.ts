import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TipAutomobila } from '../models/tip_automobila';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';




@Injectable()
export class TipAutomobilaService {

  private readonly API_URL = 'http://localhost:8081/api/tipAutomobila';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/tipAutomobila/';

  dataChange: BehaviorSubject<TipAutomobila[]> = new BehaviorSubject<TipAutomobila[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllTipAutomobila(): Observable<TipAutomobila[]> {
      this.httpClient.get<TipAutomobila[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }
  // tslint:disable-next-line:variable-name
  public addTipAutomobila(tip_automobila: TipAutomobila): void {
    console.log(this.API_URL, tip_automobila);
    this.httpClient.post(this.API_URL, tip_automobila).subscribe();
  }

  // tslint:disable-next-line:variable-name
  public updateTipAutomobila(tip_automobila: TipAutomobila): void {
    this.httpClient.put(this.API_URL + '/' + tip_automobila.tipAutomobilaID, tip_automobila).subscribe();
  }

  public deleteTipAutomobila(tipAutomobilaID: number): void {
    console.log(this.API_URL_ID_W + tipAutomobilaID);
    this.httpClient.delete(this.API_URL_ID_W + tipAutomobilaID).subscribe();
  }

}
