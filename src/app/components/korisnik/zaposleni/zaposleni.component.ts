import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Zaposleni } from 'src/app/models/zaposleni';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ZaposleniService } from 'src/app/services/zaposleni.service';
import { MatDialog } from '@angular/material/dialog';
import { ZaposleniDialogComponent } from './zaposleni-dialog/zaposleni-dialog.component';

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'email',
    'sifra',
    'ime',
    'prezime',
    'jmbg',
    'telefon',
    'prodavnica_id',
    'actions',
  ];
  dataSource: MatTableDataSource<Zaposleni>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(    private zaposleniService: ZaposleniService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.zaposleniService.getAllZaposleni(-1).subscribe((data) => {
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
                  case 'prodavnica':
                    return data.prodavnica_id;
                default:
                  return data[property];
              }
            };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

    openDialog(flag: number, zaposleni: Zaposleni) {
    const dialogRef = this.dialog.open(ZaposleniDialogComponent, {
      data: zaposleni
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

}
