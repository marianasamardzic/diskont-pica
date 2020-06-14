import { Artikl } from './../../../models/artikl';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ArtiklService } from 'src/app/services/artikl.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-artikl-dialog',
  templateUrl: './artikl-dialog.component.html',
  styleUrls: ['./artikl-dialog.component.css']
})
export class ArtiklDialogComponent implements OnInit {
  flag: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Artikl,
    private artiklService: ArtiklService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ArtiklDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data == null) {
      this.data = {id:-1, cena:0, alkoholno: false, naziv: ''};
    }
  }

  onConfirmClick() {
    if (this.flag == 1) {
      this.artiklService.addArtikl(this.data)
      this.snackBar.open('Uspesno dodat artikl', 'U redu', {duration: 3000});
      this.dialogRef.close();

    } else if (this.flag == 2) {
      this.artiklService.updateArtikl(this.data);
      this.snackBar.open('Uspesno izmenjen artikl', 'U redu', {duration: 3000});
      this.dialogRef.close();
    }
  }
}
