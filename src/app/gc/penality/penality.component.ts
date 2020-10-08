import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CrudService} from '../services/crud.service';
import {EditStructureComponent} from '../settings/structure/edit-structure/edit-structure.component';
import {AddStructureComponent} from '../settings/structure/add-structure/add-structure.component';
import {Structure} from '../settings/structure/structure.component';
import {Router} from '@angular/router';
import {SharingService} from '../services/sharing.service';

export interface Penality {
  id?:number;
  amount:number;
  patterns:string;
  status:string;
  regulationDate?:number;
  amountRegulation?:number;
  numRecuRegulation?:string;
  pj?:string;
  observations?:string;
  sDLReference?:any;
  delegateReference?:any;
  contrat?:any;
}

@Component({
  selector: 'app-penality',
  templateUrl: './penality.component.html',
  styleUrls: ['./penality.component.css']
})
export class PenalityComponent implements OnInit {


  displayedColumns: string[] = ['amount','patterns','status', 'Actions'];
  dataSource = new MatTableDataSource<Penality>();
  tab: any;

  constructor(private crudService: CrudService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router,private sharingService:SharingService) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getPenalities();

  }

  getPenalities() {
    this.crudService.getItems('penalities').subscribe(
      data => {
        //console.log(data);
        // @ts-ignore
        let listMed: Penality[] = data._embedded.penalities;
        this.dataSource = new MatTableDataSource();
        this.dataSource = new MatTableDataSource(listMed);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      }
    );
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
  openModifyDialog(row) {
    this.sharingService.sharingValue=row;
    this.router.navigate(['/penalities/edit-penality']);
  }

//---------------------------------------------------------------------
  openAddDialog(): void {
    this.router.navigate(['/penalities/add-penality']);
  }

//---------------------------------------------------------------------
  deletePenality(row) {
    this.crudService.deleteItem(row);
    setTimeout(() => {
      this.getPenalities();
    }, 1000);
    this._snackBar.open('Element Deleted', '', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['snackbarDelete']
    });
  }

  openDetailsDialog(row: any) {
    this.sharingService.sharingValue=row;
    this.router.navigate(['/penalities/detail-penality']);
  }
}
