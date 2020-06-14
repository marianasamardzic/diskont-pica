import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Racun } from 'src/app/models/racun';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RacunService } from 'src/app/services/racun.service';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit {

  displayedColumns: string[] = ['id','vreme','zaposleni_id'];
  dataSource: MatTableDataSource<Racun>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  selektovaniRacun: Racun;

  constructor(private racunService: RacunService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.racunService.getAllRacun().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  selectRow(row: any) {
    this.selektovaniRacun = row;
    console.log(this.selektovaniRacun);
  }

}
