import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNextMealComponent } from './dashboard-next-meal.component';

describe('DashboardNextMealComponent', () => {
  let component: DashboardNextMealComponent;
  let fixture: ComponentFixture<DashboardNextMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardNextMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNextMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
