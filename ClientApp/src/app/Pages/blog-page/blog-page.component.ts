import { Component, OnInit } from '@angular/core';
import { PostService, PostPageModel } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

  NBR_POSTS_PER_PAGE = 5;

  next: string = null;
  previous: string = null;
  allPosts: PostPageModel;
  allPages: number[];
  currentPage = -1;
  category?: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentPage = typeof this.route.snapshot.paramMap.get('id') === 'number' ?
    parseInt(this.route.snapshot.paramMap.get('id'), 10) : -1;
    console.log(this.currentPage);

    this.category = this.route.snapshot.paramMap.get('category');

    if (this.category) {
      this.currentPage = 1;
      this.router.navigate([`/blog/${this.category}/1`]);
    } else if (this.currentPage === -1) {
      this.currentPage = 1;
      this.router.navigate(['/blog/1']);
    }

    this.loadPage(this.currentPage, this.category);
  }

  loadPage(pageNumber: number, category ?: string) {
    this.postService.getAllPosts(pageNumber, category).subscribe(
      (result) => {                         // On Success
        this.allPosts = { ...result.body };
      },
      error => console.log('Error Observable BlogPageComponent.ngOnInit()'),
      () => {
        this.next = this.allPosts.next;
        this.previous = this.allPosts.previous;
        this.allPages = new Array(2);   // Nbr of pages to show

        const nbrPages = Math.floor(this.allPosts.count / this.NBR_POSTS_PER_PAGE); // 5 posts per page
        const z = (this.currentPage > 3) ? 3 : this.currentPage - 1;
        for (let i = this.currentPage - z; i < this.currentPage + nbrPages && i - z <= this.allPosts.count; i++) {
          this.allPages[i - this.currentPage] = i - z;
        }
        console.log( this.allPages);
        console.log('nbrPages=' + nbrPages);
      } // On Complete
    );
  }

  onClick(pageNumber: number, category ?: string) {
    this.currentPage = pageNumber;
    this.loadPage(pageNumber, category);
  }
}
