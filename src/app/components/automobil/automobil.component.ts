import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Automobil } from '../../models/automobil';
import { HttpClient } from '@angular/common/http';
import { AutomobilService } from '../../services/automobil.services';
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';
import { AutomobilDialogComponent } from '../dialogs/automobil-dialog/automobil-dialog.component';
import { Servis } from '../../models/servis';
import { Marka } from '../../models/marka';
import { TipAutomobila } from '../../models/tip_automobila';



@Component({
  selector: 'app-automobil',
  templateUrl: './automobil.component.html',
  styleUrls: ['./automobil.component.css']
})
export class AutomobilComponent implements OnInit {
  displayedColumns = [
    'automobilID',
    'kubikaza',
    'brojSasije',
    'konjskaSnaga',
    'bojaAutomobila',
    'godinaProizvodnje',
    'markaID',
    'tipAutomobilaID',
    'servisID',
    'actions'
  ];

  dataSource: MatTableDataSource<Automobil>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  selektovaniServis: Servis;

  //@Input() selektovaniServis: Servis;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public automobilService: AutomobilService
  ) {}

  public loadData() {
    this.automobilService.getAllAutomobil()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   });

  }
  // tslint:disable-next-line:use-life-cycle-interface
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {
    //if (this.selektovaniServis.servisID) {
      //this.loadData();
    //}
  }

  selectRow(row) {
    this.selektovaniServis = row;
  }

  ngOnInit() {
     this.loadData();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // tslint:disable-next-line:max-line-length
  public openDialog(flag: number, automobilID: number, kubikaza: number, brojSasije: number, konjskaSnaga: number, bojaAutomobila: string, godinaProizvodnje: number, markaID: number, tipAutomobilaID: number, servisID: number) {
    const dialogRef = this.dialog.open(AutomobilDialogComponent,
      // tslint:disable-next-line:object-literal-shorthand
                      { data: { automobilID: automobilID, kubikaza: kubikaza, brojSasije: brojSasije, konjskaSnaga: konjskaSnaga,
                        // tslint:disable-next-line:object-literal-shorthand
                        bojaAutomobila: bojaAutomobila, godinaProizvodnje: godinaProizvodnje, markaID: markaID,
                        tipAutomobilaID, servisID} });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line:triple-equals
      if (result == 1) {
        this.loadData();
      }
    });
  }
}
