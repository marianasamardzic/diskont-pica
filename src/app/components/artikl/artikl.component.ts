import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Artikl } from 'src/app/models/artikl';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ArtiklService } from 'src/app/services/artikl.service';
import { MatDialog } from '@angular/material/dialog';
import { ArtiklDialogComponent } from './artikl-dialog/artikl-dialog.component';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'naziv',
    'cena',
    'alkoholno',
    'actions',
  ];
  dataSource: MatTableDataSource<Artikl>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(    private artiklService: ArtiklService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.artiklService.getAllArtikl().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  openDialog(flag: number, artikl: Artikl) {
    const dialogRef = this.dialog.open(ArtiklDialogComponent, {
      data: artikl,
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
}
