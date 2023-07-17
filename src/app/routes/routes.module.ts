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
import { CarouselComponent } from '@shared/components/carousel/carousel.component';
import{ListProductFrontComponent} from "./client-views/list-product-front/list-product-front.component";
import {ProductDetailsComponentComponent} from "./client-views/product-details-component/product-details-component.component";
import {
  PaymentMethodFormComponentComponent
} from "./client-views/payment-method-form-component/payment-method-form-component.component";
import {OrderDetailsComponentComponent} from "./client-views/order-details-component/order-details-component.component";
import {EditProductComponent} from "./admin-views/product/edit/edit.component";
import {
  DesaffectationPromoProductComponent
} from "./admin-views/desaffectation-promo-product/desaffectation-promo-product.component";
import {UpdateCategoryComponent} from "./admin-views/update-category/update-category.component";
import {OrderDetail} from "../model/OrderDetails";
import {ListOrderComponent} from "./admin-views/list-order/list-order.component";
import {ListOrderDetailsAdminService} from "./admin-views/list-order-details-admin.service";
import {
  ListOrderDetailsAdminComponent
} from "./admin-views/list-order-details-admin/list-order-details-admin.component";
import {UpdateOrderDetailsComponent} from "./admin-views/update-order-details/update-order-details.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

const COMPONENTS: any[] = [
  DashboardComponent,
  HomeComponent,
  ReservationsComponent,
  PromotionComponent,
  CarouselComponent,
  LoginComponent,
  RegisterComponent,
  Error403Component,
  Error404Component,
  Error500Component,
  ProductComponent,
  ListPromoComponent,
  UpdatePromoComponent,
  UpdateCategoryComponent,
  ListProductFrontComponent,
  ProductDetailsComponentComponent,
  PaymentMethodFormComponentComponent,
  OrderDetailsComponentComponent,
  EditProductComponent,
  DesaffectationPromoProductComponent,
  ListOrderComponent,
  ListOrderDetailsAdminComponent,
  UpdateOrderDetailsComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule,CommonModule,
  [FormsModule],  MatCardModule,
    MatIconModule,

    ],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class RoutesModule {}
