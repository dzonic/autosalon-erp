import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Model } from '../models/model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable()
export class ModelService {

  private readonly API_URL = 'http://localhost:8081/api/model';
  private readonly API_URL_ID_W = 'http://localhost:8081/api/model/';

  dataChange: BehaviorSubject<Model[]> = new BehaviorSubject<Model[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllModel(): Observable<Model[]> {
      this.httpClient.get<Model[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          // tslint:disable-next-line:no-shadowed-variable
          (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }
  public addModel(model: Model): void {
    this.httpClient.post(this.API_URL, model).subscribe();
  }

  public updateModel(model: Model): void {
    this.httpClient.put(this.API_URL + '/' + model.modelID, model).subscribe();
  }

  public deleteModel(modelID: number): void {
    console.log(this.API_URL_ID_W + modelID);
    this.httpClient.delete(this.API_URL_ID_W + modelID).subscribe();
  }

}
