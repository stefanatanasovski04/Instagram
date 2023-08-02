import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostEditComponent } from './post-edit/post-edit.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    PostEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'posts', component: PostListComponent},
      {path: 'posts/:id', component: PostDetailComponent},
      {path: 'posts/:id/edit', component: PostEditComponent},
    ])
  ]
})
export class PostModule { }
