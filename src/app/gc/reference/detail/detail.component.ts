import { Component, OnInit } from '@angular/core';
import { ReferenceElement, ManagerElement } from '../reference.component';
import { SharingService } from '../../services/sharing.service';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  data:ReferenceElement={id : 0,socialReason : '',publicLiability : '',taxIdentification:'',
  commonCompanyIdentifier:'',numCnss:'',adresse:'',telephone:'',fax:'',capitale:0,capitalPerShareholder:0,
  email:'',activitySector:''};

  manager:ManagerElement={id : 0,name : '',firstname : '',tel : '', mail : ''}; 


  man:any;
  dat:any;
  
  constructor(private interactionService: SharingService,private crudService:CrudService){ }

  ngOnInit() {
   
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
    
  }
  
}
