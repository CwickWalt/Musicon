import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  slideStore = []
  exampleSlide1 = {
    src: '../../assets/radiogirl.jpg',
    alt: 'girl with foot on radio',
    title: '1'
  }
  exampleSlide2 = {
    src: '../../assets/radiogirl.jpg',
    alt: 'girl with foot on radio2',
    title: '2'
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor() { }

  ngOnInit() {
    this.slideStore.push(this.exampleSlide1, this.exampleSlide2)
  }

}
