import { Component, OnInit, Inject } from '@angular/core';
import { DodatniZahtev } from '../../../models/dodatni_zahtev';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DodatniZahtevService } from '../../../services/dodatnizahtev.services';
import { KupoprodajniUgovor } from '../../../models/kupoprodajni_ugovor';
import { KupoprodajniUgovorService } from '../../../services/kupoprodajniugovor.services';

@Component({
  selector: 'app-dodatnizahtev-dialog',
  templateUrl: './dodatnizahtev-dialog.component.html',
  styleUrls: ['./dodatnizahtev-dialog.component.css']
})
export class DodatniZahtevDialogComponent implements OnInit {

  ugovori: KupoprodajniUgovor[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DodatniZahtevDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DodatniZahtev,
              public dodatniZahtevService: DodatniZahtevService,
              public kupoprodajniUgovorService: KupoprodajniUgovorService
  ) { }

  ngOnInit() {
    this.kupoprodajniUgovorService.getAllKupoprodajniUgovor().subscribe(ugovori =>
      this.ugovori = ugovori
    );
  }

  compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id == b.id;
  }

  onChange(kupoprodajniUgovorID) {
    this.data.kupoprodajniUgovorID = kupoprodajniUgovorID;
  }
  public add(): void {
    this.data.dodatniZahtevID = -1;
    this.dodatniZahtevService.addDodatniZahtev(this.data);
    this.snackBar.open('Uspešno dodat zahtev: ' + this.data.opisZahteva, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.dodatniZahtevService.updateDodatniZahtev(this.data);
    this.snackBar.open(' Uspešno modifikovan zahtev: ' + this.data.dodatniZahtevID, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.dodatniZahtevService.deleteDodatniZahtev(this.data.dodatniZahtevID);
    this.snackBar.open('Uspešno obrisan kupac: ' + this.data.dodatniZahtevID, 'U redu', {
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
