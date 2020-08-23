import { Component, OnInit } from '@angular/core';
import { ReferenceDelegElement, ManagerElement, ParentCompElement } from '../reference.component';
import { SharingService } from '../../services/sharing.service';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-detail-deleg',
  templateUrl: './detail-deleg.component.html',
  styleUrls: ['./detail-deleg.component.css']
})
export class DetailDelegComponent implements OnInit {
  data:ReferenceDelegElement={id : 0,socialReason : '',publicLiability : '',taxIdentification:'',
  commonCompanyIdentifier:'',numCnss:'',adresse:'',telephone:'',fax:'',capitale:0,capitalPerShareholder:0,
  email:'',activitySector:'',foreignCompanySubsidiary:false};

  manager:ManagerElement={id : 0,name : '',firstname : '',tel : '', mail : ''}; 

  parentComp:ParentCompElement={id : 0,socialReason : '',city:'',activitySector:''};

  man:any;
  dat:any;
  pc:any;
  
  constructor(private interactionService: SharingService,private crudService:CrudService){ }

  ngOnInit() {
   
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
    
  }

}
