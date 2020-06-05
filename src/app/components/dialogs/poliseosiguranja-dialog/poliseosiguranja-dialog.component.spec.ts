import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliseOsiguranjaDialogComponent } from './poliseosiguranja-dialog.component';

describe('PoliseOsiguranjaDialogComponent', () => {
  let component: PoliseOsiguranjaDialogComponent;
  let fixture: ComponentFixture<PoliseOsiguranjaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliseOsiguranjaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliseOsiguranjaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
