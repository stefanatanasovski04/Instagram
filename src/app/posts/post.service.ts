import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Post } from '../posts';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Album } from '../albums';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  private postUrl = 'http://jsonplaceholder.typicode.com/photos';
  private albumUrl = 'http://jsonplaceholder.typicode.com/albums'


  getPosts() : Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl)
      .pipe(
        tap(data =>JSON.stringify(data)),
      )
  }

  getAlbums() : Observable<Album[]>{
    return this.http.get<Album[]>(this.albumUrl)
      .pipe(
        tap(data => console.log('Albums',JSON.stringify(data)))
      )
  }


  

}
