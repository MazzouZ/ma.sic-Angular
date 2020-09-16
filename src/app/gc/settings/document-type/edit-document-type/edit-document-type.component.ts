import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../services/crud.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-document-type',
  templateUrl: './edit-document-type.component.html',
  styleUrls: ['./edit-document-type.component.css']
})
export class EditDocumentTypeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDocumentTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private crudService: CrudService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  public editDocument() {
    this.crudService.updateItem(this.data.documentType);
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
