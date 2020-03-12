import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/services/content.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.page.html',
  styleUrls: ['./content-viewer.page.scss']
})
export class ContentViewerPage implements OnInit {
  content: Content;
  html = '';
  pdfFile = null;
  viewer;
  scale = 1;
  pages = [];

  constructor(
    private contentService: ContentService,
    private commonService: CommonService,
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.content = this.navParams.get('content');
  }

  ngOnInit() {
    this.contentService.startSession();
    if (this.content.category === 'e-book') {
      this.showPDF(this.content.url);
    } else if (this.content.category === 'graphic-book') {
      this.getHtml(this.content.url);
    } else if (this.content.category === 'games') {
      // this.getPath2(this.content.url);
    }
  }

  async getHtml(url: string) {
    this.html = await this.commonService.readFileHtml(url);
  }

  getPath(url: string) {
    this.commonService.getPath(url).then((path) => this.showPDF(path)).catch((e) => this.commonService.showAlertError('Opss...', e, 'Please try again...'));
  }

  async showPDF(url) {
    await this.commonService.loading(false, 'ContentViewerPage-showPDF');
    const pdfjs = await import('pdfjs-dist/build/pdf');
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    pdfjs.getDocument(url).promise.then(pdf => {
      this.pdfFile = pdf;
      this.viewer = document.getElementById('pdf-viewer');
      for (let page = 1; page <= pdf.numPages; page++) {
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page-canvas';
        this.viewer.appendChild(canvas);
        this.renderPage(page, canvas);
        if (page === pdf.numPages) {
          this.commonService.loading(true, 'ContentViewerPage-showPDF');
        }
      }
    });
  }

  renderPage(pageNumber, canvas) {
    this.pdfFile.getPage(pageNumber).then(page => {
      const viewport = page.getViewport(this.scale);
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext: canvas.getContext('2d'), viewport }).then(() => {
        this.pages.push({ pageNumber, canvas });
      });
    });
  }

  close() {
    this.contentService.endSession(this.content.category, this.content.id);
    this.modalController.dismiss();
  }
}
