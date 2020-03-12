import { CommonService } from './../../services/common.service';
import { ContentService } from 'src/app/services/content.service';
import { Component, OnInit } from '@angular/core';

import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
const { Filesystem } = Plugins;

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.page.html',
  styleUrls: ['./add-content.page.scss'],
})
export class AddContentPage implements OnInit {
  title = '';
  desc = '';
  category = '';
  path = '';

  constructor(
    private contentService: ContentService,
    private commonService: CommonService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async getPath(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.path = event.target.files[0].path;
    }
  }

  addContent() {
    if (this.title.length !== 0 && this.desc.length !== 0 && this.category.length !== 0 && this.path.length !== 0) {
      this.contentService.saveContent(this.title,this.desc,this.path,this.category);
      this.close();
    } else {
      this.commonService.showAlertError('Opss..', 'Field cannot be left blank', 'Please fill all the field');
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
