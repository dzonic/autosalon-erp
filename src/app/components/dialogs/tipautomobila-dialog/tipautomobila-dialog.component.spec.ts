import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipAutomobilaDialogComponent } from './tipautomobila-dialog.component';

describe('TipAutomobilaDialogComponent', () => {
  let component: TipAutomobilaDialogComponent;
  let fixture: ComponentFixture<TipAutomobilaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipAutomobilaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipAutomobilaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
