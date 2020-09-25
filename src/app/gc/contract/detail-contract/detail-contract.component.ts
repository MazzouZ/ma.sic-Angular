import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { SharingService } from '../../services/sharing.service';
import { ContractElement } from '../contract.component';

@Component({
  selector: 'app-detail-contract',
  templateUrl: './detail-contract.component.html',
  styleUrls: ['./detail-contract.component.css']
})
export class DetailContractComponent implements OnInit {
  data:ContractElement={id: 0,
    numContrat: '',
    titleContract: '',
    contractObject: '',
    effectiveDate: 0,
    endDate: 0,
    sector : '',
    contractAmount: '',
    numMarket: '',
    pi: '',
    observations: ''};

  ref:any;  
  
  constructor(private interactionService: SharingService,private crudService:CrudService) { }

  ngOnInit() {
    this.data = this.interactionService.sharingValue;
     // @ts-ignore
     this.crudService.getlinkItem(this.data._links.delegateReference.href).subscribe(
      (data)=>{
                  // @ts-ignore
                  this.ref = data;  
  },error => {
    // @ts-ignore
    this.crudService.getlinkItem(this.data._links.sDLReference.href).subscribe(
      (data2)=>{
            // @ts-ignore
            this.ref = data2;
             });
  }
);
  }

}
