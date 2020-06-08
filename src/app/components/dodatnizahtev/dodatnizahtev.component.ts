import { Component, OnInit, ViewChild } from '@angular/core';
import { DodatniZahtev } from '../../models/dodatni_zahtev';
import { HttpClient } from '@angular/common/http';
import { DodatniZahtevService } from '../../services/dodatnizahtev.services';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DodatniZahtevDialogComponent } from '../dialogs/dodatnizahtev-dialog/dodatnizahtev-dialog.component';
import { KupoprodajniUgovor } from 'src/app/models/kupoprodajni_ugovor';

@Component({
  selector: 'app-dodatnizahtev',
  templateUrl: './dodatnizahtev.component.html',
  styleUrls: ['./dodatnizahtev.component.css']
})
export class DodatniZahtevComponent implements OnInit {

  displayedColumns = ['dodatniZahtevID', 'opisZahteva', 'datumPodnosenja', 'kupoprodajniUgovorID', 'actions'];
  dataSource: MatTableDataSource<DodatniZahtev>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  selektovanZahtev: DodatniZahtev;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dodatniZahtevService: DodatniZahtevService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.dodatniZahtevService.getAllDodatniZahtev().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'kupoprodajniUgovorID' ? currentTerm + data.kupoprodajniUgovorID.kupoprodajniUgovorID : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'kupoprodajniUgovor':
             return data.kupoprodajniUgovorID.kupoprodajniUgovorID.toString().toLocaleLowerCase();
          default:
          return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  selectRow(row) {
    this.selektovanZahtev = row;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // tslint:disable-next-line:max-line-length
  public openDialog(flag: number, dodatniZahtevID: number, opisZahteva: string, datumPodnosenja: Date, kupoprodajniUgovorID: KupoprodajniUgovor) {
    const dialogRef = this.dialog.open(DodatniZahtevDialogComponent,
                      // tslint:disable-next-line:object-literal-shorthand
                      // tslint:disable-next-line:max-line-length
                      { data: { dodatniZahtevID, opisZahteva, datumPodnosenja, kupoprodajniUgovorID} });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line:triple-equals
      if (result == 1) {
        this.loadData();
      }
    });
  }

}
