import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Administrator } from 'src/app/models/administrator';
import { AdministratorService } from 'src/app/services/administrator.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-administrator-dialog',
  templateUrl: './administrator-dialog.component.html',
  styleUrls: ['./administrator-dialog.component.css'],
})
export class AdministratorDialogComponent implements OnInit {
  flag: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Administrator,
    private administratorService: AdministratorService,
    private snackBar: MatSnackBar,
    private dialogRef:MatDialogRef<AdministratorDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data == null) {
      this.data = {id:-1, korisnik: {id:-1, email:'',sifra:'',ime:'', prezime:'', telefon:'', jmbg:'', uloga:{id:-1,naziv:''}}};
    }
  }

  onConfirmClick() {
    if (this.flag == 1) {
      this.administratorService.addAdministrator(this.data);
      this.snackBar.open('Uspešno dodat administrator' , 'U redu', {
        duration: 2500
      });
      this.dialogRef.close();
    } else if (this.flag == 2) {
      this.administratorService.updateAdministrator(this.data);
      this.snackBar.open('Uspešno izmenjen administrator' , 'U redu', {
        duration: 2500
      });
      this.dialogRef.close();
    } else {
      this.administratorService.deleteAdministrator(this.data.id);
      this.snackBar.open('Uspešno obrisan administrator' , 'U redu', {
        duration: 2500
      });
      this.dialogRef.close();
    }
  }
}
