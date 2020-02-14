import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectAvatarPage } from './select-avatar.page';

describe('SelectAvatarPage', () => {
  let component: SelectAvatarPage;
  let fixture: ComponentFixture<SelectAvatarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAvatarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAvatarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
