import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Dobavljac } from 'src/app/models/dobavljac';
import { MatSort } from '@angular/material/sort';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { MatDialog } from '@angular/material/dialog';
import { DobavljacDialogComponent } from './dobavljac-dialog/dobavljac-dialog.component';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'email',
    'adresa',
    'telefon',
    'actions',
  ];
  dataSource: MatTableDataSource<Dobavljac>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(    private dobavljacService: DobavljacService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.dobavljacService.getAllDobavljac().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  openDialog(flag: number, doabvljac: Dobavljac) {
    const dialogRef = this.dialog.open(DobavljacDialogComponent, {
      data: doabvljac,
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
}
