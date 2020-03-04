import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
      const element = document.querySelector('.header_area');
      if (window.pageYOffset > element.clientHeight + 200) {
        element.classList.add('navbar-inverse');
      } else if (window.pageYOffset + 80 <= element.clientHeight) {
        element.classList.remove('navbar-inverse');
      }
  }

}
