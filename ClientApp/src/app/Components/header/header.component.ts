import { Component, OnInit, HostListener } from '@angular/core';


import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  element;

  faBars = faBars;

  ngOnInit(): void {
    this.element = document.querySelector('.header_area');
    if (this.element.clientWidth <= 991) {
      this.element.classList.add('navbar-inverse');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (
      window.pageYOffset > this.element.clientHeight + 200 || this.element.clientWidth <= 991) {
        this.element.classList.add('navbar-inverse');
    } else if (window.pageYOffset + 80 <= this.element.clientHeight) {
      this.element.classList.remove('navbar-inverse');
    }
  }
}
