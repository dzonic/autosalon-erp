import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ModelService } from '../../../services/model.services';
import { Model } from '../../../models/model';

@Component({
  selector: 'app-model-dialog',
  templateUrl: './model-dialog.component.html',
  styleUrls: ['./model-dialog.component.css']
})
export class ModelDialogComponent implements OnInit {

  flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ModelDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Model,
              public modelService: ModelService

  ) { }

  ngOnInit() {
  }
  compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id == b.id;
  }
  public add(): void {
    this.data.modelID = -1;
    this.modelService.addModel(this.data);
    this.snackBar.open('Uspešno dodat model: ' + this.data.nazivModela, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.modelService.updateModel(this.data);
    this.snackBar.open(' Uspešno modifikovan model: ' + this.data.modelID, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.modelService.deleteModel(this.data.modelID);
    this.snackBar.open('Uspešno obrisan model: ' + this.data.modelID, 'U redu', {
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
