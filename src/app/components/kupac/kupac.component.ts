import { Component, OnInit, ViewChild } from '@angular/core';
import { Kupac } from '../../models/kupac';
import { HttpClient } from '@angular/common/http';
import { KupacService } from '../../services/kupac.services';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { KupacDialogComponent } from '../dialogs/kupac-dialog/kupac-dialog.component';
import { Korisnik } from 'src/app/models/korisnik';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {

  displayedColumns = ['kupacID', 'ime', 'prezime', 'JMBG', 'adresa',
  'kontakt', 'popustNaKupovinu', 'korisnikID', 'actions'];
  dataSource: MatTableDataSource<Kupac>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  selektovanKupac: Kupac;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public kupacService: KupacService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.kupacService.getAllKupac().subscribe(data => {
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
    this.selektovanKupac = row;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // tslint:disable-next-line:max-line-length
  public openDialog(flag: number, kupacID: number, ime: string, prezime: string, JMBG: number, adresa: string, kontakt: string, popustNaKupovinu: number, korisnikID: Korisnik) {
    const dialogRef = this.dialog.open(KupacDialogComponent,
                      // tslint:disable-next-line:object-literal-shorthand
                      // tslint:disable-next-line:max-line-length
                      { data: { kupacID, ime, prezime, JMBG, adresa, kontakt, popustNaKupovinu, korisnikID} });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line:triple-equals
      if (result == 1) {
        this.loadData();
      }
    });
  }

}
