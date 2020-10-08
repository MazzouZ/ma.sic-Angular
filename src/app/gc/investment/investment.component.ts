import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { SharingService } from '../services/sharing.service';

export interface InvestmentElement {
  id: number;
  montant: number;
  objectifs: String;
  status: String;
  pj: String;
  observations: String;
}
@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  displayedColumns: string[] = ['montant', 'status', 'pj','Actions'];
  dataSource=new MatTableDataSource<InvestmentElement>();

  constructor(private crudService:CrudService,
    private _snackBar: MatSnackBar,private route:Router,private interactionService: SharingService) { }

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    ngOnInit() {
          
      setTimeout(()=>{
        this.getInv();
      },1000);
}
getInv() {
  this.crudService.getItems('investissements').subscribe(
      (data) => {
        // @ts-ignore
        let listinv:ReferenceDelegElement[]=data._embedded.investissements;
        this.dataSource=new MatTableDataSource();
        this.dataSource = new MatTableDataSource(listinv);
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
this.route.navigate(['/addInvestment']);
}
//---------------------------------------------------------------------
redirectEdit(row){
  this.interactionService.sharingValue = row;
  this.route.navigate(['/editInvestment']);
}
//---------------------------------------------------------------------
detailInv(row){
  this.interactionService.sharingValue = row;
  this.route.navigate(['/detailInvestment']);
}
//---------------------------------------------------------------------
deleteInv(row){
  this.crudService.deleteItem(row);
  setTimeout(()=>{
    this.getInv();
  },1000);
  this._snackBar.open('Element Deleted',"",{
    duration: 2000,
    verticalPosition: 'top',
    panelClass: ['snackbarDelete']
  });
}

}
