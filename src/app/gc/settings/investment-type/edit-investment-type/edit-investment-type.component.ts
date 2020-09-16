import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../services/crud.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-investment-type',
  templateUrl: './edit-investment-type.component.html',
  styleUrls: ['./edit-investment-type.component.css']
})
export class EditInvestmentTypeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditInvestmentTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private crudService: CrudService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  public editInvestmentType() {
    this.crudService.updateItem(this.data.investmentType);
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
