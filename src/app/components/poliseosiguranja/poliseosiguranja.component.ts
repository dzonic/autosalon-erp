import { Component, OnInit, ViewChild } from '@angular/core';
import { PoliseOsiguranja } from '../../models/polise_osiguranja';
import { HttpClient } from '@angular/common/http';
import { PoliseOsiguranjaService } from '../../services/poliseosiguranja.services';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PoliseOsiguranjaDialogComponent } from '../dialogs/poliseosiguranja-dialog/poliseosiguranja-dialog.component';
import { OsiguravajucaKuca } from 'src/app/models/osiguravajuca_kuca';

@Component({
  selector: 'app-poliseosiguranja',
  templateUrl: './poliseosiguranja.component.html',
  styleUrls: ['./poliseosiguranja.component.css']
})
export class PoliseOsiguranjaComponent implements OnInit {

  displayedColumns = ['poliseOsiguranjaID', 'vaziOd', 'vaziDo', 'osiguravajucaKuca',  'actions'];
  dataSource: MatTableDataSource<PoliseOsiguranja>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  selektovanaPolisaOsiguranja: PoliseOsiguranja;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public poliseOsiguranjaService: PoliseOsiguranjaService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.poliseOsiguranjaService.getAllPoliseOsiguranja().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'osiguravajucaKucaID' ? currentTerm + data.osiguravajucaKucaID.osiguravajucaKucaID : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'osiguravajucaKucaID':
             return data.osiguravajucaKucaID.osiguravajucaKucaID.toString().toLocaleLowerCase();
          default:
          return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  selectRow(row) {
    this.selektovanaPolisaOsiguranja = row;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, poliseOsiguranjaID: number, vaziOd: Date, vaziDo: Date, osigravajucaKucaID: OsiguravajucaKuca) {
    const dialogRef = this.dialog.open(PoliseOsiguranjaDialogComponent,
                      { data: { poliseOsiguranjaID, vaziOd, vaziDo, osiguravajucaKucaID: osigravajucaKucaID } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line:triple-equals
      if (result == 1) {
        this.loadData();
      }
    });
  }

}
