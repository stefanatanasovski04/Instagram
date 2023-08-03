import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from 'src/app/models/posts';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post!: Post | undefined;
  errorMessage: string = "";

  constructor(
    private postService: PostService, 
    private route: ActivatedRoute,
    private roter: Router
    ){}

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

  
  deletePost(): void {
    if(this.post?.id === 0){
      this.onSaveComplete();
    }else if(this.post?.id){
      if(confirm(`Are you sure that you want to delete this post: ${this.post.title}?`)){
        this.postService.deletePost(this.post.id)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        })
      }
    }
  }

  onSaveComplete(): void{
    this.roter.navigate(['/posts']);
  }

  onBack(): void{
    this.roter.navigate(['/posts']);
  }

  onEdit(){
    let tmp: any = this.route.snapshot.paramMap.get('id');
    let id = parseInt(tmp);
    this.roter.navigateByUrl(`/posts/${id}/edit`)
  }
}
