import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { TipAutomobilaService } from '../../../services/tipautomobila.services';
import { TipAutomobila } from '../../../models/tip_automobila';

@Component({
  selector: 'app-tipautomobila-dialog',
  templateUrl: './tipautomobila-dialog.component.html',
  styleUrls: ['./tipautomobila-dialog.component.css']
})
export class TipAutomobilaDialogComponent implements OnInit {

  flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<TipAutomobilaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TipAutomobila,
              public tipAutomobilaService: TipAutomobilaService

  ) { }

  ngOnInit() {
  }
  compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id == b.id;
  }
  public add(): void {
    this.data.tipAutomobilaID = -1;
    this.tipAutomobilaService.addTipAutomobila(this.data);
    this.snackBar.open('Uspešno dodat tip: ' + this.data.nazivTipaAutomobila, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.tipAutomobilaService.updateTipAutomobila(this.data);
    this.snackBar.open(' Uspešno modifikovan tip: ' + this.data.tipAutomobilaID, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.tipAutomobilaService.deleteTipAutomobila(this.data.tipAutomobilaID);
    this.snackBar.open('Uspešno obrisan tip: ' + this.data.tipAutomobilaID, 'U redu', {
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
