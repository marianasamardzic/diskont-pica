import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Menadzer } from 'src/app/models/menadzer';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MenadzerService } from 'src/app/services/menadzer.service';
import { MatDialog } from '@angular/material/dialog';
import { MenadzerDialogComponent } from './menadzer-dialog/menadzer-dialog.component';

@Component({
  selector: 'app-menadzer',
  templateUrl: './menadzer.component.html',
  styleUrls: ['./menadzer.component.css']
})
export class MenadzerComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'email',
    'sifra',
    'ime',
    'prezime',
    'jmbg',
    'telefon',
    'actions',
  ];
  dataSource: MatTableDataSource<Menadzer>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(    private menadzerService: MenadzerService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.menadzerService.getAllMenadzer().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
            // sortiranje po nazivu ugnježdenog objekta
            this.dataSource.sortingDataAccessor = (data, property) => {
              switch (property) {
                case 'id':
                  return data.korisnik.id;
                case 'email':
                  return data.korisnik.email.toLocaleLowerCase();
                case 'sifra':
                  return data.korisnik.sifra;
                case 'ime':
                  return data.korisnik.ime;
                case 'prezime':
                  return data.korisnik.prezime;
                case 'jmbg':
                  return data.korisnik.jmbg;
                case 'telefon':
                  return data.korisnik.telefon;
                default:
                  return data[property];
              }
            };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

    openDialog(flag: number, menadzer: Menadzer) {
    const dialogRef = this.dialog.open(MenadzerDialogComponent, {
      data: menadzer
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

}
