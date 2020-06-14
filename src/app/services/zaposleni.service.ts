import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Zaposleni } from '../models/zaposleni';

@Injectable({
  providedIn: 'root'
})
export class ZaposleniService {
  private readonly API_URL = 'http://localhost:8081/api/zaposleni';
  dataChange: BehaviorSubject<Zaposleni[]> = new BehaviorSubject<Zaposleni[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllZaposleni(korisnikId: number): Observable<Zaposleni[]> {
    var url = this.API_URL;
    if( korisnikId != -1){
      url = url + '?korisnik=' + korisnikId
    }
    this.httpClient.get<Zaposleni[]>(url).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }
  public addZaposleni(zaposleni: Zaposleni) {
    this.httpClient.post(this.API_URL, zaposleni).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  public updateZaposleni(zaposleni: Zaposleni) {
    this.httpClient.put(this.API_URL + '/' + zaposleni.id, zaposleni).subscribe(
      (data) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  public deleteZaposleni(id: number) {
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
