import { Component, OnInit, ViewChild } from '@angular/core';
import { Prodavac } from '../../models/prodavac';
import { HttpClient } from '@angular/common/http';
import { ProdavacService } from '../../services/prodavac.services';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProdavacDialogComponent } from '../dialogs/prodavac-dialog/prodavac-dialog.component';
import { Korisnik } from 'src/app/models/korisnik';

@Component({
  selector: 'app-prodavac',
  templateUrl: './prodavac.component.html',
  styleUrls: ['./prodavac.component.css']
})
export class ProdavacComponent implements OnInit {

  displayedColumns = ['prodavacID', 'ime', 'prezime', 'JMBG', 'adresa',
  'kontakt', 'datumZaposlenja', 'korisnikID', 'actions'];
  dataSource: MatTableDataSource<Prodavac>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  selektovanProdavac: Prodavac;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public prodavacService: ProdavacService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.prodavacService.getAllProdavac().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'korisnikID' ? currentTerm + data.korisnikID.korisnikID : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'korisnik':
             return data.korisnikID.korisnikID.toString().toLocaleLowerCase();
          default:
          return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  selectRow(row) {
    this.selektovanProdavac = row;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // tslint:disable-next-line:max-line-length
  public openDialog(flag: number, kupacID: number, ime: string, prezime: string, JMBG: number, adresa: string, kontakt: string, datumZaposlenja: Date, korisnikID: Korisnik) {
    const dialogRef = this.dialog.open(ProdavacDialogComponent,
                      // tslint:disable-next-line:object-literal-shorthand
                      // tslint:disable-next-line:max-line-length
                      { data: { kupacID, ime, prezime, JMBG, adresa, kontakt, datumZaposlenja, korisnikID} });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line:triple-equals
      if (result == 1) {
        this.loadData();
      }
    });
  }

}
