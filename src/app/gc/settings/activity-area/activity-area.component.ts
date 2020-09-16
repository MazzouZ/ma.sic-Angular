import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CrudService} from '../../services/crud.service';
import {EditActivityComponent} from './edit-activity/edit-activity.component';
import {AddActivityComponent} from './add-activity/add-activity.component';


export interface ActivityArea {
  id: number;
  label: string;
}

@Component({
  selector: 'app-activity-area',
  templateUrl: './activity-area.component.html',
  styleUrls: ['./activity-area.component.css']
})
export class ActivityAreaComponent implements OnInit {


  displayedColumns: string[] = ['label', 'Actions'];
  dataSource = new MatTableDataSource<ActivityArea>();
  tab: any;

  constructor(private crudService: CrudService,
              public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getActivityAreas();

  }

  getActivityAreas() {
    this.crudService.getItems('activityAreas').subscribe(
      data => {
        // @ts-ignore
        let listMed: ActivityAreaElement[] = data._embedded.activityAreas;
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
    const dialogRef = this.dialog.open(EditActivityComponent, {
      width: '500px',
      data: {activityArea: row}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getActivityAreas();
      }, 1000);
    });
  }

//---------------------------------------------------------------------
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getActivityAreas();
      }, 1000);
    });
  }

//---------------------------------------------------------------------
  deleteActivity(row) {
    this.crudService.deleteItem(row);
    setTimeout(() => {
      this.getActivityAreas();
    }, 1000);
    this._snackBar.open('Element Deleted', '', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['snackbarDelete']
    });
  }

}
