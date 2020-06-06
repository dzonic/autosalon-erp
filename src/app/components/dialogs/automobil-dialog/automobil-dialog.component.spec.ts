import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobilDialogComponent } from './automobil-dialog.component';

describe('AutomobilDialogComponent', () => {
  let component: AutomobilDialogComponent;
  let fixture: ComponentFixture<AutomobilDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomobilDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
