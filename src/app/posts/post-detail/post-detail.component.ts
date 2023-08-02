import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from 'src/app/models/posts';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post!: Post | undefined;
  errorMessage: string = "";

  constructor(private postService: PostService, private route: ActivatedRoute){}

  ngOnInit(): void {
    let tmp: any = this.route.snapshot.paramMap.get('id');
    let id = parseInt(tmp);
    this.getPost(id)
    // this.getPost(id);
  }

  getPost(id: number): void{
    this.postService.getPost(id).subscribe({
      next: post => {
        this.post = post,
        console.log(post)
      },
      error: err => {
        this.errorMessage = err,
        console.log(this.errorMessage);
      }
    });
  }

  
}
