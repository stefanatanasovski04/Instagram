import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  pageTitle: string = 'Edit Post';

  postForm!: FormGroup;
  private sub!: Subscription;
  errorMessage: string = '';
  post!: Post | undefined;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.postForm = this.fb.group({
      albumId: 1,
      title: '',
      url: '',
      thumbnailUrl: ''
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.getPost(id);
      }
    )

  }

  getPost(id: number): void {
    this.postService.getPost(id).subscribe({
      next: (post) => this.displayPost(post),
      error: err => this.errorMessage = err
    })
  }




  displayPost(post: Post | undefined): void {
    if (this.postForm) {
      this.postForm.reset();
    }
    this.post = post;

    if (this.post?.id === 0) {
      this.pageTitle = 'Add Post';
    } else {
      this.pageTitle = `Edit Post: ${this.post?.title}`;
    }

    // Update the data on the form
    this.postForm.patchValue({
      albumId: this.post?.albumId,
      title: this.post?.title,
      url: this.post?.url,
      thumbnailUrl: this.post?.thumbnailUrl
    });
  }


  savePost(): void {
    if (this.postForm.valid) {
      if (this.postForm.dirty) {
        const p = { ...this.post, ...this.postForm.value };

        if (p.id === 0) {
          this.postService.createPost(p).subscribe({
            next: x => {
              console.log(x);
              return this.onSaveComplete();
            },
            error: err => this.errorMessage = err
          });
        }else {
          this.postService.updatePost(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            })
        }
      }else{
        this.onSaveComplete();
      }
    }else{
      this.errorMessage = 'Correct the errors!'
    }
  }

  onSaveComplete(): void {
    this.postForm.reset();
    this.router.navigate(['/posts']);
  }

  onCancel() {
    console.log('Cancel');
    this.router.navigate(['/posts'])
  }

  saveProduct() {
    console.log('Post Saved!!');
  }




}
