import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { Error403Component } from './sessions/403.component';
import { Error404Component } from './sessions/404.component';
import { Error500Component } from './sessions/500.component';
import { authGuard } from '@core/authentication';
import { ClientLayoutComponent } from '@theme/client-layout/client-layout.component';
import { HomeComponent } from './home/home.component';
import { ReservationsComponent } from './admin-views/reservations/reservations.component';
import { PromotionComponent } from  './admin-views/promotion/promotion.component';
import {ProductComponent} from "./admin-views/product/product.component";
import {AjoutProductComponent} from "./admin-views/ajout-product/ajout-product.component";
import {UpdateProductComponent} from "./admin-views/update-product/update-product.component";
import {ListPromoComponent} from "./admin-views/list-promo/list-promo.component";
import {UpdatePromoComponent} from "./admin-views/update-promo/update-promo.component";
import {
  AffecterPromoToProductComponent
} from "./admin-views/affecter-promo-to-product/affecter-promo-to-product.component";
import {ListCategorieComponent} from "./admin-views/list-categorie/list-categorie.component";
import {AjoutCategorieComponent} from "./admin-views/ajout-categorie/ajout-categorie.component";
const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
      {path: 'reservations', component: ReservationsComponent},
      { path: 'listPromo/affecterPromoToProduct', component: AffecterPromoToProductComponent },
      { path: 'admin/promotion/listPromo', component: ListPromoComponent },
      {
        path: 'Categorie',
        component: ListCategorieComponent,
      },

      {
        path: 'Categorie/create',
        component: AjoutCategorieComponent,
      },
      {
        path: 'listPromo/createPromo',
        component: PromotionComponent,
      },
      {
        path: 'listPromo',
        component: ListPromoComponent,
      },
      {
        path: 'products',
        component: ProductComponent,
      },
      {
        path: 'products/:id/update',
        component: UpdateProductComponent,
      },
      {
        path: 'listPromo/:id/updatePromotion',
        component: UpdatePromoComponent,

      },
      {
        path: 'products/create',
        component: AjoutProductComponent,
      },
      {
        path: 'design',
        loadChildren: () => import('./design/design.module').then(m => m.DesignModule),
      },
      {
        path: 'material',
        loadChildren: () => import('./material/material.module').then(m => m.MaterialModule),
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.MediaModule),
      },
      {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule),
      },
      {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'permissions',
        loadChildren: () =>
          import('./permissions/permissions.module').then(m => m.PermissionsModule),
      },
      {
        path: 'utilities',
        loadChildren: () => import('./utilities/utilities.module').then(m => m.UtilitiesModule),
      },
    ],
  },
  {
    path: '',
    component: ClientLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
