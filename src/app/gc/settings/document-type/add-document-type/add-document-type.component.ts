import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../services/crud.service';
import {FormControl, Validators} from '@angular/forms';
import {DocumentxType} from '../document-type.component';

@Component({
  selector: 'app-add-document-type',
  templateUrl: './add-document-type.component.html',
  styleUrls: ['./add-document-type.component.css']
})
export class AddDocumentTypeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddDocumentTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DocumentxType,
              private crudService: CrudService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  public addDocument() {
    this.crudService.addItem('documentTypes', this.data);
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
