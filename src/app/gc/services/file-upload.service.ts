import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Document} from '../document/document.component';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  url='http://localhost:8085/';
  constructor(private httpClient: HttpClient) { }

  uploadDocument(data:Document){

    const formData: FormData = new FormData();

    formData.append('document', data.document, data.document.name);
    formData.append('documentName', data.documentName);
    formData.append('documentType', data.documentType);
    formData.append('observations', data.observations);

    return this.httpClient.post(this.url+'documents/addDoc', formData);
  }
  editDocument(data:Document){

    const formData: FormData = new FormData();

    if (typeof data.document != "string")
      formData.append('document', data.document, data.document.name);
    else data.document = null;

    formData.append('documentName', data.documentName);
    if(typeof data.documentType === "string")
      formData.append('documentType', data.documentType);
    else
      formData.append('documentType', data.documentType.label);

    formData.append('observations', data.observations);
    formData.append('id', data.id);

    return this.httpClient.post(this.url+'documents/editDoc', formData);
  }

  downloadDocument(filename){
    const httpOptions = {
      'responseType'  : 'blob' as 'json'
    };
    return this.httpClient.get(this.url+'/documents/getDoc/'+filename,
      httpOptions);
  }
}
