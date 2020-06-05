import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdavacDialogComponent } from './prodavac-dialog.component';

describe('ProdavacDialogComponent', () => {
  let component: ProdavacDialogComponent;
  let fixture: ComponentFixture<ProdavacDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdavacDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdavacDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
