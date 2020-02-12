import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.page.html',
  styleUrls: ['./content-viewer.page.scss']
})
export class ContentViewerPage implements OnInit {
  content: string;
  html: string;
  type: string;
  title: string;
  color: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.content = this.navParams.get('content');
    this.type = this.navParams.get('type');
    this.title = this.navParams.get('title');
    this.color = this.navParams.get('color');
    this.html = `<embed src="${this.content}" width="100%" height="100%" >`;
  }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }
}
