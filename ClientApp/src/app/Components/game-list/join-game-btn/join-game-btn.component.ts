import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-game-btn',
  templateUrl: './join-game-btn.component.html',
  styleUrls: ['./join-game-btn.component.scss']
})
export class JoinGameBtnComponent implements OnInit {

  @Input() is_registered;
  @Input() team_status;
  @Input() team_ID;
  @Input() bgColor;

  constructor() { }

  ngOnInit(): void {
  }

}
