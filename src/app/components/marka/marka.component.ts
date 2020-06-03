import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Marka } from '../../models/marka';
import { HttpClient } from '@angular/common/http';
import { MarkaService } from '../../services/marka.services';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MarkaDialogComponent } from '../dialogs/marka-dialog/marka-dialog.component';
import { Model } from 'src/app/models/model';

@Component({
  selector: 'app-tim',
  templateUrl: './marka.component.html',
  styleUrls: ['./marka.component.css']
})
export class MarkaComponent implements OnInit {

  displayedColumns = ['markaID', 'nazivMarke', 'model',  'actions'];
  dataSource: MatTableDataSource<Marka>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  selektovanaMarka: Marka;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public markaService: MarkaService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.markaService.getAllMarka().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'modelID' ? currentTerm + data.modelID.modelID : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'model': return data.modelID.modelID.toString().toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  selectRow(row) {
    this.selektovanaMarka = row;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, markaID: number, nazivMarke: string, modelID: Model) {
    const dialogRef = this.dialog.open(MarkaDialogComponent,
                      // tslint:disable-next-line:object-literal-shorthand
                      { data: { markaID: markaID, nazivMarke: nazivMarke,  modelID: modelID} });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line:triple-equals
      if (result == 1) {
        this.loadData();
      }
    });
  }

}
