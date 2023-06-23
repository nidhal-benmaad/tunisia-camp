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
import { UsersComponent } from './admin-views/users/users.component';
import { CampsitesComponent } from './client-views/campsites/campsites.component';
import { BookingComponent } from './client-views/booking/booking.component';
import { HeaderFilterComponent } from '@shared/components/header-filter/header-filter.component';

const COMPONENTS: any[] = [
  DashboardComponent,
  HomeComponent,
  ReservationsComponent,
  HeaderFilterComponent,
  UsersComponent,
  CampsitesComponent,
  BookingComponent,
  CarouselComponent,
  LoginComponent,
  RegisterComponent,
  Error403Component,
  Error404Component,
  Error500Component,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, RoutesRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class RoutesModule {}
