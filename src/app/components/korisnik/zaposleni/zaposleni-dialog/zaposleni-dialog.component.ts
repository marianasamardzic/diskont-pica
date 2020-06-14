import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ZaposleniService } from 'src/app/services/zaposleni.service';
import { Zaposleni } from 'src/app/models/zaposleni';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-zaposleni-dialog',
  templateUrl: './zaposleni-dialog.component.html',
  styleUrls: ['./zaposleni-dialog.component.css']
})
export class ZaposleniDialogComponent implements OnInit {
  flag: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Zaposleni,
    private zaposleniService: ZaposleniService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ZaposleniDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data == null) {
      this.data = {id:-1, prodavnica_id:-1,korisnik: {id:-1, email:'',sifra:'',ime:'', prezime:'', telefon:'', jmbg:'', uloga:{id:-1,naziv:''}}};
    }
  }

  onConfirmClick() {
    if (this.flag == 1) {
      this.zaposleniService.addZaposleni(this.data);
      this.snackBar.open('Uspešno dodat zaposleni' , 'U redu', {
        duration: 2500
      });
      this.dialogRef.close();
    } else if (this.flag == 2) {
      this.zaposleniService.updateZaposleni(this.data);
      this.snackBar.open('Uspešno izmenjen zaposleni' , 'U redu', {
        duration: 2500
      });
      this.dialogRef.close();
    } else {
      this.zaposleniService.deleteZaposleni(this.data.id);
      this.snackBar.open('Uspešno obrisan administrator' , 'U redu', {
        duration: 2500
      });
      this.dialogRef.close();
    }
  }
}
