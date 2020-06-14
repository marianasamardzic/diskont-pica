import { ProdavnicaService } from './../../../services/prodavnica.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Prodavnica } from 'src/app/models/prodavnica';
import { Menadzer } from 'src/app/models/menadzer';
import { MenadzerService } from 'src/app/services/menadzer.service';
import { MenadzerDialogComponent } from '../../korisnik/menadzer/menadzer-dialog/menadzer-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prodavnica-dialog',
  templateUrl: './prodavnica-dialog.component.html',
  styleUrls: ['./prodavnica-dialog.component.css']
})
export class ProdavnicaDialogComponent implements OnInit {
  flag: number;
    //menadzeri
    menadzeri: Menadzer[];
    selectedMenadzer: Menadzer;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Prodavnica,
    private prodavnicaService: ProdavnicaService,
    private menadzerService: MenadzerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProdavnicaDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data == null) {
      this.data = {id:-1, adresa:'', grad:'', postanski_broj:'', telefon:'', menadzer: {id: -1, korisnik: {id:-1, sifra:'', email: '', ime:'', prezime:'', jmbg:'', telefon:'', uloga: {id:-1, naziv:''}}}};
    }
    this.menadzerService.getAllMenadzer().subscribe( data => {
      this.menadzeri = data;
      this.selectedMenadzer = data[0];
    });
  }

  onConfirmClick() {
    this.data.menadzer = this.selectedMenadzer;
    if (this.flag == 1) {
      this.prodavnicaService.addProdavnica(this.data);
      this.snackBar.open('Uspesno dodata prodavnica', 'U redu', {duration: 3000});
      this.dialogRef.close();
    } else if (this.flag == 2) {
      this.prodavnicaService.updateProdavnoca(this.data);
      this.snackBar.open('Uspesno izmenjena prodavnica', 'U redu', {duration: 3000});
      this.dialogRef.close();
    } else {
      this.prodavnicaService.deleteProdavnica(this.data.id);
      this.snackBar.open('Uspesno obrisana prodavnica', 'U redu', {duration: 3000});
      this.dialogRef.close();
    }
  }
}
