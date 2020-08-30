import { Component, OnInit } from '@angular/core';
import { PostService, PostPageModel } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css'],
})
export class BlogPageComponent implements OnInit {
  NBR_POSTS_PER_PAGE = 3;

  next: string = null;
  previous: string = null;
  allPosts: PostPageModel;
  allPages: number[];
  currentPage = -1;
  category?: string;
  nbrPages: number;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.currentPage = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    } catch (error) {
      this.currentPage = 1;
    }

    this.category = this.route.snapshot.paramMap.get('category');

    if (this.category) {
      this.currentPage = 1;
      this.router.navigate([`/blog/${this.category}/1`]);
    } else if (this.currentPage === -1) {
      this.currentPage = 1;
      this.router.navigate(['/blog/1']);
    }

    console.log(this.category, '', this.currentPage);

    this.route.params.subscribe((params) => {
      this.currentPage = parseInt(params.id, 10);
      this.category = params.category;
      this.loadPage(this.currentPage, this.category);
    });

    this.loadPage(this.currentPage, this.category);
  }

  loadPage(pageNumber: number, category?: string) {
    this.postService.getAllPosts(pageNumber, category).subscribe(
      (result) => {
        // On Success
        this.allPosts = { ...result.body };
      },
      (error) => console.log('Error Observable BlogPageComponent.ngOnInit()'),
      () => {
        this.next = this.allPosts.next;
        this.previous = this.allPosts.previous;
        this.allPages = new Array(2); // Nbr of pages to show

        this.nbrPages = Math.ceil(
          this.allPosts.count / this.NBR_POSTS_PER_PAGE
        );
        
      } // On Complete
    );
  }

  onClick(pageNumber: number, category?: string) {
    this.currentPage = pageNumber;
    this.loadPage(pageNumber, category);
  }
}
