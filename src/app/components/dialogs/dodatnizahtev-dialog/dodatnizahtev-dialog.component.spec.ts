import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodatniZahtevDialogComponent } from './dodatnizahtev-dialog.component';

describe('DodatniZahtevDialogComponent', () => {
  let component: DodatniZahtevDialogComponent;
  let fixture: ComponentFixture<DodatniZahtevDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodatniZahtevDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodatniZahtevDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
