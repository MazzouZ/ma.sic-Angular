import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ActivityArea} from '../activity-area.component';
import {CrudService} from '../../../services/crud.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditActivityComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private crudService: CrudService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  public editActivity() {
    this.crudService.updateItem(this.data.activityArea);
    this._snackBar.open('Element Updated', '', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['snackbarSuccess']
    });
  }

  submit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
