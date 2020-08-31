import { Component, OnInit, HostListener } from '@angular/core';


import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/Entities/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {}
  userObservable : Observable<User>;

  element;
  user: User;
  

  faBars = faBars;

  ngOnInit(): void {
    this.userObservable = this.authService.userSubscription;

    
    this.userObservable.subscribe(data => {
      this.user = data
    });

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
