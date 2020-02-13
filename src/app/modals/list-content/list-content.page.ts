import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { ModalController, NavParams } from '@ionic/angular';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.page.html',
  styleUrls: ['./list-content.page.scss'],
})
export class ListContentPage implements OnInit {
  card: Card;
  // tslint:disable-next-line: max-line-length
  items = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado', 'Bombasto', 'Magneta', 'Tornado'];

  constructor(
    private contentService: ContentService,
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.card = this.navParams.get('card');
  }

  async onClick() {
    const data = await this.contentService.getContents(this.card.type);
    data.forEach(d => console.log(d.id)
    );
  }

  close() {
    this.modalController.dismiss();
  }

}
