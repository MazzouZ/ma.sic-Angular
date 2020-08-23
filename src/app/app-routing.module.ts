import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './master/test/test.component';
import { LoginComponent } from './master/login/login.component';
import { MasterComponent } from './master/master/master.component';
import { ReferenceComponent } from './gc/reference/reference.component';
import { AddReferenceComponent } from './gc/reference/add-reference/add-reference.component';
import { DetailComponent } from './gc/reference/detail/detail.component';
import { EditReferenceComponent } from './gc/reference/edit-reference/edit-reference.component';
import { AddDelegReferenceComponent } from './gc/reference/add-deleg-reference/add-deleg-reference.component';
import { EditDelegReferenceComponent } from './gc/reference/edit-deleg-reference/edit-deleg-reference.component';
import { DetailDelegComponent } from './gc/reference/detail-deleg/detail-deleg.component';

const routes: Routes = [
  {path: '',redirectTo : 'login',pathMatch : 'full'},
  {path: '',component : MasterComponent,children :[
  {path: 'dashboard',component : TestComponent},
  {path: 'reference',component : ReferenceComponent},
  {path: 'addReference',component : AddReferenceComponent},
  {path: 'editReference',component : EditReferenceComponent},
  {path: 'detailReference',component : DetailComponent},
  {path: 'addDelegReference',component : AddDelegReferenceComponent},
  {path: 'editDelegReference',component : EditDelegReferenceComponent},
  {path: 'detailDelegReference',component : DetailDelegComponent},
                                                  ]
},
  {path: 'login',component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
