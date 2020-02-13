import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { ModalController, NavParams } from '@ionic/angular';
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/models/content';
import { ContentViewerPage } from '../content-viewer/content-viewer.page';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.page.html',
  styleUrls: ['./list-content.page.scss'],
})
export class ListContentPage implements OnInit {
  card: Card;
  // tslint:disable-next-line: max-line-length
  items = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado'];
  contents: Content[] = [];
  constructor(
    private contentService: ContentService,
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  async ngOnInit() {
    this.card = this.navParams.get('card');
    this.contents = await this.contentService.getContents(this.card.type);
  }

  async onClick(content: Content) {
      const modal = await this.modalController.create({
        component: ContentViewerPage,
        backdropDismiss: false,
        componentProps: {
          content
        }
      });
      return await modal.present();
  }

  close() {
    this.modalController.dismiss();
  }

}
