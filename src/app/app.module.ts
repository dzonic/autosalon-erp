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
  MatRadioModule,
  MatSortModule
} from '@angular/material';

import { MatCardModule } from '@angular/material/card';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';

import { LoginComponent } from './components/core/login/login.component';

import { AuthorComponent } from './components/core/author/author.component';
import { ServisComponent } from './components/servis/servis.component';
import { ServisService } from './services/servis.services';
import { ServisDialogComponent } from './components/dialogs/servis-dialog/servis-dialog.component';
import { ModelComponent } from './components/model/model.component';
import { ModelService } from './services/model.services';
import { ModelDialogComponent } from './components/dialogs/model-dialog/model-dialog.component';
import { TipAutomobilaComponent } from './components/tipautomobila/tipautomobila.component';
import { TipAutomobilaService } from './services/tipautomobila.services';
import { TipAutomobilaDialogComponent } from './components/dialogs/tipautomobila-dialog/tipautomobila-dialog.component';
import { OsiguravajucaKucaComponent } from './components/osiguravajucakuca/osiguravajucakuca.component';
import { OsiguravajucaKucaService } from './services/osiguravajucakuca.services';
import { OsiguravajucaKucaDialogComponent } from './components/dialogs/osiguravajucakuca-dialog/osiguravajucakuca-dialog.component';
import { MarkaComponent } from './components/marka/marka.component';
import { MarkaService } from './services/marka.services';
import { MarkaDialogComponent } from './components/dialogs/marka-dialog/marka-dialog.component';



const Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},

  {path: 'login', component: LoginComponent},

  {path: 'author', component: AuthorComponent},
  {path: 'servis', component: ServisComponent},
  {path: 'model', component: ModelComponent},
  {path: 'osiguravajucakuca', component: OsiguravajucaKucaComponent},
  {path: 'tipautomobila', component: TipAutomobilaComponent},
  {path: 'marka', component: MarkaComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    AuthorComponent,
    ServisComponent,
    ServisDialogComponent,
    ModelComponent,
    ModelDialogComponent,
    TipAutomobilaComponent,
    TipAutomobilaDialogComponent,
    OsiguravajucaKucaComponent,
    OsiguravajucaKucaDialogComponent,
    MarkaComponent,
    MarkaDialogComponent
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
    FormsModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forRoot(Routes)
  ],
  entryComponents: [
     ServisDialogComponent, ModelDialogComponent, TipAutomobilaDialogComponent, OsiguravajucaKucaDialogComponent,
     MarkaDialogComponent
  ],
  providers: [ServisService, ModelService, TipAutomobilaService, OsiguravajucaKucaService,
  MarkaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
