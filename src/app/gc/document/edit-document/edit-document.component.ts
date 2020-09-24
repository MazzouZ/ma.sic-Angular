import { Component, OnInit } from '@angular/core';
import {Document} from '../document.component';
import {DocumentxType} from '../../settings/document-type/document-type.component';
import {CrudService} from '../../services/crud.service';
import {FileUploadService} from '../../services/file-upload.service';
import {Router} from '@angular/router';
import {SharingService} from '../../services/sharing.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {

  data: Document;
  uploading: boolean=false;
  documentTypes : DocumentxType[];
  constructor(private crudService:CrudService,
              private fileUploadService:FileUploadService,
              private router:Router,
              private sharingService:SharingService) { }

  ngOnInit() {
    this.data = this.sharingService.sharingValue;
    this.getDocumentTypes();
  }
  getDocumentTypes(){
    this.crudService.getItems('documentTypes').subscribe((data:any) =>{
      this.documentTypes = data._embedded.documentTypes;
    },error => {
      console.log(error);
    });
  }
  handleFileInput(files: FileList) {
    console.log(files);
    this.data.document = files.item(0);
  }

  submit() {
    //console.log(this.data);
    this.uploading = true;
    this.fileUploadService.editDocument(this.data).subscribe(data => {
      console.log(data);
      this.router.navigate(['/documents']);
    }, error => {
      console.log(error);
    });
  }

}
