import { Component, OnInit, ViewChild } from '@angular/core';
import { Servis } from '../../models/servis';
import { HttpClient } from '@angular/common/http';
import { ServisService } from '../../services/servis.services';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ServisDialogComponent } from '../dialogs/servis-dialog/servis-dialog.component';

@Component({
  selector: 'app-servis',
  templateUrl: './servis.component.html',
  styleUrls: ['./servis.component.css']
})
export class ServisComponent implements OnInit {
  displayedColumns = ['servisID', 'datumServisiranja', 'opis', 'cenaServisa', 'aktuelan', 'actions'];
  dataSource: MatTableDataSource<Servis>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  constructor(public httpClient: HttpClient, public dialog: MatDialog, public servisService: ServisService) { }
  public loadData() {
    this.servisService.getAllServis().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'servisID':
            return data[property];
          case 'cenaServisa':
            return data[property];
          case 'aktuelan' :
            return data[property];
          default:
            return data[property].toLocaleLowerCase();

        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit() {
    this.loadData();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  public openDialog(flag: number, servisID: number, datumServisiranja: Date, opis: string, cenaServisa: number, aktuelan: boolean) {
    const dialogRef = this.dialog.open(ServisDialogComponent, {
      // tslint:disable-next-line:object-literal-shorthand
      data: { servisID: servisID, datumServisiranja: datumServisiranja, opis: opis, cenaServisa: cenaServisa, aktuelan: aktuelan }
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line:triple-equals
      if (result == 1) {
        this.loadData();
      }
    });
  }
}
