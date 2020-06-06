import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { OsiguravajucaKucaService } from '../../../services/osiguravajucakuca.services';
import { OsiguravajucaKuca } from '../../../models/osiguravajuca_kuca';

@Component({
  selector: 'app-osiguravajucakuca-dialog',
  templateUrl: './osiguravajucakuca-dialog.component.html',
  styleUrls: ['./osiguravajucakuca-dialog.component.css']
})
export class OsiguravajucaKucaDialogComponent implements OnInit {

  flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<OsiguravajucaKucaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OsiguravajucaKuca,
              public osiguravajucaKucaService: OsiguravajucaKucaService

  ) { }

  ngOnInit() {
  }
  compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id == b.id;
  }
  public add(): void {
    this.data.osiguravajucaKucaID = -1;
    this.osiguravajucaKucaService.addOsiguravajucaKuca(this.data);
    this.snackBar.open('Uspešno dodata osiguravajuća kuća: ' + this.data.nazivOsiguravajuceKuce, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.osiguravajucaKucaService.updateOsiguravajucaKuca(this.data);
    this.snackBar.open(' Uspešno modifikovana osiguravajuća kuća: ' + this.data.osiguravajucaKucaID, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.osiguravajucaKucaService.deleteOsiguravajucaKuca(this.data.osiguravajucaKucaID);
    this.snackBar.open('Uspešno obrisana osiguravajuća kuća: ' + this.data.osiguravajucaKucaID, 'U redu', {
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
