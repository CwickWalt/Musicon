import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

import { PlaylistService } from '../services/playlist.service'
import { Playlist } from '../models/playlist.model'

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnChanges {

  constructor(private authService: AuthService, private playlistService: PlaylistService) { }

  search;

  myPlaylists: Playlist[] = [];
  playlistsSearched;
  hasSearched = false;

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

  onSearch(form: NgForm) {
    console.log(form.value.search);
    this.playlistsSearched = this.playlistService.searchItem(form.value.search);
    this.playlistService.getSearchedPlaylistsUpdateListener()
    .subscribe((playlists: Playlist[]) => {
      this.playlistsSearched = playlists;
      this.hasSearched = true;
    })
  }


  ngOnInit() {
    this.playlistService.getCategories();
    this.playlistService.getPlaylistTracks();
    this.playlistService.getmyPlaylists();
    this.playlistService.getmyPlaylistsUpdateListener()
    .subscribe((playlists: Playlist[]) => {
      this.myPlaylists = playlists;
    });
  }

  ngOnChanges() {
    console.log(this.playlistsSearched)
  }
}
