import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatButtonModule,
  MatListModule,
  MatIconModule,
  MatGridListModule,
  MatSidenavModule,
  MatExpansionModule,
  MatToolbarModule,
  MatTableModule,
  MatSelectModule,
  MatOptionModule,
  MatSnackBarModule,
  MatDialogModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatSortModule} from '@angular/material';

import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { ServisComponent } from './components/servis/servis.component';
import { ServisService } from './services/servis.services';
import { ServisDialogComponent } from './components/dialogs/servis-dialog/servis-dialog.component';
import { ModelComponent } from './components/model/model.component';
import { ModelService } from './services/model.services';
import { ModelDialogComponent } from './components/dialogs/model-dialog/model-dialog.component';


const Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'author', component: AuthorComponent},
  {path: 'servis', component: ServisComponent},
  {path: 'model', component: ModelComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    ServisComponent,
    ServisDialogComponent,
    ModelComponent,
    ModelDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatSortModule,
    RouterModule.forRoot(Routes)
  ],
  entryComponents: [
     ServisDialogComponent, ModelDialogComponent
  ],
  providers: [ServisService, ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
