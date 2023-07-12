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
import { CarouselComponent } from '@shared/components/carousel/carousel.component';
import {UsersComponent} from "./admin-views/users/users.component";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";

const COMPONENTS: any[] = [
  DashboardComponent,
  HomeComponent,
  ReservationsComponent,
  CarouselComponent,
  LoginComponent,
  RegisterComponent,
  Error403Component,
  Error404Component,
  Error500Component,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
    imports: [SharedModule, RoutesRoutingModule, GoogleSigninButtonModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, UsersComponent],
})
export class RoutesModule {}
