import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { SettingPopoverPage } from 'src/app/components/setting-popover/setting-popover.page';
import { Card } from 'src/app/models/card';
import { ListContentPage } from 'src/app/modals/list-content/list-content.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  textFilter = '';
  cards: Card[] = [
    {
      title: 'Graphic Book',
      color: 'graphic-book',
      picture: '../../../assets/images/graphic-book.png'
    },
    {
      title: 'E-Book',
      color: 'e-book',
      picture: '../../../assets/images/e-book.png'
    },
    {
      title: 'Games',
      color: 'games',
      picture: '../../../assets/images/game.png'
    }
  ];

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

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
      event: ev
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
