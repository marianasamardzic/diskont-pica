import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  Input,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { StavkaPorudzbina } from 'src/app/models/stavka-porudzbina';
import { MatSort } from '@angular/material/sort';
import { Porudzbina } from 'src/app/models/porudzbina';
import { StavkaPorudzbineService } from 'src/app/services/stavka-porudzbine.service';

@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css'],
})
export class StavkaPorudzbineComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['naziv', 'cena', 'alkoholno', 'kolicina'];
  dataSource: MatTableDataSource<StavkaPorudzbina>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() selektovanaPorudzbina: Porudzbina;

  constructor(private stavkaPorudzbinaService: StavkaPorudzbineService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selektovanaPorudzbina.id) {
      this.loadData();
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.stavkaPorudzbinaService
      .getAllStavkaPorudzbine(this.selektovanaPorudzbina.id)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'naziv':
              return data.artikl.naziv;
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
}
