import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSelectorComponent } from './recipe-selector.component';

describe('RecipeSelectorComponent', () => {
  let component: RecipeSelectorComponent;
  let fixture: ComponentFixture<RecipeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
