import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

  allPosts: any;
  currentPage = (this.route.snapshot.paramMap.get('id')) ? parseInt(this.route.snapshot.paramMap.get('id'), 10) :  1;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.postService.getPageOfPosts(this.currentPage).subscribe(
      result => {
        this.allPosts = result;
      }
    );
  }

}
