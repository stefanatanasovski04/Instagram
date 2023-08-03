import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Post } from '../models/posts';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
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

    if(id === 0){
      return of(this.initializePost());
    }
    const url = `${this.postUrl}/${id}`
    return this.http.get<Post>(url).pipe(
      tap( data => console.log('getPost: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getAlbums() : Observable<Album[]>{
    return this.http.get<Album[]>(this.albumUrl)
      .pipe(
        tap(data => console.log('Albums',JSON.stringify(data)))
      )
  }

  getAlbum(id: number) : Observable<Album | undefined>{
    return this.getAlbums().pipe(
      map( (albums: Album[]) => albums.find(p => p.id === id) )
    );
  }

  createPost(post: Post): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    post.id = null;
    console.log('Post to: ' + this.postUrl)
    return this.http.post<Post>(this.postUrl, post, { headers })
      .pipe(
        tap(data => console.log('createPost: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deletePost(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.postUrl + '/' + id;
    console.log("Delete URL: ", url)
    return this.http.delete<Post>(url, { headers })
      .pipe(
        tap(data => console.log('deletePost: ' + id)),
        catchError(this.handleError)
      );
  }

  updatePost(post: Post): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.postUrl}/${post.id}`;
    console.log("Update URL: ", url)
    return this.http.put<Post>(url, post, { headers })
      .pipe(
        tap(() => console.log('updatePost: ' + post.id)),
        // Return the post on an update
        map(() => post),
        catchError(this.handleError)
      );
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

  private initializePost() : Post{
    return{
      id: 0,
      albumId: 1,
      title: '',
      url: '',
      thumbnailUrl: ''
    }
  }


  

}
