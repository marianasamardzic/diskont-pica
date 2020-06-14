import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  //properties
  email = '';
  sifra = '';

  //constructor
  constructor(private loginService: LoginService,private snackBar: MatSnackBar, private router: Router) {}

  //life cycle
  ngOnInit(): void {}

  //button actions
  public loginClicked() {
    this.loginService.login(this.email, this.sifra).subscribe((data) => {
      if(data != null){
        this.snackBar.open("Uspesno ste se ulogovali","U redu",{duration: 3000});
        this.router.navigateByUrl('stanje');
      } else {
        this.snackBar.open("Neuspesno logovanje","U redu",{duration: 3000});
      }
    });
  }
}
