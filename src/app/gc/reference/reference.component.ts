import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from '../services/crud.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';

export interface ReferenceElement {
  id:number;
  socialReason:String;
  publicLiability:String;
  taxIdentification:String;
  commonCompanyIdentifier:String;
  numCnss:String;
  adresse:String;
  telephone:String;
  fax:String;
  email:String;
  capitale:number;
  capitalPerShareholder:number;
  activitySector:String;
}

export interface ReferenceDelegElement {
  id:number;
  socialReason:String;
  publicLiability:String;
  taxIdentification:String;
  commonCompanyIdentifier:String;
  numCnss:String;
  adresse:String;
  telephone:String;
  fax:String;
  email:String;
  capitale:number;
  capitalPerShareholder:number;
  activitySector:String;
  foreignCompanySubsidiary:boolean;
}

export interface ManagerElement{
  id:number;
  name:String;
  firstname:String;
  tel:String;
  mail:String;
}

export interface ParentCompElement{
  id:number;
  socialReason:String;
  city:String;
  activitySector:String;
}

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {
  displayedColumns: string[] = ['id', 'socialReason', 'publicLiability', 'taxIdentification',
  'commonCompanyIdentifier','Actions'];
  //,'numCnss','adresse','telephone','fax','email','capitale','capitalPerShareholder','activitySector'
  dataSource=new MatTableDataSource<ReferenceElement>();
  dataSource2=new MatTableDataSource<ReferenceDelegElement>();
  constructor(private crudService:CrudService,private route:Router,private interactionService: SharingService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    setTimeout(()=>{
      this.getReferenceSDL();
      this.getReferenceDeleg();
    },1000);
    
  }

  getReferenceSDL() {
    this.crudService.getItems('sDLReferences').subscribe(
        (data) => {
          // @ts-ignore
          let listRef:ReferenceElement[]=data._embedded.sDLReferences;
          this.dataSource=new MatTableDataSource();
          this.dataSource = new MatTableDataSource(listRef);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },error => {
          console.log(error);
        });
  }
  //---------------------------------------------------------------------
  getReferenceDeleg() {
    this.crudService.getItems('delegateReferences').subscribe(
        (data) => {
          // @ts-ignore
          let listRefDeleg:ReferenceDelegElement[]=data._embedded.delegateReferences;
          this.dataSource2=new MatTableDataSource();
          this.dataSource2 = new MatTableDataSource(listRefDeleg);
          this.dataSource2.paginator = this.paginator;
          this.dataSource2.sort = this.sort;
        },error => {
          console.log(error);
        });
  }
  //---------------------------------------------------------------------
  deleteRef(row) {
    this.crudService.deleteItem(row);
    setTimeout(() => {
      this.getReferenceSDL();
      this.getReferenceDeleg();
    }, 500);
  }
  //---------------------------------------------------------------------
  redirectAdd(){
    this.route.navigate(['/addReference']);
  }
  redirectDelegAdd(){
    this.route.navigate(['/addDelegReference']);
  }
  //---------------------------------------------------------------------
  redirectEdit(row){
    this.interactionService.sharingValue = row;
    this.route.navigate(['/editReference']);
  }
  redirectDelegEdit(row){
    this.interactionService.sharingValue = row;
    this.route.navigate(['/editDelegReference']);
  }
  //---------------------------------------------------------------------
  detailRef(row){
    this.interactionService.sharingValue = row;
    this.route.navigate(['/detailReference']);
  }
  detailDelegRef(row){
    this.interactionService.sharingValue = row;
    this.route.navigate(['/detailDelegReference']);
  }
  //---------------------------------------------------------------------
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

}
