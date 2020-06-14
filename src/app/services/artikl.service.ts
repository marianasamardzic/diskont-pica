import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Artikl } from '../models/artikl';

@Injectable({
  providedIn: 'root',
})
export class ArtiklService {
  private readonly API_URL = 'http://localhost:8081/api/artikl';
  dataChange: BehaviorSubject<Artikl[]> = new BehaviorSubject<Artikl[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllArtikl(): Observable<Artikl[]> {
    this.httpClient.get<Artikl[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }
  public addArtikl(artikl: Artikl) {
    this.httpClient.post(this.API_URL, artikl).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  public updateArtikl(artikl: Artikl) {
    this.httpClient.put(this.API_URL + '/' + artikl.id, artikl).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
}
