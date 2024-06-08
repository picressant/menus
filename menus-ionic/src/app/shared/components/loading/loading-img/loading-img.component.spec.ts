import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingImgComponent } from './loading-img.component';

describe('LoadingImgComponent', () => {
  let component: LoadingImgComponent;
  let fixture: ComponentFixture<LoadingImgComponent>;

  beforeEach(waitForAsync(() => {
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
