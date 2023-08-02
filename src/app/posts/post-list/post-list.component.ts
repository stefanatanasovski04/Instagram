import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts';
import { PostService } from '../post.service';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/models/albums';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit{
 posts: Post[] = [];
 albums: Album[] = []; 
 sub!: Subscription;
 errorMessage!: string;

  constructor(private postService: PostService){}

  ngOnInit(): void {
   
    //get the posts
    this.sub = this.postService.getPosts().subscribe({
    next: posts => this.posts = posts,
    error: err => this.errorMessage = err,
   });

   //get the albums
    // this.sub = this.postService.getAlbums().subscribe({
    //   next: albums => this.albums = albums,
    //   error: err => this.errorMessage = err
    // })
  
  }

  
}
