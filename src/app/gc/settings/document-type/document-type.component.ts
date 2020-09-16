import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CrudService} from '../../services/crud.service';
import {EditDocumentTypeComponent} from './edit-document-type/edit-document-type.component';
import {AddDocumentTypeComponent} from './add-document-type/add-document-type.component';

export interface DocumentxType {
  id: number;
  label: string;
}

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.css']
})
export class DocumentTypeComponent implements OnInit {

  displayedColumns: string[] = ['label', 'Actions'];
  dataSource = new MatTableDataSource<DocumentxType>();
  tab: any;

  constructor(private crudService: CrudService,
              public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getDocumentTypes();

  }

  getDocumentTypes() {
    this.crudService.getItems('documentTypes').subscribe(
      data => {
        // @ts-ignore
        let listMed: DocumentxType[] = data._embedded.documentTypes;
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
    const dialogRef = this.dialog.open(EditDocumentTypeComponent, {
      width: '500px',
      data: {documentType: row}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getDocumentTypes();
      }, 1000);
    });
  }

//---------------------------------------------------------------------
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDocumentTypeComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getDocumentTypes();
      }, 1000);
    });
  }

//---------------------------------------------------------------------
  deleteDocument(row) {
    this.crudService.deleteItem(row);
    setTimeout(() => {
      this.getDocumentTypes();
    }, 1000);
    this._snackBar.open('Element Deleted', '', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['snackbarDelete']
    });
  }

}
