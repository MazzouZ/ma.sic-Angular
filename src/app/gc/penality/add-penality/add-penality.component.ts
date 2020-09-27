import {Component, OnInit} from '@angular/core';
import {Document} from '../../document/document.component';
import {DocumentxType} from '../../settings/document-type/document-type.component';
import {CrudService} from '../../services/crud.service';
import {FileUploadService} from '../../services/file-upload.service';
import {Router} from '@angular/router';
import {Penality} from '../penality.component';

@Component({
  selector: 'app-add-penality',
  templateUrl: './add-penality.component.html',
  styleUrls: ['./add-penality.component.css']
})
export class AddPenalityComponent implements OnInit {

  favoriteOption: string = 'Contract';
  contractOrReference: string[] = ['Contract', 'Reference Delegator', 'Reference SDL'];
  data: Penality;
  penalityForId:number;
  list: any[];

  constructor(private crudService: CrudService,
              private router: Router) {
  }

  ngOnInit() {
    this.data = {amount: 0, patterns: '', status: ''};
    this.getContracts();
  }

  submit() {
    //console.log(this.data);
    this.crudService.addItemNoSubscribe('penalities', this.data).subscribe((response: any) => {
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
