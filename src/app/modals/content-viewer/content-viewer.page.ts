import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Content } from 'src/app/models/content';
import { timestamp } from 'rxjs/operators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.page.html',
  styleUrls: ['./content-viewer.page.scss']
})
export class ContentViewerPage implements OnInit {
  content: Content;
  html: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.content = this.navParams.get('content');
    this.html = `<embed src="${this.content.url}" width="100%" height="100%" >`;
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
}
