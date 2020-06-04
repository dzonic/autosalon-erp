import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ServisService } from '../../../services/servis.services';
import { Servis } from '../../../models/servis';


@Component({
  selector: 'app-servis-dialog',
  templateUrl: './servis-dialog.component.html',
  styleUrls: ['./servis-dialog.component.css']
})
export class ServisDialogComponent implements OnInit {


  flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ServisDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Servis,
              public servisService: ServisService

  ) { }

  ngOnInit() {
  }
  compareTo(a, b) {
    // tslint:disable-next-line: triple-equals
    return a.id == b.id;
  }
  public add(): void {
    this.data.servisID = -1;
    this.servisService.addServis(this.data);
    this.snackBar.open('Uspešno dodat servis: ' + this.data.opis, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.servisService.updateServis(this.data);
    this.snackBar.open(' Uspešno modifikovan servis: ' + this.data.servisID, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.servisService.deleteServis(this.data.servisID);
    this.snackBar.open('Uspešno obrisan servis: ' + this.data.servisID, 'U redu', {
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
