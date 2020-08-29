import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game, GamePage } from 'src/app/Entities/Game';

const NBR_POSTS_PER_PAGE = 9;

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  gamePage: GamePage;
  next: string;
  previous: string;
  allPages: number[];
  currentPage = -1;
  // next: number;
  
  constructor(private gameService: GameService) { }


  ngOnInit() {
    this.gameService.getGames(1).subscribe(
      result => {
        this.gamePage = { ...result.body };
      },
      (error) => console.log('Error Observable GameListComponent.ngOnInit()'),
      () => {
        this.next = this.gamePage.next;
        this.previous = this.gamePage.previous;
        this.allPages = new Array(2); // Nbr of pages to show

        const nbrPages = Math.floor(
          this.gamePage.count / NBR_POSTS_PER_PAGE
        ); // 5 posts per page
        const z = this.currentPage > 3 ? 3 : this.currentPage - 1;
        for (
          let i = this.currentPage - z;
          i < this.currentPage + nbrPages && i - z <= this.gamePage.count;
          i++
        ) {
          this.allPages[i - this.currentPage] = i - z;
        }
      } // On Complete
    );
  }

}
