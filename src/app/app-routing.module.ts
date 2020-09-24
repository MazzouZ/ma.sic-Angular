import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TestComponent} from './master/test/test.component';
import {LoginComponent} from './master/login/login.component';
import {MasterComponent} from './master/master/master.component';
import {ActivityAreaComponent} from './gc/settings/activity-area/activity-area.component';
import {DocumentTypeComponent} from './gc/settings/document-type/document-type.component';
import {InvestmentTypeComponent} from './gc/settings/investment-type/investment-type.component';
import {StructureComponent} from './gc/settings/structure/structure.component';
import { ReferenceComponent } from './gc/reference/reference.component';
import { AddReferenceComponent } from './gc/reference/add-reference/add-reference.component';
import { DetailComponent } from './gc/reference/detail/detail.component';
import { EditReferenceComponent } from './gc/reference/edit-reference/edit-reference.component';
import { AddDelegReferenceComponent } from './gc/reference/add-deleg-reference/add-deleg-reference.component';
import { EditDelegReferenceComponent } from './gc/reference/edit-deleg-reference/edit-deleg-reference.component';
import { DetailDelegComponent } from './gc/reference/detail-deleg/detail-deleg.component';
import {DocumentComponent} from './gc/document/document.component';
import {AddDocumentComponent} from './gc/document/add-document/add-document.component';
import {EditDocumentComponent} from './gc/document/edit-document/edit-document.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', component: MasterComponent, children: [
      {path: 'activity-area', component: ActivityAreaComponent},
      {path: 'document-type', component: DocumentTypeComponent},
      {path: 'investment-type', component: InvestmentTypeComponent},
      {path: 'structure', component: StructureComponent},
      {path: 'dashboard',component : TestComponent},
      {path: 'reference',component : ReferenceComponent},
      {path: 'addReference',component : AddReferenceComponent},
      {path: 'editReference',component : EditReferenceComponent},
      {path: 'detailReference',component : DetailComponent},
      {path: 'addDelegReference',component : AddDelegReferenceComponent},
      {path: 'editDelegReference',component : EditDelegReferenceComponent},
      {path: 'detailDelegReference',component : DetailDelegComponent},
      {path: 'documents',component : DocumentComponent},
      {path: 'documents/add-document',component : AddDocumentComponent},
      {path: 'documents/edit-document',component : EditDocumentComponent},
    ]
  },
  {path: 'login', component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
