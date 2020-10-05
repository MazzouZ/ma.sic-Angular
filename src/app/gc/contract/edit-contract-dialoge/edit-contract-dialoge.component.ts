import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ReferenceDelegElement, ReferenceElement } from '../../reference/reference.component';
import { CrudService } from '../../services/crud.service';
import { SharingService } from '../../services/sharing.service';
import { ContractElement } from '../contract.component';
import {Document} from "../../document/document.component";

@Component({
  selector: 'app-edit-contract-dialoge',
  templateUrl: './edit-contract-dialoge.component.html',
  styleUrls: ['./edit-contract-dialoge.component.css']
})
export class EditContractDialogeComponent implements OnInit {
  firstFormGroup: FormGroup;
  data:ContractElement={id : 0,numContrat:'',titleContract:'',contractObject:'',effectiveDate:0,
  endDate:0,sector:'',contractAmount:'',numMarket:'',pi:'',observations:''};

  refdeleg:ReferenceDelegElement[];
  refSDL:ReferenceElement[];
  selectedValue:ReferenceElement;
  selectedValueDeleg:ReferenceDelegElement;
  referenceType:boolean;

  documents:Document;
  signedMarket: any;
  signedContract: any;

  constructor(private crudService:CrudService,private route:Router,private _formBuilder: FormBuilder,
     private _snackBar: MatSnackBar,private interactionService: SharingService) {
}

  ngOnInit() {
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
      signedMarket: ['', Validators.required],
      signedContract: ['', Validators.required],
    });

    this.data = this.interactionService.sharingValue;
    this.getRef();
  }
    editCont(){
      if(this.referenceType){
        this.crudService.updateContractRef(this.data,this.selectedValueDeleg,this.referenceType,this.signedMarket,this.signedContract);
      }else{
        this.crudService.updateContractRef(this.data,this.selectedValue,this.referenceType,this.signedMarket,this.signedContract);
      }
      this.route.navigate(['/contract']);

  }
      getRef(){
        // @ts-ignore
      this.crudService.getlinkItem(this.data._links.delegateReference.href).subscribe(
        (data:any)=>{
                this.crudService.getItems("delegateReferences").subscribe(
                  (data3:any)=>{
                    this.refdeleg = data3._embedded.delegateReferences;
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
        this.crudService.getItems('documents').subscribe(
          (data:any)=>{
            this.documents = data._embedded.documents;
              //console.log(this.documents);
          },error=>{
            console.log(error);
          });

}
}
