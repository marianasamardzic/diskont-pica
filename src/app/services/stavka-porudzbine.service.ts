import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StavkaPorudzbina } from '../models/stavka-porudzbina';

@Injectable({
  providedIn: 'root'
})
export class StavkaPorudzbineService {

  private readonly API_URL = 'http://localhost:8081/api/stavkaporudzbine';
  dataChange: BehaviorSubject<StavkaPorudzbina[]> = new BehaviorSubject<StavkaPorudzbina[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllStavkaPorudzbine(porudzbinaId: number): Observable<StavkaPorudzbina[]>{
    this.httpClient.get<StavkaPorudzbina[]>(this.API_URL+'?porudzbina='+porudzbinaId).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }
  );
  return this.dataChange.asObservable();
  }
  public addStavkaPorudzbina(stavkaPorudzbine: StavkaPorudzbina) {
    this.httpClient.post(this.API_URL, stavkaPorudzbine).subscribe(data => {
      console.log(data);
    }),
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }
  }
}
