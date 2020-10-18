import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupSelectorModalComponent } from './group-selector-modal.component';

describe('GroupSelectorModalComponent', () => {
  let component: GroupSelectorModalComponent;
  let fixture: ComponentFixture<GroupSelectorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSelectorModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
