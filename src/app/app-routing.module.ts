import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TestComponent} from './master/test/test.component';
import {LoginComponent} from './master/login/login.component';
import {MasterComponent} from './master/master/master.component';
import {ActivityAreaComponent} from './gc/settings/activity-area/activity-area.component';
import {DocumentTypeComponent} from './gc/settings/document-type/document-type.component';
import {InvestmentTypeComponent} from './gc/settings/investment-type/investment-type.component';
import {StructureComponent} from './gc/settings/structure/structure.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', component: MasterComponent, children: [
      {path: 'activity-area', component: ActivityAreaComponent},
      {path: 'document-type', component: DocumentTypeComponent},
      {path: 'investment-type', component: InvestmentTypeComponent},
      {path: 'structure', component: StructureComponent},
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
