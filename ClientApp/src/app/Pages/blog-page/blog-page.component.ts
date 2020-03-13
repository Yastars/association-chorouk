import { Component, OnInit } from '@angular/core';
import { PostService, PostPageModel } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { isNumber } from 'util';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

  next: string = null;
  previous: string = null;
  allPosts: PostPageModel;
  allPages: number[];
  currentPage = -1;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentPage = typeof this.route.snapshot.paramMap.get('id') === 'number' ?
    parseInt(this.route.snapshot.paramMap.get('id'), 10) : -1;
    console.log(this.currentPage);
    if (this.currentPage === -1) {
      this.currentPage = 1;
      this.router.navigate(['/blog/1']);
    }
    this.loadPage(this.currentPage);
  }

  loadPage(pageNumber: number) {
    this.postService.getAllPosts(pageNumber).subscribe(
      (result) => {                         // On Success
        this.allPosts = { ...result.body };
      },
      error => console.log('Error Observable BlogPageComponent.ngOnInit()'),
      () => {
        this.next = this.allPosts.next;
        this.previous = this.allPosts.previous;
        this.allPages = new Array(6);
        const z = (this.currentPage > 3) ? 3 : this.currentPage - 1;
        for (let i = this.currentPage - z; i <= this.currentPage + 6 && i - z <= this.allPosts.count; i++) {
          this.allPages[i - this.currentPage] = i - z;
        }
        console.log( this.allPages); } // On Complete
    );
  }

  onClick(pageNumber: number) {
    this.currentPage = pageNumber;
    this.loadPage(pageNumber);
  }
}
