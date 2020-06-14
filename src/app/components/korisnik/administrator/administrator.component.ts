import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Administrator } from 'src/app/models/administrator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdministratorService } from 'src/app/services/administrator.service';
import { MatDialog } from '@angular/material/dialog';
import { AdministratorDialogComponent } from './administrator-dialog/administrator-dialog.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css'],
})
export class AdministratorComponent implements OnInit {
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
  dataSource: MatTableDataSource<Administrator>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private administratorService: AdministratorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.administratorService.getAllAdministrator().subscribe((data) => {
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

  openDialog(flag: number, administrator: Administrator) {
    const dialogRef = this.dialog.open(AdministratorDialogComponent, {
      data: administrator,
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
}
