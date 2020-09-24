import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CrudService} from '../services/crud.service';
import {Router} from '@angular/router';
import {DocumentxType} from '../settings/document-type/document-type.component';
import {FileUploadService} from '../services/file-upload.service';
import {SharingService} from '../services/sharing.service';

export interface Document {
  id?: string;
  documentType: any;
  documentName: string;
  creationDate?: number;
  document: File;
  observations: string;
}


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  displayedColumns: string[] = ['documentName','documentType','observations','creationDate', 'Actions'];
  dataSource = new MatTableDataSource<Document>();
  tab: any;
  downloading: boolean=false;

  constructor(private crudService: CrudService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private fileUploadService:FileUploadService,
              private sharingService:SharingService) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getDocuments();

  }

  getDocuments() {
    this.crudService.getItems('documents?projection=inlineDocument').subscribe(
      (data:any) => {
        // @ts-ignore
        let listMed: Document[] = data._embedded.documents;
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
    //console.log(row);
    this.sharingService.sharingValue=row;
    this.router.navigate(['/documents/edit-document']);
  }

//---------------------------------------------------------------------
  openAddDialog(): void {
    this.router.navigate(['/documents/add-document']);
  }

//---------------------------------------------------------------------
  deleteDocument(row) {
    this.crudService.deleteItem(row);
    setTimeout(() => {
      this.getDocuments();
    }, 1000);
    this._snackBar.open('Element Deleted', '', {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['snackbarDelete']
    });
  }

  downloadFile(row: any) {
    this.downloading = true;
    this.fileUploadService.downloadDocument(row.document).subscribe(
      (response:any) => {
        let file = new Blob([response], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        this.downloading=false;
        window.open(fileURL);

      },
      error => {console.log(error);});
  }
}
