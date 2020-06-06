import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { KupoprodajniUgovor } from '../../models/kupoprodajni_ugovor';
import { HttpClient } from '@angular/common/http';
import { KupoprodajniUgovorService } from '../../services/kupoprodajniugovor.services';
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';
import { KupoprodajniUgovorDialogComponent } from '../dialogs/kupoprodajniugovor-dialog/kupoprodajniugovor-dialog.component';
import { Automobil } from '../../models/automobil';
import { Kupac } from '../../models/kupac';
import { Prodavac } from '../../models/prodavac';



@Component({
  selector: 'app-kupoprodajniugovor',
  templateUrl: './kupoprodajniugovor.component.html',
  styleUrls: ['./kupoprodajniugovor.component.css']
})
export class KupoprodajniUgovorComponent implements OnInit {
  displayedColumns = [
    'kupoprodajniUgovorID',
    'datumSklapanja',
    'nacinPlacanja',
    'cena',
    'automobilID',
    'kupacID',
    'prodavacID',
    'actions'
  ];

  dataSource: MatTableDataSource<KupoprodajniUgovor>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  selektovaniAuto: Automobil;


  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public kupoprodajniUgovorService: KupoprodajniUgovorService
  ) {}

  public loadData() {
    this.kupoprodajniUgovorService.getAllKupoprodajniUgovor()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   });

  }

  selectRow(row) {
    this.selektovaniAuto = row;
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
  public openDialog(flag: number, kupoprodajniUgovorID: number, datumSklapanja: Date, nacinPlacanja: string, cena: number,  automobilID: number, kupacID: number, prodavacID: number) {
    const dialogRef = this.dialog.open(KupoprodajniUgovorDialogComponent,
      // tslint:disable-next-line:object-literal-shorthand
                      // tslint:disable-next-line:max-line-length
                      { data: { kupoprodajniUgovorID, datumSklapanja, nacinPlacanja, cena,
                        // tslint:disable-next-line:object-literal-shorthand
                       automobilID: automobilID, kupacID: kupacID, prodavacID: prodavacID} });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line:triple-equals
      if (result == 1) {
        this.loadData();
      }
    });
  }
}
