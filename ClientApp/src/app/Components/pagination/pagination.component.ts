import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() allPages: number[];
  @Input() currentPage = -1;
  @Input() previous: string;
  @Input() next: string;

  onClick(pageNumber: number, category?: string) {
    this.currentPage = pageNumber;
    // this.loadPage(pageNumber, category);
    // I need to routerLink this
  }
}
