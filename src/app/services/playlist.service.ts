import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { Playlist } from '../models/playlist.model'

@Injectable({
    providedIn: 'root',
})

export class PlaylistService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    uri = 'https://api.spotify.com/v1/'
    playlists = ['37i9dQZF1E39zqQpHOUFIl']
    myPlaylists: Playlist[] = [];
    myPlaylistsUpdated = new Subject<Playlist[]>();
    userId;

    getPlaylist() {

      const header = {
        'Authorization': `Bearer ${this.authService._token}`
      }
      const reqOps = {
        headers: new HttpHeaders(header)
      }
      return this.http.get(`${this.uri}playlists/${this.playlists[0]}`, reqOps);
    }

    getUserId() {

      const header = {
        'Authorization': `Bearer ${this.authService._token}`
      }
      const reqOps = {
        headers: new HttpHeaders(header)
      }
      this.http.get<{ id: any }>(`${this.uri}me`, reqOps)
      .pipe(map(userInfo => {
        return this.userId = userInfo.id
        }))
        .subscribe(userId => {
          console.log(userId);
        })
    }

    getMyPlaylists() {

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
            name: playlist.name,
            id: playlist.id,
            tracks: playlist.tracks,
            uri: playlist.uri,
            collaborative: playlist.collaborative,
            images: playlist.images
          }
        });
      }))
      .subscribe(transformedPlaylistsInfo => {
        this.myPlaylists = transformedPlaylistsInfo;
        console.log(this.myPlaylists)
        this.myPlaylistsUpdated.next([...this.myPlaylists])
      })
    }

    getMyPlaylistsUpdateListener() {
      return this.myPlaylistsUpdated.asObservable();
    }
}
