import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerDialogComponent } from './menadzer-dialog.component';

describe('MenadzerDialogComponent', () => {
  let component: MenadzerDialogComponent;
  let fixture: ComponentFixture<MenadzerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenadzerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenadzerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
