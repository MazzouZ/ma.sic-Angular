import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditContractDialogeComponent } from './edit-contract-dialoge/edit-contract-dialoge.component';
import { AddContractDialogeComponent } from './add-contract-dialoge/add-contract-dialoge.component';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';

export interface ContractElement {
  id: number;
  numContrat: String;
  titleContract: String;
  contractObject: String;
  effectiveDate: number;
  endDate: number;
  sector : String;
  contractAmount: String;
  numMarket: String;
  pi: String;
  observations: String;
}

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  displayedColumns: string[] = ['numContrat', 'titleContract', 'contractObject', 'sector','Actions'];
  dataSource=new MatTableDataSource<ContractElement>();

  constructor(private crudService:CrudService,
    private _snackBar: MatSnackBar,private route:Router,private interactionService: SharingService) { }

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
    ngOnInit() {
          
          setTimeout(()=>{
            this.getCont();
          },1000);
    }
    getCont() {
      this.crudService.getItems('contrats').subscribe(
          (data) => {
            // @ts-ignore
            let listcontrats:ReferenceDelegElement[]=data._embedded.contrats;
            this.dataSource=new MatTableDataSource();
            this.dataSource = new MatTableDataSource(listcontrats);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },error => {
            console.log(error);
          });
    }
    //---------------------------------------------------------------------
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
   //---------------------------------------------------------------------
  redirectAdd(){
    this.route.navigate(['/addContract']);
  }
    //---------------------------------------------------------------------
    redirectEdit(row){
      this.interactionService.sharingValue = row;
      this.route.navigate(['/editContract']);
    }
    //---------------------------------------------------------------------
    detailCont(row){
      this.interactionService.sharingValue = row;
      this.route.navigate(['/detailCont']);
    }
    //---------------------------------------------------------------------
    deleteCont(row){
      this.crudService.deleteItem(row);
      setTimeout(()=>{
        this.getCont();
      },1000);
      this._snackBar.open('Element Deleted',"",{
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['snackbarDelete']
      });
    }

}
