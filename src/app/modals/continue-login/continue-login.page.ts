import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-continue-login',
  templateUrl: './continue-login.page.html',
  styleUrls: ['./continue-login.page.scss'],
})
export class ContinueLoginPage implements OnInit {
  user: User;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.user = this.navParams.get('user');
  }

  ngOnInit() {
  }

  closeModal(isTrue: boolean) {
    this.modalController.dismiss(isTrue);
  }

}
