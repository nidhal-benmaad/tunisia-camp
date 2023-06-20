import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';
import { Error403Component } from './sessions/403.component';
import { Error404Component } from './sessions/404.component';
import { Error500Component } from './sessions/500.component';
import { HomeComponent } from './home/home.component';
import { ReservationsComponent } from './admin-views/reservations/reservations.component';
import {PromotionComponent} from "./admin-views/promotion/promotion.component";
import {ProductComponent} from "./admin-views/product/product.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ListPromoComponent} from "./admin-views/list-promo/list-promo.component";
import {UpdateProductComponent} from "./admin-views/update-product/update-product.component";
import {AjoutProductComponent} from "./admin-views/ajout-product/ajout-product.component";
import {UpdatePromoComponent} from "./admin-views/update-promo/update-promo.component";
import {AffecterPromoToProductComponent} from "./admin-views/affecter-promo-to-product/affecter-promo-to-product.component";
import {ListCategorieComponent} from "./admin-views/list-categorie/list-categorie.component";

const COMPONENTS: any[] = [
  DashboardComponent,
  HomeComponent,
  ReservationsComponent,
  PromotionComponent,
  LoginComponent,
  RegisterComponent,
  Error403Component,
  Error404Component,
  Error500Component,
  ProductComponent,
  ListPromoComponent,
  UpdatePromoComponent
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule,CommonModule,
  [FormsModule]

    ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class RoutesModule {}
