import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ReferenceDelegElement, ReferenceElement } from '../../reference/reference.component';
import { CrudService } from '../../services/crud.service';
import { SharingService } from '../../services/sharing.service';
import { InvestmentElement } from '../investment.component';

@Component({
  selector: 'app-edit-investment',
  templateUrl: './edit-investment.component.html',
  styleUrls: ['./edit-investment.component.css']
})
export class EditInvestmentComponent implements OnInit {
  firstFormGroup: FormGroup;
  data:InvestmentElement={id : 0,montant:0,objectifs:'',status:'',pj:'',observations:''};

  refdeleg:ReferenceDelegElement[];
  refSDL:ReferenceElement[];
  InvTypes:InvestmentElement[];
  selectedValueInv:InvestmentElement;
  selectedValue:ReferenceElement;
  selectedValueDeleg:ReferenceDelegElement;
  referenceType:boolean=false;
  
  constructor(private crudService:CrudService,private route:Router,private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,private interactionService: SharingService) {
}

 ngOnInit() {
   this.firstFormGroup = this._formBuilder.group({
     montant: ['', Validators.required],
     objectifs: ['', Validators.required],
     InvTypes: ['', Validators.required],
     status: ['', Validators.required],
     pj: ['', Validators.required],
     observations: ['', Validators.required],
     reference: ['', Validators.required],
     referencedeleg: ['', Validators.required],
   });
   this.data = this.interactionService.sharingValue;
     this.getRef();
     
 }
 editInv(){
  if(this.referenceType){
    this.crudService.updateInvestmentRef(this.data,this.selectedValueInv,this.selectedValueDeleg,this.referenceType);
  }else{
    this.crudService.updateInvestmentRef(this.data,this.selectedValueInv,this.selectedValue,this.referenceType);
  }
  this.route.navigate(['/Investment']); 
  
}
  getRef(){
    // @ts-ignore
  this.crudService.getlinkItem(this.data._links.delegateReference.href).subscribe(
    (data)=>{
            this.crudService.getItems("delegateReferences").subscribe(
              (data3)=>{
                // @ts-ignore
                this.refdeleg = data3._embedded.delegateReferences;
                // @ts-ignore
                this.selectedValueDeleg = data;
                this.referenceType=true;
                });
    
},error => {
  // @ts-ignore
  this.crudService.getlinkItem(this.data._links.sDLReference.href).subscribe(
    (data2)=>{
      this.crudService.getItems("sDLReferences").subscribe(
        (data4)=>{
           // @ts-ignore
          this.refSDL = data4._embedded.sDLReferences;
          // @ts-ignore
          this.selectedValue = data2;
          this.referenceType=false;  
           });
    });
}

);

this.crudService.getItems("investmentTypes").subscribe(
  (data)=>{
     // @ts-ignore
    this.InvTypes = data._embedded.investmentTypes;
      
     }); 
}

}
