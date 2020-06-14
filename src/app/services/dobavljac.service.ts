import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Dobavljac } from '../models/dobavljac';
import { ɵDomAdapter } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DobavljacService {
  private readonly API_URL = 'http://localhost:8081/api/dobavljac';
  dataChange: BehaviorSubject<Dobavljac[]> = new BehaviorSubject<Dobavljac[]>(
    []
  );

  constructor(private httpClient: HttpClient) {}

  public getAllDobavljac(): Observable<Dobavljac[]> {
    this.httpClient.get<Dobavljac[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }
  public addDobavljac(dobavljac: Dobavljac) {
    this.httpClient.post(this.API_URL, dobavljac).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  public updateDobavljac(dobavljac: Dobavljac) {
    this.httpClient.put(this.API_URL + '/' + dobavljac.id, dobavljac).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  public deleteDobavljac(id: number) {
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
