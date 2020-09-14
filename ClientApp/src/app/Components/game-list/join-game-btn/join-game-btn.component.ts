import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PositionPickerDialogComponent } from '../position-picker-dialog/position-picker-dialog.component';

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

  hover:boolean;

  position: string;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PositionPickerDialogComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.position = result;
    });
  }

}
