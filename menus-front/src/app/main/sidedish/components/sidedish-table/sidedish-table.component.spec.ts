import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidedishTableComponent } from './sidedish-table.component';

describe('SidedishTableComponent', () => {
  let component: SidedishTableComponent;
  let fixture: ComponentFixture<SidedishTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidedishTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidedishTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
