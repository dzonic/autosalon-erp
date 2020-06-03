import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TipAutomobila } from '../../models/tip_automobila';
import { HttpClient } from '@angular/common/http';
import { TipAutomobilaService } from '../../services/tipautomobila.services';
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';
import { TipAutomobilaDialogComponent } from '../dialogs/tipautomobila-dialog/tipautomobila-dialog.component';
import { error } from 'util';

@Component({
  selector: 'app-tipautomobila',
  templateUrl: './tipautomobila.component.html',
  styleUrls: ['./tipautomobila.component.css']
})
export class TipAutomobilaComponent implements OnInit {
  displayedColumns = ['tipAutomobilaID', 'nazivTipaAutomobila', 'actions'];
  // dataSource: Observable<Liga[]>;
  dataSource: MatTableDataSource<TipAutomobila>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public modelService: TipAutomobilaService
  ) {}

  public loadData() {
    this.modelService.getAllTipAutomobila().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'tipAutomobilaID':
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
  public openDialog(flag: number, tipAutomobilaID: number, nazivTipaAutomobila: string) {
    const dialogRef = this.dialog.open(TipAutomobilaDialogComponent, {
      // tslint:disable-next-line:object-literal-shorthand
      data: { tipAutomobilaID: tipAutomobilaID, nazivTipaAutomobila: nazivTipaAutomobila }
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
