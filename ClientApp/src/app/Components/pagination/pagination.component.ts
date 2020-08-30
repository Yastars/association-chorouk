import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit{
  allPages: number[];
  @Input() currentPage = -1;
  @Input() previous: string;
  @Input() next: string;
  @Input() nbrPages: number;

  ngOnInit(){
    this.allPages = new Array(2); // Nbr of pages to show
    
    const z = this.currentPage > 3 ? 3 : this.currentPage - 1;
    for (let i = this.currentPage - z; i < this.currentPage + this.nbrPages; i++) {
      if (i - z <= this.nbrPages)
        this.allPages[i - this.currentPage] = i - z;
      else this.allPages[i - this.currentPage] = null;
    }
    console.log({
        YOOOOOOOOOOOOOOOOOOO: this.allPages
    })
  }

  onClick(pageNumber: number) {
    if (pageNumber > 1 && pageNumber <= this.nbrPages )
    this.currentPage = pageNumber;
  }
}
