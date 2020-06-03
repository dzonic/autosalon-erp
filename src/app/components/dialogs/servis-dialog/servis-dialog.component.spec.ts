import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServisDialogComponent } from './servis-dialog.component';

describe('ServisDialogComponent', () => {
  let component: ServisDialogComponent;
  let fixture: ComponentFixture<ServisDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServisDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
