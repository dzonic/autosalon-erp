import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkaDialogComponent } from './marka-dialog.component';

describe('MarkaDialogComponent', () => {
  let component: MarkaDialogComponent;
  let fixture: ComponentFixture<MarkaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
