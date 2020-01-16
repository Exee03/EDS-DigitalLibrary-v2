import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  textFilter = '';
  cards = [
    {
      title: 'Graphic Book',
      url: '',
      color: '#E39803',
      picture: '../../../assets/images/graphic-book.png'
    },
    {
      title: 'E-Book',
      url: '',
      color: '#509DFF',
      picture: '../../../assets/images/e-book.png'
    },
    {
      title: 'Game',
      url: '',
      color: '#184463',
      picture: '../../../assets/images/game.png'
    }
  ];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSearchChange(event) {
    const text: string = event.target.value;
    this.textFilter = text;
  }

}
