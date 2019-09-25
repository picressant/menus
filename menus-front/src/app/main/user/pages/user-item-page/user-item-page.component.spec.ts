import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemPageComponent } from './user-item-page.component';

describe('UserItemPageComponent', () => {
  let component: UserItemPageComponent;
  let fixture: ComponentFixture<UserItemPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserItemPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
