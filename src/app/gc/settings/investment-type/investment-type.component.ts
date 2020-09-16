import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CrudService} from '../../services/crud.service';
import {EditActivityComponent} from '../activity-area/edit-activity/edit-activity.component';
import {AddActivityComponent} from '../activity-area/add-activity/add-activity.component';
import {ActivityArea} from '../activity-area/activity-area.component';
import {EditInvestmentTypeComponent} from './edit-investment-type/edit-investment-type.component';
import {AddInvestmentTypeComponent} from './add-investment-type/add-investment-type.component';

export interface Investment {
  id: number;
  label: string;
}

@Component({
  selector: 'app-investment-type',
  templateUrl: './investment-type.component.html',
  styleUrls: ['./investment-type.component.css']
})
export class InvestmentTypeComponent implements OnInit {

  displayedColumns: string[] = ['label', 'Actions'];
  dataSource = new MatTableDataSource<Investment>();
  tab: any;

  constructor(private crudService: CrudService,
              public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getInvestments();

  }

  getInvestments() {
    this.crudService.getItems('investmentTypes').subscribe(
      data => {
        // @ts-ignore
        let listMed: Investment[] = data._embedded.investmentTypes;
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
    const dialogRef = this.dialog.open(EditInvestmentTypeComponent, {
      width: '500px',
      data: {investmentType: row}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getInvestments();
      }, 1000);
    });
  }

//---------------------------------------------------------------------
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddInvestmentTypeComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getInvestments();
      }, 1000);
    });
  }

//---------------------------------------------------------------------
  deleteinvestment(row) {
    this.crudService.deleteItem(row);
    setTimeout(() => {
      this.getInvestments();
    }, 1000);
    this._snackBar.open('Element Deleted', '', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['snackbarDelete']
    });
  }

}
