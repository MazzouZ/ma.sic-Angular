import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferenceDelegElement, ManagerElement, ParentCompElement } from '../reference.component';
import { Structure } from '../../settings/structure/structure.component';

@Component({
  selector: 'app-add-deleg-reference',
  templateUrl: './add-deleg-reference.component.html',
  styleUrls: ['./add-deleg-reference.component.css']
})
export class AddDelegReferenceComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thrdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

 data:ReferenceDelegElement={id : 0,socialReason : '',publicLiability : '',taxIdentification:'',
 commonCompanyIdentifier:'',numCnss:'',adresse:'',telephone:'',fax:'',capitale:0,capitalPerShareholder:0,
 email:'',activitySector:'',foreignCompanySubsidiary:false};

 listStruct:Structure[];
 selectedValue:Structure;
 
  manager:ManagerElement={id : 0,name : '',firstname : '',tel : '', mail : ''}; 

  parentComp:ParentCompElement={id : 0,socialReason : '',city:'',activitySector:''};

  constructor(private crudService:CrudService,private route:Router,private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      socialReason: ['', Validators.required],
      publicLiability: ['', Validators.required],
      taxIdentification: ['', Validators.required],
      commonCompanyIdentifier: ['', Validators.required],
      numCnss: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      fax: ['', Validators.required],
      capitale: ['', Validators.required],
      capitalPerShareholder: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.thrdFormGroup = this._formBuilder.group({
      activitySector: ['', Validators.required],
      Name: ['', Validators.required],
      Firstname: ['', Validators.required],
      Tel: ['', Validators.required],
      mail: ['', Validators.required],
      structure: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      foreignCompanySubsidiary: [false, Validators.required],
      socialReason: ['', Validators.required],
      city: ['', Validators.required],
      activitySector: ['', Validators.required],
    });

    this.getStruct();
  }

  public addRef() {

    

    if(this.data.foreignCompanySubsidiary){
      this.crudService.addManagerPcompRefItem('delegateReferences',this.data,this.manager,this.parentComp,this.selectedValue);
    }else{
      this.crudService.addManagerRefItem('delegateReferences',this.data,this.manager,this.selectedValue);
    }
  
    this.route.navigate(['/reference']); 
 }

 getStruct(){
  this.crudService.getItems('structures').subscribe(
    (data)=>{
      // @ts-ignore
      this.listStruct=data._embedded.structures;
    }
  );
 }

}
