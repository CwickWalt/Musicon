import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../services/auth.service';

import { PlaylistService } from '../services/playlist.service'
import { Playlist } from '../models/playlist.model'

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  constructor(private authService: AuthService, private playlistService: PlaylistService) { }

  myPlaylists: Playlist[] = [];

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

  ngOnInit() {
    this.playlistService.getMyPlaylists()
    this.playlistService.getMyPlaylistsUpdateListener()
    .subscribe((playlists: Playlist[]) => {
      this.myPlaylists = playlists
    })
  }
}
