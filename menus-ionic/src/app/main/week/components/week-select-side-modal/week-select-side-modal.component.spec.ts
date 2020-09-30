import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeekSelectSideModalComponent } from './week-select-side-modal.component';

describe('WeekSelectSideModalComponent', () => {
  let component: WeekSelectSideModalComponent;
  let fixture: ComponentFixture<WeekSelectSideModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekSelectSideModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeekSelectSideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
