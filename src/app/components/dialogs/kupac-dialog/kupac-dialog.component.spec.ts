import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacDialogComponent } from './kupac-dialog.component';

describe('KupacDialogComponent', () => {
  let component: KupacDialogComponent;
  let fixture: ComponentFixture<KupacDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KupacDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KupacDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
