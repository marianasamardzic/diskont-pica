import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menadzer } from 'src/app/models/menadzer';
import { MenadzerService } from 'src/app/services/menadzer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menadzer-dialog',
  templateUrl: './menadzer-dialog.component.html',
  styleUrls: ['./menadzer-dialog.component.css']
})
export class MenadzerDialogComponent implements OnInit {
  flag: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Menadzer,
    private menadzerService: MenadzerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<MenadzerDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data == null) {
      this.data = {id:-1, korisnik: {id:-1, email:'',sifra:'',ime:'', prezime:'', telefon:'', jmbg:'', uloga:{id:-1,naziv:''}}};
    }
  }

  onConfirmClick() {
    if (this.flag == 1) {
      this.menadzerService.addMenadzer(this.data);
      this.snackBar.open('Uspešno dodat menadzer' , 'U redu', {
        duration: 2500
      });
      this.dialogRef.close();
    } else if (this.flag == 2) {
      this.menadzerService.updateMendzer(this.data);
      this.snackBar.open('Uspešno izmenjen menadzer' , 'U redu', {
        duration: 2500
      });
      this.dialogRef.close();
    } else {
      this.menadzerService.deleteMenadzer(this.data.id);
      this.snackBar.open('Uspešno obrisan menadzer' , 'U redu', {
        duration: 2500
      });
      this.dialogRef.close();
    }
  }
}
