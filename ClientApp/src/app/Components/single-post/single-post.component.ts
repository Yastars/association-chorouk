import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  @Input() post: any;

  category: string;

  constructor(

  ) { }

  ngOnInit(): void {

    // ('sport','Sport'),
    // ('news','News'),
    // ('donation','Donation'),
    // ('match','Match'),
    // ('project','Project'),

    switch (this.post.category){
      case 'sport':
        this.category = 'رياضة';
        break;
      case 'news':
        this.category = 'أخبار';
        break;
      case 'donation':
        this.category = 'تبرعات';
        break;
      case 'match':
        this.category = 'مباراة';
        break;
      case 'project':
        this.category = 'مشروع';
        break;
    }

  }

}
