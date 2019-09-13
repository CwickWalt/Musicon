import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientService } from './client.service';

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    constructor(private http: HttpClient, private client: ClientService) { }

    authOptions = {
        uri: 'https://accounts.spotify.com/authorize?',
        client_id: this.client.client_id,
        response_type: 'code',
        redirect_uri: 'http://localhost:4200/',
        state: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        scope: 'playlist-read-private playlist-modify-private',
    }

    login() {
        const headerDict = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*'
          }
          
          const requestOptions = {
            headers: new HttpHeaders(headerDict), 
          };
        
        let spotifyAuthUrl = `${this.authOptions.uri}client_id=2aba058a682c4ebbad948c86d89b222a&response_type=${this.authOptions.response_type}&redirect_uri=${this.authOptions.redirect_uri}&scope=${this.authOptions.scope}&state=${this.authOptions.state}`

        console.log(this.http.get)
        this.http.get(spotifyAuthUrl, requestOptions)
            .subscribe((x) => {
                console.log(x)
            })
    }
}
