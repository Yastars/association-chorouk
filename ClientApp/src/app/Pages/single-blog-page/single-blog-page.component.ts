import { Component, OnInit } from '@angular/core';
import { PostService, PostModel } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceBase } from 'src/app/services/service-base.service';

@Component({
  selector: 'app-single-blog-page',
  templateUrl: './single-blog-page.component.html',
  styleUrls: ['./single-blog-page.component.css']
})
export class SingleBlogPageComponent implements OnInit {

  baseUrl: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private serviceBase: ServiceBase
    ) {  }

  post: PostModel;
  id: string;

  ngOnInit(): void {
    this.baseUrl = this.serviceBase.getBaseUrl();
    this.id = this.route.snapshot.paramMap.get('id');
    this.postService.getOnePost(this.id).subscribe(
      result => this.post = result.body,
      error => console.error(`The item ${this.id} doesn't exist!`)
    );
  }

}
