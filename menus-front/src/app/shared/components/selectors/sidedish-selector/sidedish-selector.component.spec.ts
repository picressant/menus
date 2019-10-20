import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidedishSelectorComponent } from './sidedish-selector.component';

describe('SidedishSelectorComponent', () => {
  let component: SidedishSelectorComponent;
  let fixture: ComponentFixture<SidedishSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidedishSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidedishSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
