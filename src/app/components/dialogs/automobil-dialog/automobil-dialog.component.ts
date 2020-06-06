import { Component, OnInit, Inject } from '@angular/core';
import { Automobil } from '../../../models/automobil';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AutomobilService } from '../../../services/automobil.services';
import { ServisService } from '../../../services/servis.services';
import { Servis } from '../../../models/servis';
import { Model } from '../../../models/model';
import { ModelService } from '../../../services/model.services';
import { TipAutomobila } from '../../../models/tip_automobila';
import { TipAutomobilaService } from '../../../services/tipautomobila.services';

@Component({
  selector: 'app-automobil-dialog',
  templateUrl: './automobil-dialog.component.html',
  styleUrls: ['./automobil-dialog.component.css']
})
export class AutomobilDialogComponent implements OnInit {

  modeli: Model[];
  servisi: Servis[];
  tipovi: TipAutomobila[];
  flag: number;
  constructor(
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AutomobilDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Automobil,
              public automobilService: AutomobilService,
              public servisService: ServisService,
              public modelService: ModelService,
              public tipAutomobilaService: TipAutomobilaService
  ) { }

  ngOnInit() {
    this.modelService.getAllModel().subscribe(modeli =>
     this.modeli = modeli
    );
    this.servisService.getAllServis().subscribe(servisi =>
      this.servisi = servisi
    );
    this.tipAutomobilaService.getAllTipAutomobila().subscribe(tipovi =>
      this.tipovi = tipovi
      );
  }
  public compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id == b.id;
  }

  public add(): void {
    this.data.automobilID = -1;
    this.automobilService.addAutomobil(this.data);
    this.snackBar.open('Uspešno dodat automobil: ' + this.data.automobilID, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.automobilService.updateAutomobil(this.data);
    this.snackBar.open(' Uspešno modifikovan automobil: ' + this.data.bojaAutomobila, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.automobilService.deleteAutomobil(this.data.automobilID);
    this.snackBar.open('Uspešno obrisan automobil: ' + this.data.automobilID, 'U redu', {
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
