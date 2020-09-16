import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CrudService} from '../../services/crud.service';
import {EditStructureComponent} from './edit-structure/edit-structure.component';
import {AddStructureComponent} from './add-structure/add-structure.component';
export interface Structure{
  id: number;
  label: string;
}
@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {


  displayedColumns: string[] = ['label', 'Actions'];
  dataSource = new MatTableDataSource<Structure>();
  tab: any;

  constructor(private crudService: CrudService,
              public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getStructures();

  }

  getStructures() {
    this.crudService.getItems('structures').subscribe(
      data => {
        console.log(data);
        // @ts-ignore
        let listMed: Structure[] = data._embedded.structures;
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
    const dialogRef = this.dialog.open(EditStructureComponent, {
      width: '500px',
      data: {structure: row}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getStructures();
      }, 1000);
    });
  }

//---------------------------------------------------------------------
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddStructureComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getStructures();
      }, 1000);
    });
  }

//---------------------------------------------------------------------
  deleteStructure(row) {
    this.crudService.deleteItem(row);
    setTimeout(() => {
      this.getStructures();
    }, 1000);
    this._snackBar.open('Element Deleted', '', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['snackbarDelete']
    });
  }

}
