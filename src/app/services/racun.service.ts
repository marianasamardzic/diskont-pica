import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Racun } from '../models/racun';
import { StavkaRacuna } from '../models/stavka-racuna';

@Injectable({
  providedIn: 'root',
})
export class RacunService {
  private readonly API_URL = 'http://localhost:8081/api/racun';
  dataChangeRacun: BehaviorSubject<Racun> = new BehaviorSubject<Racun>(null);
  dataChange: BehaviorSubject<Racun[]> = new BehaviorSubject<Racun[]>(null);

  constructor(private httpClient: HttpClient) {}

  public getAllRacun(): Observable<Racun[]>{
    this.httpClient.get<Racun[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }
  );
  return this.dataChange.asObservable();
  }

  public addRacun(zaposleni_id:number): Observable<Racun> {
    let body = {
      zaposleni_id: zaposleni_id
    };
    this.httpClient.post<Racun>(this.API_URL, body).subscribe(
      (data) => {
        this.dataChangeRacun.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChangeRacun.asObservable();
  }
}
