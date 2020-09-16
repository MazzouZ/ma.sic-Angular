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
import { ActivityAreaComponent } from './gc/settings/activity-area/activity-area.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatChipsModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule, MatTableModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { EditActivityComponent } from './gc/settings/activity-area/edit-activity/edit-activity.component';
import { AddActivityComponent } from './gc/settings/activity-area/add-activity/add-activity.component';
import { StructureComponent } from './gc/settings/structure/structure.component';
import { EditStructureComponent } from './gc/settings/structure/edit-structure/edit-structure.component';
import { AddStructureComponent } from './gc/settings/structure/add-structure/add-structure.component';
import { DocumentTypeComponent } from './gc/settings/document-type/document-type.component';
import { AddDocumentTypeComponent } from './gc/settings/document-type/add-document-type/add-document-type.component';
import { EditDocumentTypeComponent } from './gc/settings/document-type/edit-document-type/edit-document-type.component';
import { InvestmentTypeComponent } from './gc/settings/investment-type/investment-type.component';
import { AddInvestmentTypeComponent } from './gc/settings/investment-type/add-investment-type/add-investment-type.component';
import { EditInvestmentTypeComponent } from './gc/settings/investment-type/edit-investment-type/edit-investment-type.component';
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
    ActivityAreaComponent,
    EditActivityComponent,
    AddActivityComponent,
    StructureComponent,
    EditStructureComponent,
    AddStructureComponent,
    DocumentTypeComponent,
    AddDocumentTypeComponent,
    EditDocumentTypeComponent,
    InvestmentTypeComponent,
    AddInvestmentTypeComponent,
    EditInvestmentTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatSortModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [AddActivityComponent],
  entryComponents: [AddActivityComponent,EditActivityComponent,AddDocumentTypeComponent,AddInvestmentTypeComponent,AddStructureComponent,EditDocumentTypeComponent,EditInvestmentTypeComponent,EditStructureComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
