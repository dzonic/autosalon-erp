import { Component, OnInit, ViewChild } from '@angular/core';
import { OsiguravajucaKuca } from '../../models/osiguravajuca_kuca';
import { HttpClient } from '@angular/common/http';
import { OsiguravajucaKucaService } from '../../services/osiguravajucakuca.services';
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';
import { OsiguravajucaKucaDialogComponent } from '../dialogs/osiguravajucakuca-dialog/osiguravajucakuca-dialog.component';


@Component({
  selector: 'app-osiguravajucakuca',
  templateUrl: './osiguravajucakuca.component.html',
  styleUrls: ['./osiguravajucakuca.component.css']
})
export class OsiguravajucaKucaComponent implements OnInit {
  displayedColumns = ['osiguravajucaKucaID', 'nazivOsiguravajuceKuce', 'actions'];
  dataSource: MatTableDataSource<OsiguravajucaKuca>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public modelService: OsiguravajucaKucaService
  ) {}

  public loadData() {
    this.modelService.getAllOsiguravajucaKuca().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'osiguravajucaKucaID':
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
  public openDialog(flag: number, osiguravajucaKucaID: number, nazivOsiguravajuceKuce: string) {
    const dialogRef = this.dialog.open(OsiguravajucaKucaDialogComponent, {
      // tslint:disable-next-line:object-literal-shorthand
      data: { osiguravajucaKucaID: osiguravajucaKucaID, nazivOsiguravajuceKuce: nazivOsiguravajuceKuce }
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
