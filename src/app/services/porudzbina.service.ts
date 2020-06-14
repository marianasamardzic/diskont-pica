import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Porudzbina } from '../models/porudzbina';

@Injectable({
  providedIn: 'root',
})
export class PorudzbinaService {
  private readonly API_URL = 'http://localhost:8081/api/porudzbina';
  dataChange: BehaviorSubject<Porudzbina[]> = new BehaviorSubject<Porudzbina[]>(
    []
  );
  dataChangePorudzbina: BehaviorSubject<Porudzbina> = new BehaviorSubject<
    Porudzbina
  >(null);

  constructor(private httpClient: HttpClient) {}

  public getAllPorudzbina(): Observable<Porudzbina[]> {
    this.httpClient.get<Porudzbina[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }
  public addPorudzbina(
    dobavljacId: number,
    prodavnicaId: number
  ): Observable<Porudzbina> {
    let body = {
      dobavljac_id: dobavljacId,
      prodavnica_id: prodavnicaId,
    };
    this.httpClient.post<Porudzbina>(this.API_URL, body).subscribe(
      (data) => {
        this.dataChangePorudzbina.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChangePorudzbina.asObservable();
  }
  public updatePorudzbina(porudzbina: Porudzbina): Observable<Porudzbina> {
    let body = {
      dobavljac_id: porudzbina.dobavljac.id,
      prodavnica_id: porudzbina.prodavnica_id,
      isporuceno: porudzbina.isporuceno
    };
    this.httpClient.put<Porudzbina>(this.API_URL+'/'+porudzbina.id, body).subscribe(
      (data) => {
        this.dataChangePorudzbina.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChangePorudzbina.asObservable();
  }
}
