import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsiguravajucaKucaDialogComponent } from './osiguravajucakuca-dialog.component';

describe('OsiguravajucaKucaDialogComponent', () => {
  let component: OsiguravajucaKucaDialogComponent;
  let fixture: ComponentFixture<OsiguravajucaKucaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsiguravajucaKucaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsiguravajucaKucaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
