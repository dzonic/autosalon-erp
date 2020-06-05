import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { KorisnikService } from '../../../services/korisnik.services';
import { Korisnik } from '../../../models/korisnik';

@Component({
  selector: 'app-korisnik-dialog',
  templateUrl: './korisnik-dialog.component.html',
  styleUrls: ['./korisnik-dialog.component.css']
})
export class KorisnikDialogComponent implements OnInit {

  flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KorisnikDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Korisnik,
              public korisnikService: KorisnikService

  ) { }

  ngOnInit() {
  }
  compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id == b.id;
  }
  public add(): void {
    this.data.korisnikID = -1;
    this.korisnikService.addKorisnik(this.data);
    this.snackBar.open('Uspešno dodat model: ' + this.data.email, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.korisnikService.updateKorisnik(this.data);
    this.snackBar.open(' Uspešno modifikovan model: ' + this.data.korisnikID, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.korisnikService.deleteKorisnik(this.data.korisnikID);
    this.snackBar.open('Uspešno obrisan model: ' + this.data.korisnikID, 'U redu', {
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
