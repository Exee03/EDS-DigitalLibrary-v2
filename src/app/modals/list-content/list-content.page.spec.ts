import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListContentPage } from './list-content.page';

describe('ListContentPage', () => {
  let component: ListContentPage;
  let fixture: ComponentFixture<ListContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
