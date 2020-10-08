import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ReferenceDelegElement, ReferenceElement } from '../../reference/reference.component';
import { CrudService } from '../../services/crud.service';
import { InvestmentElement } from '../investment.component';

@Component({
  selector: 'app-add-investment',
  templateUrl: './add-investment.component.html',
  styleUrls: ['./add-investment.component.css']
})
export class AddInvestmentComponent implements OnInit {
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
     private _snackBar: MatSnackBar) {
}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      montant: ['', Validators.required],
      objectifs: ['', Validators.required],
      InvTypes: ['', Validators.required],
      status: ['', Validators.required],
      pj: ['', Validators.required],
      observations: ['', Validators.required],
      referenceType: ['', Validators.required],
      reference: ['', Validators.required],
      referencedeleg: ['', Validators.required],
    });
    
      this.getRef();
      
  }

  public addInv() {
    if(this.referenceType){
    this.crudService.addInvestmentRefItem('investissements',this.data,this.selectedValueDeleg,this.selectedValueInv,this.referenceType);
     }else{
       this.crudService.addInvestmentRefItem('investissements',this.data,this.selectedValue,this.selectedValueInv,this.referenceType);
     }
     this._snackBar.open('Element Created',"",{
       duration: 2000,
       verticalPosition: 'top',
       panelClass: ['snackbarSuccess']
     });
     this.route.navigate(['/Investment']); 
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

  this.crudService.getItems("investmentTypes").subscribe(
        (data)=>{
           // @ts-ignore
          this.InvTypes = data._embedded.investmentTypes;
            
           });    
    
  }

}
