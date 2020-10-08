import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { ReferenceElement, ManagerElement } from '../reference.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Structure } from '../../settings/structure/structure.component';


@Component({
  selector: 'app-add-reference',
  templateUrl: './add-reference.component.html',
  styleUrls: ['./add-reference.component.css']
})
export class AddReferenceComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thrdFormGroup: FormGroup;

 data:ReferenceElement={id : 0,socialReason : '',publicLiability : '',taxIdentification:'',
 commonCompanyIdentifier:'',numCnss:'',adresse:'',telephone:'',fax:'',capitale:0,capitalPerShareholder:0,
 email:'',activitySector:''};

 listStruct:Structure[];
 selectedValue:Structure;
 listDoc:Document[];
 selectedValueStatus:Document;
 selectedValueModeleJ:Document;

  manager:ManagerElement={id : 0,name : '',firstname : '',tel : '', mail : ''};

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
      Status: ['', Validators.required],
      ModeleJ: ['', Validators.required],
    });
    this.getStructDoc();
  }

  public addRef() {

    this.crudService.addManagerRefItem('sDLReferences',this.data,this.manager,this.selectedValue,
    this.selectedValueStatus,this.selectedValueModeleJ);
    this.route.navigate(['/reference']); 
 }

 getStructDoc(){
  this.crudService.getItems('structures').subscribe(
    (data)=>{
      // @ts-ignore
      this.listStruct=data._embedded.structures;
    }
  );

  this.crudService.getItems('documents').subscribe(
    (data)=>{
      // @ts-ignore
      this.listDoc=data._embedded.documents;
    }
  );
 }

}
