import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from '../../services/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractElement } from '../contract.component';
import { ReferenceDelegElement, ReferenceElement } from '../../reference/reference.component';

@Component({
  selector: 'app-add-contract-dialoge',
  templateUrl: './add-contract-dialoge.component.html',
  styleUrls: ['./add-contract-dialoge.component.css']
})
export class AddContractDialogeComponent implements OnInit {
  firstFormGroup: FormGroup;
  data:ContractElement={id : 0,numContrat:'',titleContract:'',contractObject:'',effectiveDate:0,
  endDate:0,sector:'',contractAmount:'',numMarket:'',pi:'',observations:''};
  //ref:any[];
  refdeleg:ReferenceDelegElement[];
  refSDL:ReferenceElement[];
  selectedValue:ReferenceElement;
  selectedValueDeleg:ReferenceDelegElement;
  referenceType:boolean=false;

  constructor(private crudService:CrudService,private route:Router,private _formBuilder: FormBuilder,
     private _snackBar: MatSnackBar) {
}

ngOnInit(): void {
  this.firstFormGroup = this._formBuilder.group({
    numContrat: ['', Validators.required],
    titleContract: ['', Validators.required],
    contractObject: ['', Validators.required],
    effectiveDate: ['', Validators.required],
    endDate: ['', Validators.required],
    sector: ['', Validators.required],
    contractAmount: ['', Validators.required],
    numMarket: ['', Validators.required],
    pi: ['', Validators.required],
    observations: ['', Validators.required],
    reference: ['', Validators.required],
    referencedeleg: ['', Validators.required],
    referenceType: [false, Validators.required]
  });
  
    this.getRef();
    
}

public addCont() {
  if(this.referenceType){
  this.crudService.addContractRefDelegItem('contrats',this.data,this.selectedValueDeleg);
   }else{
     this.crudService.addContractRefSDLItem('contrats',this.data,this.selectedValue);
   }
   this._snackBar.open('Element Created',"",{
     duration: 2000,
     verticalPosition: 'top',
     panelClass: ['snackbarSuccess']
   });
   this.route.navigate(['/contract']); 
}

getRef(){
 this.crudService.getItems("delegateReferences").subscribe(
   (data)=>{
     // @ts-ignore
     this.refdeleg = data._embedded.delegateReferences;
     });
   

 this.crudService.getItems("sDLReferences").subscribe(
  (data)=>{
     // @ts-ignore
    this.refSDL = data._embedded.sDLReferences;
      
     });
  
}
}
