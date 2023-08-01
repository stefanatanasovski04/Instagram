import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDetailComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'posts', component: PostListComponent},
      {path:'', redirectTo:'posts',pathMatch:'full'},
      {path:'**', redirectTo:'posts', pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    CommonModule
  ]
})
export class AppModule { }
