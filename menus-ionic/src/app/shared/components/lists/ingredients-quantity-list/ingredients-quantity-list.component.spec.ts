import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngredientsQuantityListComponent } from './ingredients-quantity-list.component';

describe('IngredientsListComponent', () => {
  let component: IngredientsQuantityListComponent;
  let fixture: ComponentFixture<IngredientsQuantityListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsQuantityListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsQuantityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
