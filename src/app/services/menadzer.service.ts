import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Menadzer } from '../models/menadzer';

@Injectable({
  providedIn: 'root',
})
export class MenadzerService {
  private readonly API_URL = 'http://localhost:8081/api/menadzer';
  dataChange: BehaviorSubject<Menadzer[]> = new BehaviorSubject<Menadzer[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllMenadzer(): Observable<Menadzer[]> {
    this.httpClient.get<Menadzer[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }
  public addMenadzer(menadzer: Menadzer) {
    this.httpClient.post(this.API_URL, menadzer).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  public updateMendzer(menadzer: Menadzer) {
    this.httpClient.put(this.API_URL + '/' + menadzer.id, menadzer).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  public deleteMenadzer(id: number) {
    this.httpClient.delete(this.API_URL + '/' + id).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
}
