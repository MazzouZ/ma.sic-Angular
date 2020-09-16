import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../services/crud.service';
import {FormControl, Validators} from '@angular/forms';
import {Investment} from '../investment-type.component';

@Component({
  selector: 'app-add-investment-type',
  templateUrl: './add-investment-type.component.html',
  styleUrls: ['./add-investment-type.component.css']
})
export class AddInvestmentTypeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddInvestmentTypeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Investment,
              private crudService: CrudService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  public addInvestment() {
    this.crudService.addItem('investmentTypes', this.data);
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
