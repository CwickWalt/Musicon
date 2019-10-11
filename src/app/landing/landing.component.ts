import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlaylistService } from '../services/playlist.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private authService: AuthService, private playlistService: PlaylistService, private _cookieService: CookieService) { }

  onClick() {
    this.authService.login();
  }

  ngOnInit() {
    if(this.authService._token) {
      return
    } else {
      this.authService.getAccessToken();
      this.playlistService.getUserId();
    }
  }
}
