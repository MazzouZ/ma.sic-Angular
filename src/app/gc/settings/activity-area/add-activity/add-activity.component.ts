import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ActivityArea} from '../activity-area.component';
import {CrudService} from '../../../services/crud.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddActivityComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ActivityArea,
              private crudService: CrudService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  public addActivity() {
    this.crudService.addItem('activityAreas', this.data);
    this._snackBar.open('Element Created', '', {
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
