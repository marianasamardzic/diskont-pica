import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StavkaRacuna } from '../models/stavka-racuna';

@Injectable({
  providedIn: 'root'
})
export class StavkaRacunaService {

  private readonly API_URL = 'http://localhost:8081/api/stavkaracuna';
  dataChange: BehaviorSubject<StavkaRacuna[]> = new BehaviorSubject<StavkaRacuna[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllStavkaRacuna(racunId: number): Observable<StavkaRacuna[]>{
    this.httpClient.get<StavkaRacuna[]>(this.API_URL+'?racun='+racunId).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }
  );
  return this.dataChange.asObservable();
  }
  public addStavkaRacuna(stavkaRacuna: StavkaRacuna) {
    this.httpClient.post(this.API_URL, stavkaRacuna).subscribe(data => {
      console.log(data);
    }),
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }
  }
}
