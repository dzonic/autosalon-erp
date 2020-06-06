import { Component, OnInit, Inject } from '@angular/core';
import { KupoprodajniUgovor } from '../../../models/kupoprodajni_ugovor';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { KupoprodajniUgovorService } from '../../../services/kupoprodajniugovor.services';
import { AutomobilService } from '../../../services/automobil.services';
import { Automobil } from '../../../models/automobil';
import { Kupac } from '../../../models/kupac';
import { KupacService } from '../../../services/kupac.services';
import { Prodavac } from '../../../models/prodavac';
import { ProdavacService } from '../../../services/prodavac.services';

@Component({
  selector: 'app-kupoprodajniugovor-dialog',
  templateUrl: './kupoprodajniugovor-dialog.component.html',
  styleUrls: ['./kupoprodajniugovor-dialog.component.css']
})
export class KupoprodajniUgovorDialogComponent implements OnInit {

  automobili: Automobil[];
  kupci: Kupac[];
  prodavci: Prodavac[];
  flag: number;
  constructor(
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KupoprodajniUgovorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: KupoprodajniUgovor,
              public kupoprodajniUgovorService: KupoprodajniUgovorService,
              public automobilService: AutomobilService,
              public kupacService: KupacService,
              public prodavacService: ProdavacService
  ) { }

  ngOnInit() {
    this.automobilService.getAllAutomobil().subscribe(automobili =>
     this.automobili = automobili
    );
    this.kupacService.getAllKupac().subscribe(kupci =>
      this.kupci = kupci
    );
    this.prodavacService.getAllProdavac().subscribe(prodavci =>
      this.prodavci = prodavci
      );
  }
  public compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id == b.id;
  }

  public add(): void {
    this.data.kupoprodajniUgovorID = -1;
    this.kupoprodajniUgovorService.addKupoprodajniUgovor(this.data);
    this.snackBar.open('Uspešno dodat ugovor: ' + this.data.kupoprodajniUgovorID, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.kupoprodajniUgovorService.updateKupoprodajniUgovor(this.data);
    this.snackBar.open(' Uspešno modifikovan ugovor: ' + this.data.nacinPlacanja, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.kupoprodajniUgovorService.deleteKupoprodajniUgovor(this.data.kupoprodajniUgovorID);
    this.snackBar.open('Uspešno obrisan ugovor: ' + this.data.kupoprodajniUgovorID, 'U redu', {
      duration: 2500,
      });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste ' , 'U redu', {
      duration: 1000,
      });
  }

}
