import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Administrator } from '../models/administrator';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  private readonly API_URL = 'http://localhost:8081/api/administrator';
  dataChange: BehaviorSubject<Administrator[]> = new BehaviorSubject<
    Administrator[]
  >([]);

  constructor(private httpClient: HttpClient) {}

  public getAllAdministrator(): Observable<Administrator[]> {
    this.httpClient.get<Administrator[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }
  public addAdministrator(administrator: Administrator) {
    console.log(administrator);
    this.httpClient.post(this.API_URL, administrator).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  public updateAdministrator(administrator: Administrator) {
    this.httpClient
      .put(this.API_URL + '/' + administrator.id, administrator)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  public deleteAdministrator(id: number) {
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
