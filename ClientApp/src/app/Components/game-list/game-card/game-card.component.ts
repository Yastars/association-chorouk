import { Component, Input, OnInit } from '@angular/core';
import { faSadTear } from '@fortawesome/free-regular-svg-icons';
import { Game } from 'src/app/Entities/Game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() game: Game;

  //font awesome
  faSadTear = faSadTear;
  
  constructor() { }


  ngOnInit(): void {
  }

}
