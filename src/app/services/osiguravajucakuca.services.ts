import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OsiguravajucaKuca } from '../models/osiguravajuca_kuca';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';




@Injectable()
export class OsiguravajucaKucaService {

  private readonly API_URL = 'http://localhost:8081/api/osiguravajucaKuca';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/osiguravajucaKuca/';

  dataChange: BehaviorSubject<OsiguravajucaKuca[]> = new BehaviorSubject<OsiguravajucaKuca[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllOsiguravajucaKuca(): Observable<OsiguravajucaKuca[]> {
      this.httpClient.get<OsiguravajucaKuca[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }
  // tslint:disable-next-line:variable-name
  public addOsiguravajucaKuca(osiguravajuca_kuca: OsiguravajucaKuca): void {
    this.httpClient.post(this.API_URL, osiguravajuca_kuca).subscribe();
  }

  // tslint:disable-next-line:variable-name
  public updateOsiguravajucaKuca(osiguravajuca_kuca: OsiguravajucaKuca): void {
    this.httpClient.put(this.API_URL + '/' + osiguravajuca_kuca.osiguravajucaKucaID, osiguravajuca_kuca).subscribe();
  }

  public deleteOsiguravajucaKuca(osiguravajucaKucaID: number): void {
    console.log(this.API_URL_ID_W + osiguravajucaKucaID);
    this.httpClient.delete(this.API_URL_ID_W + osiguravajucaKucaID).subscribe();
  }

}
