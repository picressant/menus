import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekGroceryListComponent } from './week-grocery-list.component';

describe('WeekGroceryListComponent', () => {
  let component: WeekGroceryListComponent;
  let fixture: ComponentFixture<WeekGroceryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekGroceryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekGroceryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
