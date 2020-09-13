import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-game-btn',
  templateUrl: './join-game-btn.component.html',
  styleUrls: ['./join-game-btn.component.scss']
})
export class JoinGameBtnComponent implements OnInit {

  @Input() isRegistered;
  @Input() isTeamFull;
  @Input() teamId;
  @Input() bgColor;

  constructor() { }

  ngOnInit(): void {
  }

}
