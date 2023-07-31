import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  imageUrl: string = 'https://via.placeholder.com/150/92c952';
  content: string = 'accusamus beatae ad facilis cum similique qui sunt';

}
