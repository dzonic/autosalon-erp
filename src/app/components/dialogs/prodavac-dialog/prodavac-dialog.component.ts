import { Component, OnInit, Inject } from '@angular/core';
import { Prodavac } from '../../../models/prodavac';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ProdavacService } from '../../../services/prodavac.services';
import { Korisnik } from '../../../models/korisnik';
import { KorisnikService } from '../../../services/korisnik.services';

@Component({
  selector: 'app-prodavac-dialog',
  templateUrl: './prodavac-dialog.component.html',
  styleUrls: ['./prodavac-dialog.component.css']
})
export class ProdavacDialogComponent implements OnInit {

  korisnici: Korisnik[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ProdavacDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Prodavac,
              public prodavacService: ProdavacService,
              public korisnikService: KorisnikService
  ) { }

  ngOnInit() {
    this.korisnikService.getAllKorisnik().subscribe(korisnici =>
      this.korisnici = korisnici
    );
  }

  compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id == b.id;
  }

  onChange(korisnikID) {
    this.data.korisnikID = korisnikID;
  }
  public add(): void {
    this.data.prodavacID = -1;
    this.prodavacService.addProdavac(this.data);
    this.snackBar.open('Uspešno dodat prodavac: ' + this.data.ime, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.prodavacService.updateProdavac(this.data);
    this.snackBar.open(' Uspešno modifikovan prodavac: ' + this.data.prodavacID, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.prodavacService.deleteProdavac(this.data.prodavacID);
    this.snackBar.open('Uspešno obrisan prodavac: ' + this.data.prodavacID, 'U redu', {
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
