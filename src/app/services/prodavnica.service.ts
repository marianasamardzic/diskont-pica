import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prodavnica } from '../models/prodavnica';

@Injectable({
  providedIn: 'root',
})
export class ProdavnicaService {
  private readonly API_URL = 'http://localhost:8081/api/prodavnica';
  dataChange: BehaviorSubject<Prodavnica[]> = new BehaviorSubject<Prodavnica[]>(
    []
  );

  constructor(private httpClient: HttpClient) {}

  public getAllProdavnica(zaposleniId: number, menadzerId: number): Observable<Prodavnica[]> {
    var url = this.API_URL;
    if (zaposleniId != -1) {
      var url = url + '/zaposleni?zaposleni=' + zaposleniId;
    }
    if(menadzerId != -1) {
      var url = url + '/menadzer?menadzer=' + menadzerId;
    }
    this.httpClient.get<Prodavnica[]>(url).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public addProdavnica(prodavnica: Prodavnica) {
    this.httpClient.post(this.API_URL, prodavnica).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  public updateProdavnoca(prodavnica: Prodavnica) {
    this.httpClient
      .put(this.API_URL + '/' + prodavnica.id, prodavnica)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  public deleteProdavnica(id: number) {
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
