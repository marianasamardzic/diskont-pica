import { ProdavnicaService } from './../../services/prodavnica.service';
import { Prodavnica } from './../../models/prodavnica';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProdavnicaDialogComponent } from './prodavnica-dialog/prodavnica-dialog.component';

@Component({
  selector: 'app-prodavnica',
  templateUrl: './prodavnica.component.html',
  styleUrls: ['./prodavnica.component.css']
})
export class ProdavnicaComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'adresa',
    'grad',
    'postanski_broj',
    'telefon',
    'menadzer',
    'actions'
  ];
  dataSource: MatTableDataSource<Prodavnica>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(    private prodavnicaService: ProdavnicaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.prodavnicaService.getAllProdavnica(-1, -1).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  openDialog(flag: number, prodavnica: Prodavnica) {
    const dialogRef = this.dialog.open(ProdavnicaDialogComponent, {
      data: prodavnica,
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
}
