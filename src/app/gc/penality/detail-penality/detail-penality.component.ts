import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../services/crud.service';
import {SharingService} from '../../services/sharing.service';
import {Penality} from '../penality.component';

@Component({
  selector: 'app-detail-penality',
  templateUrl: './detail-penality.component.html',
  styleUrls: ['./detail-penality.component.css']
})
export class DetailPenalityComponent implements OnInit {

  penality:Penality;
  constructor(private crudService: CrudService,
              private sharingService: SharingService) { }

  ngOnInit() {
    this.crudService.getlinkItem(this.sharingService.sharingValue._links.self.href+'?projection=inlinePenality').subscribe((data:any)=>{
      this.penality=data;
    },error => {
      console.log(error);
    });
  }

}
