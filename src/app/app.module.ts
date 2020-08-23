import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './master/footer/footer.component';
import { NavbarComponent } from './master/navbar/navbar.component';
import { SidebarComponent } from './master/sidebar/sidebar.component';
import { HeaderContentComponent } from './master/header-content/header-content.component';
import { ContentComponent } from './master/content/content.component';
import { TestComponent } from './master/test/test.component';
import { LoginComponent } from './master/login/login.component';
import { MasterComponent } from './master/master/master.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReferenceComponent } from './gc/reference/reference.component';
import { AddReferenceComponent } from './gc/reference/add-reference/add-reference.component';
import { EditReferenceComponent } from './gc/reference/edit-reference/edit-reference.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DetailComponent } from './gc/reference/detail/detail.component';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { AddDelegReferenceComponent } from './gc/reference/add-deleg-reference/add-deleg-reference.component';
import { EditDelegReferenceComponent } from './gc/reference/edit-deleg-reference/edit-deleg-reference.component';
import { DetailDelegComponent } from './gc/reference/detail-deleg/detail-deleg.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderContentComponent,
    ContentComponent,
    TestComponent,
    LoginComponent,
    MasterComponent,
    ReferenceComponent,
    AddReferenceComponent,
    EditReferenceComponent,
    DetailComponent,
    AddDelegReferenceComponent,
    EditDelegReferenceComponent,
    DetailDelegComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
