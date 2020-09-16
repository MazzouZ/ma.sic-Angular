import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../services/crud.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-structure',
  templateUrl: './edit-structure.component.html',
  styleUrls: ['./edit-structure.component.css']
})
export class EditStructureComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditStructureComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private crudService: CrudService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  public editStructure() {
    this.crudService.updateItem(this.data.structure);
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
