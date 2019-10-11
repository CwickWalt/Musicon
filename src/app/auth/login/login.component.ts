import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private playlistService: PlaylistService) { }

  // onSubmit() {
  //   this.authService.login();
  // }

  ngOnInit() {
    // this.authService.getAccessToken();
    // this.playlistService.getUserId();
  }

}
