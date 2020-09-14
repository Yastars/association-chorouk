import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-position-picker-dialog',
  templateUrl: './position-picker-dialog.component.html',
  styleUrls: ['./position-picker-dialog.component.scss'],
})
export class PositionPickerDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PositionPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  
  ngOnInit(): void {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
