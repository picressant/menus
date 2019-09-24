import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemCardComponent } from './recipe-item-card.component';

describe('RecipeItemCardComponent', () => {
  let component: RecipeItemCardComponent;
  let fixture: ComponentFixture<RecipeItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeItemCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
