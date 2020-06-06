import { Component, OnInit, Inject } from '@angular/core';
import { PoliseOsiguranja } from '../../../models/polise_osiguranja';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { PoliseOsiguranjaService } from '../../../services/poliseosiguranja.services';
import { OsiguravajucaKuca } from '../../../models/osiguravajuca_kuca';
import { OsiguravajucaKucaService } from '../../../services/osiguravajucakuca.services';


@Component({
  selector: 'app-poliseosiguranja-dialog',
  templateUrl: './poliseosiguranja-dialog.component.html',
  styleUrls: ['./poliseosiguranja-dialog.component.css']
})
export class PoliseOsiguranjaDialogComponent implements OnInit {

  osiguravajuceKuce: OsiguravajucaKuca[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PoliseOsiguranjaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PoliseOsiguranja,
              public poliseOsiguranjaService: PoliseOsiguranjaService,
              public osiguravajucaKucaService: OsiguravajucaKucaService
  ) { }

  ngOnInit() {
    this.osiguravajucaKucaService.getAllOsiguravajucaKuca().subscribe(osiguravajuceKuce =>
      this.osiguravajuceKuce = osiguravajuceKuce
    );
  }

  compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id == b.id;
  }

  onChange(osiguravajucaKucaID) {
    this.data.osiguravajucaKucaID = osiguravajucaKucaID;
  }
  public add(): void {
    this.data.poliseOsiguranjaID = -1;
    this.poliseOsiguranjaService.addPoliseOsiguranja(this.data);
    this.snackBar.open('Uspešno dodata polisa: ' + this.data.vaziOd, 'U redu', {
    duration: 2500,
    });
  }

  public update(): void {
    this.poliseOsiguranjaService.updatePoliseOsiguranja(this.data);
    this.snackBar.open(' Uspešno modifikovana polisa: ' + this.data.poliseOsiguranjaID, 'U redu', {
    duration: 2500,
    });
  }

  public delete(): void {
    this.poliseOsiguranjaService.deletePoliseOsigiguranja(this.data.poliseOsiguranjaID);
    this.snackBar.open('Uspešno obrisana polisa: ' + this.data.poliseOsiguranjaID, 'U redu', {
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
