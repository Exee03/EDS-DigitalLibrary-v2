import { CommonService } from 'src/app/services/common.service';
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
  contents: Content[] = [];
  html = [''];

  constructor(
    private contentService: ContentService,
    private commonService: CommonService,
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  async ngOnInit() {
    this.card = this.navParams.get('card');
    this.contents = await this.contentService.getContentsByCategory(this.card.category);
    this.generatePreview(this.contents);
  }

  async generatePreview(contents: Content[]) {
    const pdfjs = await import('pdfjs-dist/build/pdf');
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
    this.html = [];
    contents.forEach(async (c) => {
      if(c.category === 'e-book') {
        this.showPDF(pdfjs, pdfjsWorker, c.url, c.id);
      } else if (c.category === 'graphic-book') {
        this.html.push(await this.commonService.readFileHtml(c.url));
      }
    });
  }

  async openContent(content: Content) {
      const modal = await this.modalController.create({
        component: ContentViewerPage,
        backdropDismiss: false,
        cssClass: 'semiWideModal',
        componentProps: {
          content
        }
      });
      return await modal.present();
  }

  async showPDF(pdfjs, pdfjsWorker, url: string, id: string) {
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    pdfjs.getDocument(url).promise.then(pdf => {
      const viewer = document.getElementById('pdf-viewer-' + id);
      const canvas = <HTMLCanvasElement> document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.className = 'pdf-page-canvas';
      viewer.appendChild(canvas);
      pdf.getPage(1).then(page => {
        var scale = 0.5;
        var viewport = page.getViewport({ scale: scale, });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({canvasContext: context, viewport: viewport})
      });
    });
  }

  close() {
    this.modalController.dismiss();
  }

}
