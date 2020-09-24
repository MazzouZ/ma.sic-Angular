import { Component, OnInit } from '@angular/core';
import {Document} from '../document.component';
import {CrudService} from '../../services/crud.service';
import {FileUploadService} from '../../services/file-upload.service';
import {DocumentxType} from '../../settings/document-type/document-type.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

  data: Document;
  uploading: boolean=false;
  documentTypes : DocumentxType[];
  constructor(private crudService:CrudService, private fileUploadService:FileUploadService,private router:Router) { }

  ngOnInit() {
    this.data ={
      documentType:'',
      documentName:'',
      document: null,
      observations: ''
    };
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
    this.fileUploadService.uploadDocument(this.data).subscribe(data => {
      console.log(data);
      this.router.navigate(['/documents']);
    }, error => {
      console.log(error);
    });
  }
}
