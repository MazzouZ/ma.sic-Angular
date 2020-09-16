import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../services/crud.service';
import {FormControl, Validators} from '@angular/forms';
import {Structure, StructureComponent} from '../structure.component';

@Component({
  selector: 'app-add-structure',
  templateUrl: './add-structure.component.html',
  styleUrls: ['./add-structure.component.css']
})
export class AddStructureComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StructureComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Structure,
              private crudService: CrudService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  public addStructure() {
    this.crudService.addItem('structures', this.data);
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
