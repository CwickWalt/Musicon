import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientService } from './client.service';

import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    constructor(private http: HttpClient, private client: ClientService) { }

    _token;

    authOptions = {
        uri: 'https://accounts.spotify.com/authorize?',
        client_id: this.client.client_id,
        response_type: 'token',
        redirect_uri: 'http://localhost:4200/login',
        state: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        scope: 'playlist-read-private playlist-modify-private',
    }

    login() {

        let spotifyAuthUrl = `${this.authOptions.uri}client_id=2aba058a682c4ebbad948c86d89b222a&response_type=${this.authOptions.response_type}&redirect_uri=${this.authOptions.redirect_uri}&scope=${this.authOptions.scope}&state=${this.authOptions.state}`;

        window.location.href = spotifyAuthUrl;
    }

    getAccessToken() {
        // Get the hash of the url
        const hash: any = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
          if (item) {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
        window.location.hash = '';

        // Set token
        this._token = hash.access_token;
        console.log(hash.access_token)
    }
}
