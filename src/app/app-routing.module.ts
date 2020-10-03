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
import {PenalityComponent} from './gc/penality/penality.component';
import {AddPenalityComponent} from './gc/penality/add-penality/add-penality.component';
import {EditPenalityComponent} from './gc/penality/edit-penality/edit-penality.component';
import {DetailPenalityComponent} from './gc/penality/detail-penality/detail-penality.component';
import { ContractComponent } from './gc/contract/contract.component';
import { AddContractDialogeComponent } from './gc/contract/add-contract-dialoge/add-contract-dialoge.component';
import { EditContractDialogeComponent } from './gc/contract/edit-contract-dialoge/edit-contract-dialoge.component';
import { DetailContractComponent } from './gc/contract/detail-contract/detail-contract.component';
import { AddInvestmentComponent } from './gc/investment/add-investment/add-investment.component';
import { EditInvestmentComponent } from './gc/investment/edit-investment/edit-investment.component';
import { DetailInvestmentComponent } from './gc/investment/detail-investment/detail-investment.component';
import { InvestmentComponent } from './gc/investment/investment.component';

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
      {path: 'penalities',component : PenalityComponent},
      {path: 'penalities/add-penality',component : AddPenalityComponent},
      {path: 'penalities/edit-penality',component : EditPenalityComponent},
      {path: 'penalities/detail-penality',component : DetailPenalityComponent},
      {path: 'contract',component : ContractComponent},
      {path: 'addContract',component : AddContractDialogeComponent},
      {path: 'editContract',component : EditContractDialogeComponent},
      {path: 'detailCont',component : DetailContractComponent},
      {path: 'Investment',component : InvestmentComponent},
      {path: 'addInvestment',component : AddInvestmentComponent},
      {path: 'editInvestment',component : EditInvestmentComponent},
      {path: 'detailInvestment',component : DetailInvestmentComponent},
    ]
  },
  
  {path: 'login',component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
