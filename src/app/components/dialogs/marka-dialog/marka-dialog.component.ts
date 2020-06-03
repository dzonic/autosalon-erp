import { Component, OnInit, Inject } from '@angular/core';
import { Marka } from '../../../models/marka';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { MarkaService } from '../../../services/marka.services';
import { Model } from '../../../models/model';
import { ModelService } from '../../../services/model.services';

@Component({
  selector: 'app-marka-dialog',
  templateUrl: './marka-dialog.component.html',
  styleUrls: ['./marka-dialog.component.css']
})
export class MarkaDialogComponent implements OnInit {

  modeli: Model[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<MarkaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Marka,
              public markaService: MarkaService,
              public modelService: ModelService
  ) { }

  ngOnInit() {
    this.modelService.getAllModel().subscribe(modeli =>
      this.modeli = modeli
    );
  }

  compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id == b.id;
  }

  onChange(modelID) {
    this.data.modelID = modelID;
  }
  public add(): void {
    this.data.markaID = -1;
    this.markaService.addMarka(this.data);
    this.snackBar.open('Uspešno dodata marka: ' + this.data.nazivMarke, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.markaService.updateMarka(this.data);
    this.snackBar.open(' Uspešno modifikovana marka: ' + this.data.markaID, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.markaService.deleteMarka(this.data.markaID);
    this.snackBar.open('Uspešno obrisana marka\s: ' + this.data.markaID, 'U redu', {
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
