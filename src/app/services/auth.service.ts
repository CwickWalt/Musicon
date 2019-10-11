import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    constructor(private http: HttpClient, private _cookieService: CookieService) { }

    private client = {
      _id: '2aba058a682c4ebbad948c86d89b222a'
    }

    _token;

    authOptions = {
        uri: 'https://accounts.spotify.com/authorize?',
        response_type: 'token',
        redirect_uri: 'http://localhost:4200/',
        state: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        scope: 'playlist-read-private playlist-modify-private user-top-read user-follow-read',
    }

    cookieOptions = {
        path: 'http://localhost:4200/',
        expires: this.getExpiration()
    }

    getExpiration() {
            let today = new Date();
            today.setHours(today.getHours() + 1);
            return today
        }

    getCookie(key: string) {
        return this._cookieService.get(key);
    }

    login() {

        // tslint:disable-next-line: max-line-length
        const spotifyAuthUrl = `${this.authOptions.uri}client_id=${this.client._id}&response_type=${this.authOptions.response_type}&redirect_uri=${this.authOptions.redirect_uri}&scope=${this.authOptions.scope}&state=${this.authOptions.state}`;

        window.location.href = spotifyAuthUrl;
    }

    getAccessToken() {
        // Get the hash of the url
        const hash: any = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
          if (item) {
            const parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
        window.location.hash = '';

        // Set token
        this._cookieService.put('access_token', hash.access_token, this.cookieOptions)
        console.log(this._cookieService.get('access_token'))
        this._token = this._cookieService.get('access_token')
    }
}
