import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Post } from '../models/posts';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Album } from '../models/albums';

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
        catchError(this.handleError)
      )
  }

  getPost(id: number) : Observable<Post | undefined>{
    return this.getPosts().pipe(
      map( (posts: Post[]) => posts.find(p => p.id === id) )
    );
  }

  getAlbums() : Observable<Album[]>{
    return this.http.get<Album[]>(this.albumUrl)
      .pipe(
        tap(data => console.log('Albums',JSON.stringify(data)))
      )
  }


  private handleError(err: HttpErrorResponse): Observable<never> {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }


  

}
