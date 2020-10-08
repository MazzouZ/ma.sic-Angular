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

  structure:any;
  Status:any;
  ModeleJ:any;
  
  constructor(private interactionService: SharingService,private crudService:CrudService){ }

  ngOnInit() {
   
    this.data = this.interactionService.sharingValue;
    // @ts-ignore
        this.crudService.getlinkItem(this.data._links.manager.href).subscribe(
          (data2)=>{
            // @ts-ignore
            this.manager =data2;
            console.log(this.manager);
            // @ts-ignore
            this.crudService.getlinkItem(this.data._links.structure.href).subscribe(
              (data3)=>{
                // @ts-ignore
                this.structure =data3;
                console.log(this.structure);
                if(this.data.foreignCompanySubsidiary){
                  // @ts-ignore
                  this.crudService.getlinkItem(this.data._links.parentCompany.href).subscribe(
                    (data3)=>{
                      // @ts-ignore
                      this.parentComp =data3;
                      console.log(this.parentComp);

                      // @ts-ignore
                const objectStatus = this.data._links.Status.href.replace('{?projection}', '');
                // @ts-ignore
                const objectModj = this.data._links.ModeleJ.href.replace('{?projection}', '');

                // @ts-ignore
                this.crudService.getlinkItem(objectStatus).subscribe(
                  (data4)=>{
                    // @ts-ignore
                    this.Status =data4;
                    console.log(this.Status);
                    // @ts-ignore
                this.crudService.getlinkItem(objectModj).subscribe(
                  (data5)=>{
                    // @ts-ignore
                    this.ModeleJ =data5;
                    console.log(this.ModeleJ);
                  }
                );
                  }
                );
                      
                    }
                  );
              
            
          }
         
      }
    );
    
  }
  );

}
}
