import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Korisnik } from './../models/korisnik';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<Korisnik>;
  public currentUser: Observable<Korisnik>;

  private readonly API_URL = 'http://localhost:8081/api/login';

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Korisnik>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Korisnik {
    return this.currentUserSubject.value;
}

  public login(email: string, sifra: string): Observable<Korisnik> {
    let body = {
      email: email,
      sifra: sifra,
    };
    this.httpClient.post<Korisnik>(this.API_URL, body).subscribe(
      (data) => {
        if(data.id != null) {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + '' + error.message);
      }
    );
    return this.currentUserSubject.asObservable();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}
