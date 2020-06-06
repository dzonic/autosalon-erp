import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KupoprodajniUgovorDialogComponent } from './kupoprodajniugovor-dialog.component';

describe('KupoprodajniUgovorDialogComponent', () => {
  let component: KupoprodajniUgovorDialogComponent;
  let fixture: ComponentFixture<KupoprodajniUgovorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KupoprodajniUgovorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KupoprodajniUgovorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
