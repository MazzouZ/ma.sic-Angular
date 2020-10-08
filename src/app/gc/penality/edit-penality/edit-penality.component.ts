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
  data: any;
  list: any[];

  constructor(private crudService: CrudService,
              private router: Router,
              private sharingService: SharingService) {
  }

  ngOnInit() {
    this.data = this.sharingService.sharingValue;
    console.log(this.data)
  }

  submit() {
    this.crudService.updateItemNoSubscribe(this.data).subscribe((response: any) => {

      this.router.navigate(['/penalities']);
    }, error => {
      console.log(error);
    });
  }

}
