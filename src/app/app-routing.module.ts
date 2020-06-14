import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { StanjeComponent } from './components/stanje/stanje.component';
import { KorisnikComponent } from './components/korisnik/korisnik.component';
import { RacunComponent } from './components/racun/racun.component';
import { ArtiklComponent } from './components/artikl/artikl.component';
import { ProdavnicaComponent } from './components/prodavnica/prodavnica.component';
import { DobavljacComponent } from './components/dobavljac/dobavljac.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { AuthGuard } from './services/auth.guard';
import { Role } from './models/RoleEnum';

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'stanje', component: StanjeComponent, canActivate: [AuthGuard] },
  {
    path: 'korisnik',
    component: KorisnikComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Administrator] },
  },
  {
    path: 'racun',
    component: RacunComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Administrator] },
  },
  {
    path: 'artikl',
    component: ArtiklComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Administrator] },
  },
  {
    path: 'prodavnica',
    component: ProdavnicaComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Administrator] },
  },
  {
    path: 'dobavljac',
    component: DobavljacComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Administrator] },
  },
  {
    path: 'porudzbina',
    component: PorudzbinaComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Administrator, Role.Menadzer] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
