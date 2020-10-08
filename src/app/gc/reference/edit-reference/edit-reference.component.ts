import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { SharingService } from '../../services/sharing.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReferenceElement, ManagerElement } from '../reference.component';
import { Router } from '@angular/router';
import { Structure } from '../../settings/structure/structure.component';

@Component({
  selector: 'app-edit-reference',
  templateUrl: './edit-reference.component.html',
  styleUrls: ['./edit-reference.component.css']
})
export class EditReferenceComponent implements OnInit {
  //data:any;
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
 man:any;
 dat:any;
  constructor(private crudService:CrudService,private interactionService: SharingService,
    private _formBuilder: FormBuilder,private route:Router) { }

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
      structure: [''],
      Status: ['', Validators.required],
      ModeleJ: ['', Validators.required],
    });

    this.data = this.interactionService.sharingValue;
    this.crudService.getItemsById('sDLReferences',this.data.id).subscribe(
      (data)=>{
        this.dat = data;
        console.log(data);
        this.crudService.getlinkItem(this.dat._links.manager.href).subscribe(
          (data2)=>{
            this.man = data2;
            this.manager =this.man;
            console.log(this.manager);
          }
        );
      }
    );

    this.getStruct();
  }

  public updateRef() {
    this.crudService.updateRefStructItem(this.data,this.selectedValue,
      this.selectedValueStatus,this.selectedValueModeleJ);
    this.crudService.updateItem(this.manager);
    this.route.navigate(['/reference']); 
  }

  getStruct(){
    this.crudService.getItems('structures').subscribe(
      (data)=>{
        // @ts-ignore
        this.listStruct=data._embedded.structures;
      }
    );
    // @ts-ignore
    this.crudService.getlinkItem(this.data._links.structure.href).subscribe(
      (data)=>{
        // @ts-ignore
        this.selectedValue=data;
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
