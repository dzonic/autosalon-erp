import { Component, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from '../../models/korisnik';
import { HttpClient } from '@angular/common/http';
import { KorisnikService } from '../../services/korisnik.services';
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';
import { KorisnikDialogComponent } from '../dialogs/korisnik-dialog/korisnik-dialog.component';
import { error } from 'util';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit {
  displayedColumns = ['korisnikID', 'email', 'password', 'uloga', 'actions'];
  // dataSource: Observable<Liga[]>;
  dataSource: MatTableDataSource<Korisnik>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public korisnikService: KorisnikService
  ) {}

  public loadData() {
    this.korisnikService.getAllKorisnik().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'korisnikID':
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
  public openDialog(flag: number, korisnikID: number, email: string, password: string, uloga: string) {
    const dialogRef = this.dialog.open(KorisnikDialogComponent, {
      // tslint:disable-next-line:object-literal-shorthand
      data: { korisnikID: korisnikID, email: email, password: password, uloga: uloga }
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
