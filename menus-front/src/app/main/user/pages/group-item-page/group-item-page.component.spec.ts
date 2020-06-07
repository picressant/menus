import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemPageComponent } from './group-item-page.component';

describe('GroupItemPageComponent', () => {
  let component: GroupItemPageComponent;
  let fixture: ComponentFixture<GroupItemPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupItemPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
