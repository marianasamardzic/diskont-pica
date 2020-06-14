import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Porudzbina } from 'src/app/models/porudzbina';
import { MatSort } from '@angular/material/sort';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css'],
})
export class PorudzbinaComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'dobavljac',
    'prodavnica_id',
    'isporuceno',
    'datum_slanja',
    'datum_dospeca',
  ];
  dataSource: MatTableDataSource<Porudzbina>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  selektovanaPorudzbina: Porudzbina;

  constructor(
    private porudzbinaService: PorudzbinaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.porudzbinaService.getAllPorudzbina().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      // sortiranje po nazivu ugnježdenog objekta
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'dobavljac':
            return data.dobavljac.adresa;
          default:
            return data[property];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  selectRow(row: any) {
    this.selektovanaPorudzbina = row;
  }

  checkboxClicked(porudzbina: Porudzbina) {
    this.porudzbinaService.updatePorudzbina(porudzbina).subscribe((data) => {
      if (data != null) {
        this.snackBar.open('Porudzbina je uspesno izmenjena', 'U redu', {
          duration: 3000,
        });
        this.loadData();
      }
    });
  }
}
