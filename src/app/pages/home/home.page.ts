import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { SettingPopoverPage } from 'src/app/components/setting-popover/setting-popover.page';
import { Card } from 'src/app/models/card';
import { ListContentPage } from 'src/app/modals/list-content/list-content.page';
import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/models/content';
import { ContentViewerPage } from 'src/app/modals/content-viewer/content-viewer.page';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  user: User;
  textFilter = '';
  cards: Card[] = [
    {
      title: 'Graphic Book',
      category: 'graphic-book',
      picture: 'assets/images/graphic-book.png'
    },
    {
      title: 'E-Book',
      category: 'e-book',
      picture: 'assets/images/e-book.png'
    },
    // {
    //   title: 'Games',
    //   category: 'games',
    //   picture: 'assets/images/game.png'
    // }
  ];

  contents: Content[] = [];

  constructor(
    private contentService: ContentService,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {
    this.contentService.currentUser.subscribe(user => {
      this.user = user;
      this.user.trophy = Math.round(this.user.trophy);
    });
  }

  async ngOnInit() {
    this.contents = await this.contentService.getContents();
  }

  onSearchChange(event) {
    const text: string = event.target.value;
    this.textFilter = text;
  }

  async openModal(card: Card) {
    const modal = await this.modalController.create({
      component: ListContentPage,
      backdropDismiss: false,
      cssClass: 'wideModal',
      componentProps: {
        card
      }
    });
    return await modal.present();
  }

  async settingsPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SettingPopoverPage,
      event: ev,
      componentProps: { page: 'home' },
      // cssClass: 'popover_class',
    });

    /** Sync event from popover component */
    // this.events.subscribe('fromPopoverEvent', (a) => {
    //   this.syncTasks(a);
    // });
    return await popover.present();
  }

  // syncTasks(a) {
  //   console.log(a);
  // }

  async openContent(content: Content) {
    const modal = await this.modalController.create({
      component: ContentViewerPage,
      backdropDismiss: false,
      componentProps: {
        content
      }
    });
    return await modal.present();
  }
}
