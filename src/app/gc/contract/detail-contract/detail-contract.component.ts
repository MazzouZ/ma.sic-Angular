import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {SharingService} from '../../services/sharing.service';
import {ContractElement} from '../contract.component';

@Component({
  selector: 'app-detail-contract',
  templateUrl: './detail-contract.component.html',
  styleUrls: ['./detail-contract.component.css']
})
export class DetailContractComponent implements OnInit {
  data: any = {
    id: 0,
    numContrat: '',
    titleContract: '',
    contractObject: '',
    effectiveDate: 0,
    endDate: 0,
    sector: '',
    contractAmount: '',
    numMarket: '',
    pi: '',
    observations: '',
    signedContract: '',
    signedMarket: '',
  };

  ref: any;

  constructor(private interactionService: SharingService, private crudService: CrudService) {
  }

  ngOnInit() {
    this.data = this.interactionService.sharingValue;
    // @ts-ignore
    this.crudService.getlinkItem(this.data._links.delegateReference.href).subscribe(
      (data: any) => {
        // @ts-ignore
        this.ref = data;
        this.getDocumentsNames();
      }, error => {
        // @ts-ignore
        this.crudService.getlinkItem(this.data._links.sDLReference.href).subscribe(
          (data2) => {
            this.getDocumentsNames();
            // @ts-ignore
            this.ref = data2;
          });
      }
    );
  }

  getDocumentsNames() {
    this.crudService.getlinkItem(this.data._links.signedContract.href.replace('{?projection}','')).subscribe((value: any) => {
      //console.log(value);
      this.data.signedContract = value;
      this.crudService.getlinkItem(this.data._links.signedMarket.href.replace('{?projection}','')).subscribe((value: any) => {
        this.data.signedMarket = value;
      }, error => {
        console.log(error)
      });
    }, error => {
      console.log(error)
    });
  }

}
