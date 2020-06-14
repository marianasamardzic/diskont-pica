//others
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angular-material
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StanjeComponent } from './components/stanje/stanje.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { KorisnikComponent } from './components/korisnik/korisnik.component';
import { RacunComponent } from './components/racun/racun.component';
import { AdministratorComponent } from './components/korisnik/administrator/administrator.component';
import { AdministratorDialogComponent } from './components/korisnik/administrator/administrator-dialog/administrator-dialog.component';
import { MenadzerComponent } from './components/korisnik/menadzer/menadzer.component';
import { MenadzerDialogComponent } from './components/korisnik/menadzer/menadzer-dialog/menadzer-dialog.component';
import { ZaposleniComponent } from './components/korisnik/zaposleni/zaposleni.component';
import { ZaposleniDialogComponent } from './components/korisnik/zaposleni/zaposleni-dialog/zaposleni-dialog.component';
import { ArtiklComponent } from './components/artikl/artikl.component';
import { ArtiklDialogComponent } from './components/artikl/artikl-dialog/artikl-dialog.component';
import { ProdavnicaComponent } from './components/prodavnica/prodavnica.component';
import { ProdavnicaDialogComponent } from './components/prodavnica/prodavnica-dialog/prodavnica-dialog.component';
import { StavkaRacunaComponent } from './components/stavka-racuna/stavka-racuna.component';
import { DobavljacComponent } from './components/dobavljac/dobavljac.component';
import { DobavljacDialogComponent } from './components/dobavljac/dobavljac-dialog/dobavljac-dialog.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { StavkaPorudzbineComponent } from './components/stavka-porudzbine/stavka-porudzbine.component';
import { AddPorudzbinaDialogComponent } from './components/stanje/add-porudzbina-dialog/add-porudzbina-dialog.component';
import { AddRacunDialogComponent } from './components/stanje/add-racun-dialog/add-racun-dialog.component'





@NgModule({
  declarations: [
    AppComponent,
    StanjeComponent,
    AuthenticationComponent,
    KorisnikComponent,
    RacunComponent,
    AdministratorComponent,
    AdministratorDialogComponent,
    MenadzerComponent,
    MenadzerDialogComponent,
    ZaposleniComponent,
    ZaposleniDialogComponent,
    ArtiklComponent,
    ArtiklDialogComponent,
    ProdavnicaComponent,
    ProdavnicaDialogComponent,
    StavkaRacunaComponent,
    DobavljacComponent,
    DobavljacDialogComponent,
    PorudzbinaComponent,
    StavkaPorudzbineComponent,
    AddPorudzbinaDialogComponent,
    AddRacunDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
