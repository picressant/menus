import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientSelectorComponent } from './ingredient-selector.component';

describe('IngredientSelectorComponent', () => {
  let component: IngredientSelectorComponent;
  let fixture: ComponentFixture<IngredientSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
