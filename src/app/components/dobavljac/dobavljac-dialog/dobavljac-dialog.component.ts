import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Dobavljac } from 'src/app/models/dobavljac';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css'],
})
export class DobavljacDialogComponent implements OnInit {
  flag: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Dobavljac,
    private dobavljacService: DobavljacService,
    private snackBar: MatSnackBar,
    private dialogRef:MatDialogRef<DobavljacDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data == null) {
      this.data = { id: -1, telefon: '', adresa: '', email: '' };
    }
  }

  onConfirmClick() {
    if (this.flag == 1) {
      this.dobavljacService.addDobavljac(this.data);
      this.snackBar.open('Uspešno dodat dobavljac', 'U redu', {
        duration: 2500,
      });
      this.dialogRef.close();
    } else if (this.flag == 2) {
      this.dobavljacService.updateDobavljac(this.data);
      this.snackBar.open('Uspešno izmenjen dobavljac', 'U redu', {
        duration: 2500,
      });
      this.dialogRef.close();
    } else {
      this.dobavljacService.deleteDobavljac(this.data.id);
      this.snackBar.open('Uspešno izbrisan dobavljac', 'U redu', {
        duration: 2500,
      });
      this.dialogRef.close();
    }
  }
}
