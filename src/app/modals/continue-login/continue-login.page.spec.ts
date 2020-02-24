import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContinueLoginPage } from './continue-login.page';

describe('ContinueLoginPage', () => {
  let component: ContinueLoginPage;
  let fixture: ComponentFixture<ContinueLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContinueLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
