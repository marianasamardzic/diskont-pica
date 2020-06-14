import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Stanje } from 'src/app/models/stanje';
import { RacunService } from 'src/app/services/racun.service';
import { StavkaRacuna } from 'src/app/models/stavka-racuna';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';
import { LoginService } from 'src/app/services/login.service';
import { ZaposleniService } from 'src/app/services/zaposleni.service';
import { Zaposleni } from 'src/app/models/zaposleni';

@Component({
  selector: 'app-add-racun-dialog',
  templateUrl: './add-racun-dialog.component.html',
  styleUrls: ['./add-racun-dialog.component.css'],
})
export class AddRacunDialogComponent implements OnInit {
  stavke: StavkaRacuna[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddRacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stanje[],
    private racunService: RacunService,
    private stavkaRacunaService: StavkaRacunaService,
    private loginService: LoginService,
    private zaposleniService: ZaposleniService
  ) {}
  ngOnInit(): void {
    for (var i = 0; i < this.data.length; i++) {
      this.stavke.push({
        artikl: this.data[i].artikl,
        racun: null,
        kolicina: 1,
      });
    }
  }

  onConfirmClick(): void {
    this.zaposleniService
      .getAllZaposleni(this.loginService.currentUserValue.id)
      .subscribe((zaposleni) => {
        if (zaposleni.length > 0) {
          this.racunService
            .addRacun(zaposleni[0].id)
            .subscribe((racun) => {
              if (racun != null) {
                for (var i = 0; i < this.stavke.length; i++) {
                  this.stavke[i].racun = racun;
                  this.stavkaRacunaService.addStavkaRacuna(this.stavke[i]);
                  this.snackBar.open('Uspešno kreiran racun', 'U redu', {
                    duration: 1500,
                  });
                  this.dialogRef.close();
                }
              } else {
                this.snackBar.open('Nema dovoljno artikala na stanju','U redu', { duration: 1500});
                this.dialogRef.close();
              }
            });
        } else {
          this.snackBar.open('Nema dovoljno artikala na stanju','U redu', { duration: 1500});
          this.dialogRef.close();
        }
      });
  }
}
