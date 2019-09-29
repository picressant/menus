import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingImgComponent } from './loading-img.component';

describe('LoadingImgComponent', () => {
  let component: LoadingImgComponent;
  let fixture: ComponentFixture<LoadingImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
