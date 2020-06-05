import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikDialogComponent } from './korisnik-dialog.component';

describe('KorisnikDialogComponent', () => {
  let component: KorisnikDialogComponent;
  let fixture: ComponentFixture<KorisnikDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisnikDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
