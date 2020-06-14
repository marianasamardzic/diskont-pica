import { Stanje } from './../../../models/stanje';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Porudzbina } from 'src/app/models/porudzbina';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { Dobavljac } from 'src/app/models/dobavljac';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { StavkaPorudzbina } from 'src/app/models/stavka-porudzbina';
import { StavkaPorudzbineService } from 'src/app/services/stavka-porudzbine.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-porudzbina-dialog',
  templateUrl: './add-porudzbina-dialog.component.html',
  styleUrls: ['./add-porudzbina-dialog.component.css']
})
export class AddPorudzbinaDialogComponent implements OnInit {

  prodavnica_id: number;
  porudzbina: Porudzbina;
  dobavljaci: Dobavljac[];
  selektovaniDobavljac: Dobavljac;
  stavke: StavkaPorudzbina[] = [];

  constructor(
    private dobavljacService: DobavljacService,
    private porudzbinaService: PorudzbinaService,
    private stavkaPorudzbinaService: StavkaPorudzbineService,
    @Inject(MAT_DIALOG_DATA) public data: Stanje[],
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddPorudzbinaDialogComponent>
  ) { }

  ngOnInit(): void {
    this.loadDobavljaci();
    for(var i = 0; i< this.data.length; i++ ){
      this.stavke.push({artikl: this.data[i].artikl, porudzbina_id: -1, kolicina: 1, id:-1});
    }
  }

  loadDobavljaci(){
    this.dobavljacService.getAllDobavljac().subscribe(dobavljaci => {
      this.dobavljaci = dobavljaci;
      this.selektovaniDobavljac = dobavljaci[0];
    });
  }

  onConfirmClick(): void {
    this.porudzbinaService.addPorudzbina(this.selektovaniDobavljac.id, this.prodavnica_id).subscribe((porudzbina) => {
      if (porudzbina != null) {
        console.log('Created porudzbina with id ' + porudzbina.id);
        for (var i = 0; i < this.stavke.length; i++) {
          this.stavke[i].porudzbina_id = porudzbina.id;
          console.log(this.stavke[i]);
          this.stavkaPorudzbinaService.addStavkaPorudzbina(this.stavke[i]);
          this.snackBar.open('Uspešno dodata porudžbina', 'U redu', { duration: 1500 });
          this.dialogRef.close();
        }
      }
    });
  }

}
