import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../../models/model';
import { HttpClient } from '@angular/common/http';
import { ModelService } from '../../services/model.services';
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';
import { ModelDialogComponent } from '../dialogs/model-dialog/model-dialog.component';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  displayedColumns = ['modelID', 'nazivModela', 'actions'];
  // dataSource: Observable<Liga[]>;
  dataSource: MatTableDataSource<Model>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public modelService: ModelService
  ) {}

  public loadData() {
    this.modelService.getAllModel().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'modelID':
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
  public openDialog(flag: number, modelID: number, nazivModela: string) {
    const dialogRef = this.dialog.open(ModelDialogComponent, {
      // tslint:disable-next-line:object-literal-shorthand
      data: { modelID: modelID, nazivModela: nazivModela }
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
