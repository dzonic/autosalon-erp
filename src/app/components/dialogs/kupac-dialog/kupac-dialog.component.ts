import { Component, OnInit, Inject } from '@angular/core';
import { Kupac } from '../../../models/kupac';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { KupacService } from '../../../services/kupac.services';
import { Korisnik } from '../../../models/korisnik';
import { KorisnikService } from '../../../services/korisnik.services';

@Component({
  selector: 'app-kupac-dialog',
  templateUrl: './kupac-dialog.component.html',
  styleUrls: ['./kupac-dialog.component.css']
})
export class KupacDialogComponent implements OnInit {

  korisnici: Korisnik[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KupacDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Kupac,
              public kupacService: KupacService,
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
    this.data.kupacID = -1;
    this.kupacService.addKupac(this.data);
    this.snackBar.open('Uspešno dodat kupac: ' + this.data.ime, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.kupacService.updateKupac(this.data);
    this.snackBar.open(' Uspešno modifikovan kupac: ' + this.data.kupacID, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.kupacService.deleteKupac(this.data.kupacID);
    this.snackBar.open('Uspešno obrisan kupac: ' + this.data.kupacID, 'U redu', {
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
