import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { SharingService } from '../../services/sharing.service';
import { InvestmentElement } from '../investment.component';

@Component({
  selector: 'app-detail-investment',
  templateUrl: './detail-investment.component.html',
  styleUrls: ['./detail-investment.component.css']
})
export class DetailInvestmentComponent implements OnInit {
  data:InvestmentElement={id : 0,montant:0,objectifs:'',status:'',pj:'',observations:''};
  ref:any; 
  InvType:any; 
  
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
// @ts-ignore
this.crudService.getlinkItem(this.data._links.investmentType.href).subscribe(
  (data)=>{
              // @ts-ignore
              this.InvType = data;
            }
      );
  }


}
