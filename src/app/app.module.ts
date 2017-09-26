import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MdToolbarModule, MdIconModule, MdTableModule, MdSnackBarModule, MdSortModule, MdButtonModule, MdFormFieldModule, MdInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { TableComponent } from './components/table/table.component';
import { DataService } from 'app/services/data.service';
import { StorageService } from 'app/services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MdTableModule,
    MdToolbarModule,
    MdIconModule,
    MdSnackBarModule,
    MdSortModule,
    MdButtonModule,
    MdFormFieldModule,
    MdInputModule
  ],
  providers: [DataService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
