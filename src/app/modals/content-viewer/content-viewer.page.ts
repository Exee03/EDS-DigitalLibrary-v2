import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.page.html',
  styleUrls: ['./content-viewer.page.scss']
})
export class ContentViewerPage implements OnInit {
  content: Content;
  html: string;

  constructor(
    private contentService: ContentService,
    private modalController: ModalController,
    private navParams: NavParams,
  ) {
    this.content = this.navParams.get('content');
    this.html = `<embed src="${this.content.url}" width="100%" height="100%" >`;
  }

  ngOnInit() {
    this.contentService.startSession();
  }

  close() {
    this.contentService.endSession(this.content.category, this.content.id);
    this.modalController.dismiss();
  }
}
