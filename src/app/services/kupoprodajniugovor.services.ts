import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { KupoprodajniUgovor } from '../models/kupoprodajni_ugovor';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class KupoprodajniUgovorService {

  private readonly API_URL = 'http://localhost:8081/api/kupoprodajniUgovor';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/kupoprodajniUgovor/';

  dataChange: BehaviorSubject<KupoprodajniUgovor[]> = new BehaviorSubject<KupoprodajniUgovor[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllKupoprodajniUgovor(): Observable<KupoprodajniUgovor[]> {
      this.httpClient.get<KupoprodajniUgovor[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }

  // tslint:disable-next-line:variable-name
  public addKupoprodajniUgovor(kupoprodajni_ugovor: KupoprodajniUgovor): void {
    console.log(this.API_URL, kupoprodajni_ugovor);
    this.httpClient.post(this.API_URL, kupoprodajni_ugovor).subscribe();
  }

  // tslint:disable-next-line:variable-name
  public updateKupoprodajniUgovor(kupoprodajni_ugovor: KupoprodajniUgovor): void {
    this.httpClient.put(this.API_URL + '/' + kupoprodajni_ugovor.kupoprodajniUgovorID, kupoprodajni_ugovor).subscribe();
  }

  public deleteKupoprodajniUgovor(kupoprodajniUgovorID: number): void {
    console.log(this.API_URL_ID_W + kupoprodajniUgovorID);
    this.httpClient.delete(this.API_URL_ID_W + kupoprodajniUgovorID).subscribe();
  }
}
