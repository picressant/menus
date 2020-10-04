import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SideListComponent } from './side-list.component';

describe('SideListComponent', () => {
  let component: SideListComponent;
  let fixture: ComponentFixture<SideListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
