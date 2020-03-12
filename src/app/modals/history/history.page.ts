import { Content } from './../../models/content';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  historyContent: Content[];
  userHistory: History[];

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    ) {
      this.historyContent = this.navParams.get('historyContent');
      this.userHistory = this.navParams.get('userHistory');
    }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

}
