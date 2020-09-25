import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReferenceDelegElement, ManagerElement, ParentCompElement } from '../reference.component';
import { CrudService } from '../../services/crud.service';
import { SharingService } from '../../services/sharing.service';
import { Router } from '@angular/router';
import { Structure } from '../../settings/structure/structure.component';

@Component({
  selector: 'app-edit-deleg-reference',
  templateUrl: './edit-deleg-reference.component.html',
  styleUrls: ['./edit-deleg-reference.component.css']
})
export class EditDelegReferenceComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thrdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  data:ReferenceDelegElement={id : 0,socialReason : '',publicLiability : '',taxIdentification:'',
  commonCompanyIdentifier:'',numCnss:'',adresse:'',telephone:'',fax:'',capitale:0,capitalPerShareholder:0,
  email:'',activitySector:'',foreignCompanySubsidiary:false};
 
   manager:ManagerElement={id : 0,name : '',firstname : '',tel : '', mail : ''}; 
 
   parentComp:ParentCompElement={id : 0,socialReason : '',city:'',activitySector:''};

   listStruct:Structure[];
 selectedValue:Structure;

    man:any;
    dat:any;
    pc:any;

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
    });
    this.fourthFormGroup = this._formBuilder.group({
      foreignCompanySubsidiary: [false, Validators.required],
      socialReason: ['', Validators.required],
      city: ['', Validators.required],
      activitySector: ['', Validators.required],
    });

    this.data = this.interactionService.sharingValue;
    this.crudService.getItemsById('delegateReferences',this.data.id).subscribe(
      (data)=>{
        this.dat = data;
        console.log(data);
        this.crudService.getlinkItem(this.dat._links.manager.href).subscribe(
          (data2)=>{
            this.man = data2;
            this.manager =this.man;
            console.log(this.manager);
            if(this.dat.foreignCompanySubsidiary){
            this.crudService.getlinkItem(this.dat._links.parentCompany.href).subscribe(
              (data3)=>{
                this.pc = data3;
                this.parentComp =this.pc;
                console.log(this.parentComp);
              }
            );}
          }
        );
      }
    );
    this.getStruct();
  }


  editDelegRef(){
    if(this.data.foreignCompanySubsidiary){
    this.crudService.updateRefStructItem(this.data,this.selectedValue);
    this.crudService.updateItem(this.manager);
    this.crudService.updateItem(this.parentComp);
       }else{
        this.crudService.updateRefStructItem(this.data,this.selectedValue);
        this.crudService.updateItem(this.manager);
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
    // @ts-ignore
    this.crudService.getlinkItem(this.data._links.structure.href).subscribe(
      (data)=>{
        // @ts-ignore
        this.selectedValue=data;
      }
    );
   }

}
