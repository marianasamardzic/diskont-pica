import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Stanje } from 'src/app/models/stanje';
import { StanjeService } from 'src/app/services/stanje.service';
import { Prodavnica } from 'src/app/models/prodavnica';
import { ProdavnicaService } from 'src/app/services/prodavnica.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPorudzbinaDialogComponent } from './add-porudzbina-dialog/add-porudzbina-dialog.component';
import { LoginService } from 'src/app/services/login.service';
import { AddRacunDialogComponent } from './add-racun-dialog/add-racun-dialog.component';

@Component({
  selector: 'app-stanje',
  templateUrl: './stanje.component.html',
  styleUrls: ['./stanje.component.css'],
})
export class StanjeComponent implements OnInit {
  //prodavnice
  prodavnice: Prodavnica[];
  selectedprodavnica: Prodavnica;

  //tabela
  displayedColumns: string[] = [
    'checked',
    'id',
    'naziv',
    'cena',
    'alkoholno',
    'kolicina',
  ];
  dataSource: MatTableDataSource<Stanje>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  //selektovani red
  checkedStanje: Stanje[] = [];

  //dugmici
  isPorudzbinaDisabled: Boolean;
  isRacunDisabled: Boolean;

  constructor(
    private prodavnicaService: ProdavnicaService,
    private stanjeService: StanjeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  //life cycle
  ngOnInit(): void {
    if (this.loginService.currentUserValue.uloga.id == 2) {
      this.isPorudzbinaDisabled = false;
    } else {
      this.isPorudzbinaDisabled = true;
    }
    if (this.loginService.currentUserValue.uloga.id == 1) {
      this.isRacunDisabled = false;
    } else {
      this.isRacunDisabled = true;
    }
    this.loadData(1);
  }

  //loading data
  public loadData(id: number) {
    var zaposleniId = -1;
    var menadzerId = -1;
    if (this.loginService.currentUserValue.uloga.id == 1) {
      zaposleniId = this.loginService.currentUserValue.id;
    } else if(this.loginService.currentUserValue.uloga.id == 2){
      menadzerId = this.loginService.currentUserValue.id
    }
    this.prodavnicaService.getAllProdavnica(zaposleniId, menadzerId).subscribe((data) => {
      this.prodavnice = data;
      this.selectedprodavnica = data[0];
      if (this.selectedprodavnica != null) {
        this.loadTable(this.selectedprodavnica.id);
      }
    });
  }
  public loadTable(id: number) {
    console.log('load table');
    this.stanjeService.getAllStanje(id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      // sortiranje po nazivu ugnježdenog objekta
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id':
            return data.artikl.id;
          case 'naziv':
            return data.artikl.naziv.toLocaleLowerCase();
          case 'cena':
            return data.artikl.cena;
          case 'alkoholno':
            return data.artikl.alkoholno;
          default:
            return data[property];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  //dijalozi
  openDialog() {
    const dialogRef = this.dialog.open(AddRacunDialogComponent, {
      data: this.checkedStanje,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable(this.selectedprodavnica.id);
    });
  }

  openPorudzbinaDialog() {
    const dialogRef = this.dialog.open(AddPorudzbinaDialogComponent, {
      data: this.checkedStanje,
    });
    dialogRef.componentInstance.prodavnica_id = this.selectedprodavnica.id;
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable(this.selectedprodavnica.id);
    });
  }

  //selektovanje artikala
  public checked($event, element: Stanje) {
    if ($event.checked) {
      var index = this.checkedStanje.findIndex(
        (x) => x.artikl.id == element.artikl.id
      );

      if (index === -1) {
        this.checkedStanje.push(element);
      }
    } else {
      for (var i = 0; i < this.checkedStanje.length; i++) {
        if (this.checkedStanje[i].artikl.id == element.artikl.id) {
          this.checkedStanje.splice(i, 1);
        }
      }
    }
  }
}
