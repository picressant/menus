import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTableComponent } from './unit-table.component';

describe('UnitTableComponent', () => {
  let component: UnitTableComponent;
  let fixture: ComponentFixture<UnitTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
