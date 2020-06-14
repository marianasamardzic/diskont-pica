import { Injectable } from '@angular/core';
import { Stanje } from '../models/stanje';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StanjeService {

  private readonly API_URL = "http://localhost:8081/api/stanje?prodavnica="
  dataChange: BehaviorSubject<Stanje[]> = new BehaviorSubject<Stanje[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllStanje(id: number): Observable<Stanje[]>{
    this.httpClient.get<Stanje[]>(this.API_URL+id).subscribe( data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ''+ error.message);
    });
    return this.dataChange.asObservable();
  }
}
