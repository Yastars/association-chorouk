import { Component, OnInit } from '@angular/core';
import { PostService, PostModel } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-blog-page',
  templateUrl: './single-blog-page.component.html',
  styleUrls: ['./single-blog-page.component.css']
})
export class SingleBlogPageComponent implements OnInit {

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
    ) {  }

  post: PostModel;
  id: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.postService.getOnePost(this.id).subscribe(
      result => this.post = result.body,
      error => console.error(`The item ${this.id} doesn't exist!`)
    );
  }

}
