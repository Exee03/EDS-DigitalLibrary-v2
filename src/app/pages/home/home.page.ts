import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, PopoverController, Events } from '@ionic/angular';
import { ContentViewerPage } from 'src/app/modals/content-viewer/content-viewer.page';
import { SettingPopoverPage } from 'src/app/components/setting-popover/setting-popover.page';

interface Card {
  title: string;
  url: string;
  color: string;
  picture: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  textFilter = '';
  cards: Card[] = [
    {
      title: 'Graphic Book',
      url: '../../../assets/contents/games/bedroom.swf',
      color: 'graphic-book',
      picture: '../../../assets/images/graphic-book.png'
    },
    {
      title: 'E-Book',
      url: '../../../assets/contents/games/hangman.swf',
      color: 'e-book',
      picture: '../../../assets/images/e-book.png'
    },
    {
      title: 'Games',
      url: '../../../assets/contents/games/numbers.swf',
      color: 'games',
      picture: '../../../assets/images/game.png'
    }
  ];

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private events: Events
  ) { }

  ngOnInit() {
  }

  onSearchChange(event) {
    const text: string = event.target.value;
    this.textFilter = text;
  }

  async openModal(card: Card) {
    const modal = await this.modalController.create({
      component: ContentViewerPage,
      backdropDismiss: false,
      componentProps: {
        content: card.url,
        title: card.url,
        type: card.title,
        color: card.color,
      }
    });
    return await modal.present();
  }

  async settingsPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SettingPopoverPage,
      event: ev,
      // componentProps: { page: 'Login' },
      // cssClass: 'popover_class',
    });

    /** Sync event from popover component */
    // this.events.subscribe('fromPopoverEvent', (a) => {
    //   this.syncTasks(a);
    // });
    return await popover.present();
  }

  syncTasks(a) {
    console.log(a);
  }

}
