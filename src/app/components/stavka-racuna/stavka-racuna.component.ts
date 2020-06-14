import { Racun } from './../../models/racun';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StavkaRacuna } from 'src/app/models/stavka-racuna';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';

@Component({
  selector: 'app-stavka-racuna',
  templateUrl: './stavka-racuna.component.html',
  styleUrls: ['./stavka-racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['naziv','cena','alkoholno', 'kolicina'];
  dataSource: MatTableDataSource<StavkaRacuna>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() selektovaniRacun: Racun;

  constructor(private stavkaRacunaService: StavkaRacunaService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selektovaniRacun.id) {
      this.loadData();
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.stavkaRacunaService.getAllStavkaRacuna(this.selektovaniRacun.id).subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
