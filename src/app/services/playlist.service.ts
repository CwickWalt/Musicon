import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie';

import { Playlist } from '../models/playlist.model';

@Injectable({
    providedIn: 'root',
})

export class PlaylistService {

    constructor(private http: HttpClient, private authService: AuthService, private _cookieService: CookieService) { }

    uri = 'https://api.spotify.com/v1/'

    // user playlists

    myPlaylists: Playlist[] = [];
    myPlaylistsUpdated = new Subject<Playlist[]>();

    // searched playlists

    searchedPlaylists: Playlist[] = [];
    searchedPlaylistsUpdated = new Subject<Playlist[]>();
    userId;

    getUserId() {

      const header = {
        'Authorization': `Bearer ${this.authService._token}`
      }
      const reqOps = {
        headers: new HttpHeaders(header)
      }
      this.http.get<{ id: any }>(`${this.uri}me`, reqOps)
      .pipe(map(userData => {
        console.log('user data: ', userData)
        return this.userId = userData.id
        }))
        .subscribe(userId => {
          this._cookieService.put('userId', userId, this.authService.cookieOptions)
          console.log(this._cookieService.get('userId'))
          this.userId = this._cookieService.get('userId')
        })
    }

    getmyPlaylists() {

      const header = {
        'Authorization': `Bearer ${this.authService._token}`
      }
      const reqOps = {
        headers: new HttpHeaders(header)
      }
      this.http.get<{ message: string; items: any }>(`${this.uri}users/${this.userId}/playlists`, reqOps)
      .pipe(map(myPlaylistsInfo => {
        return myPlaylistsInfo.items.map(playlist => {
          return {
            uri: playlist.uri,
            id: playlist.id,
            name: playlist.name,
            collaborative: playlist.collaborative,
            tracks: playlist.tracks,
            images: playlist.images,
            owner: playlist.owner,
            type: playlist.type,
            followers: playlist.followers
          }
        });
      }))
      .subscribe(transformedPlaylistsInfo => {
        this.myPlaylists = transformedPlaylistsInfo;
        console.log(this.myPlaylists)
        this.myPlaylistsUpdated.next([...this.myPlaylists])
      })
    }

    getmyPlaylistsUpdateListener() {
      return this.myPlaylistsUpdated.asObservable();
    }

    // view all categories
    getCategories() {

      const header = {
        'Authorization': `Bearer ${this.authService._token}`
      }
      const reqOps = {
        headers: new HttpHeaders(header)
      }
      this.http.get<{ message: string;}>(`${this.uri}browse/categories?limit=50`, reqOps)
      .subscribe(x => {
        console.log(x);
      })
    }

    getPlaylistTracks() {

      const header = {
        'Authorization': `Bearer ${this.authService._token}`
      }
      const reqOps = {
        headers: new HttpHeaders(header)
      }
      this.http.get<{ message: string }>(`${this.uri}playlists/1sBdcVCmeIYesbySqoM0Q1`, reqOps)
      .subscribe(x => {
        console.log(x);
      })
    }

    searchItem(item) {
      const header = {
        'Authorization': `Bearer ${this.authService._token}`
      }
      const reqOps = {
        headers: new HttpHeaders(header)
      }
      this.http.get<{ message: string; playlists: any}>(`${this.uri}search?q=${item}&type=playlist&limit=50`, reqOps)
          .pipe(map(myPlaylistsInfo => {
        return myPlaylistsInfo.playlists.items.map(playlist => {
          return {
            uri: playlist.uri,
            id: playlist.id,
            name: playlist.name,
            collaborative: playlist.collaborative,
            tracks: playlist.tracks,
            images: playlist.images,
            owner: playlist.owner,
            type: playlist.type,
            followers: playlist.followers
          }
        });
      }))
      .subscribe(transformedPlaylistsInfo => {
        this.searchedPlaylists = transformedPlaylistsInfo.filter(playlist => playlist.owner.id !== 'spotify');
        console.log(this.searchedPlaylists)
        this.searchedPlaylistsUpdated.next([...this.searchedPlaylists])
      })
    }

    getSearchedPlaylistsUpdateListener() {
      return this.searchedPlaylistsUpdated.asObservable();
    }
}
