import { Component, OnInit } from '@angular/core';
import {Penality} from '../penality.component';
import {Router} from '@angular/router';
import {CrudService} from '../../services/crud.service';
import {SharingService} from '../../services/sharing.service';

@Component({
  selector: 'app-edit-penality',
  templateUrl: './edit-penality.component.html',
  styleUrls: ['./edit-penality.component.css']
})
export class EditPenalityComponent implements OnInit {

  favoriteOption: string = 'Contract';
  contractOrReference: string[] = ['Contract', 'Reference Delegator', 'Reference SDL'];
  data: any;
  penalityForId:number;
  list: any[];

  constructor(private crudService: CrudService,
              private router: Router,
              private sharingService: SharingService) {
  }

  ngOnInit() {
    this.data = this.sharingService.sharingValue;
    this.getContracts();
  }

  submit() {
    //console.log(this.data);
    this.crudService.updateItemNoSubscribe(this.data).subscribe((response: any) => {
      //console.log(response);
      if (this.favoriteOption === 'Reference Delegator') {
        this.crudService.linkItems(response._links.delegateReference.href, 'delegateReferences', this.penalityForId)
          .subscribe((res: any) => {
            this.router.navigate(['/penalities']);
          }, error => {
            console.log(error);
          });
      }
      if (this.favoriteOption === 'Reference SDL') {
        this.crudService.linkItems(response._links.sDLReference.href, 'sDLReferences', this.penalityForId).subscribe((res: any) => {
          this.router.navigate(['/penalities']);
        }, error => {
          console.log(error);
        });
      }
      if (this.favoriteOption === 'Contract') {
        this.crudService.linkItems(response._links.contrat.href, 'contrats', this.penalityForId).subscribe((res: any) => {
          this.router.navigate(['/penalities']);
        }, error => {
          console.log(error);
        });
      }
    }, error => {
      console.log(error);
    });
  }

  getContracts() {
    this.crudService.getItems('contrats').subscribe((value: any) => {
      //console.log(value._embedded.contrats);
      this.list = [];
      this.list = value._embedded.contrats;
    }, error => {
      console.log(error);
    });
  }

  getReferenceSDLs() {
    this.crudService.getItems('sDLReferences').subscribe((value: any) => {
      //console.log(value._embedded.sDLReferences);
      this.list = [];
      this.list = value._embedded.sDLReferences;
    }, error => {
      console.log(error);
    });
  }

  getReferenceDelegators() {
    this.crudService.getItems('delegateReferences').subscribe((value: any) => {
      //console.log(value._embedded.delegateReferences);
      this.list = [];
      this.list = value._embedded.delegateReferences;
    }, error => {
      console.log(error);
    });
  }

  optionChanged() {
    if (this.favoriteOption === 'Reference Delegator') {
      this.getReferenceDelegators();
    }
    if (this.favoriteOption === 'Reference SDL') {
      this.getReferenceSDLs();
    }
    if (this.favoriteOption === 'Contract') {
      this.getContracts();
    }

  }

}
