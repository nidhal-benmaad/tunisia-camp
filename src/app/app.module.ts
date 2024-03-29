import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';
import { ThemeModule } from '@theme/theme.module';
import { SharedModule } from '@shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { FormlyConfigModule } from './formly-config.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '@env/environment';

import {
  BASE_URL,
  httpInterceptorProviders,
  appInitializerProviders,
  AuthService,
  authInterceptorProviders,
  AuthInterceptorService,
} from '@core';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemDataService } from '@shared/in-mem/in-mem-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInterceptor } from '@core/interceptors/CustomInterceptor';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { camgroundReducer } from './ngRx/reducers/campground.reducer';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { formatedDate } from '@shared/utils/functions';
import { campsiteReducer } from './ngRx/reducers/campsite.reducer';
import { NgxStripeModule } from 'ngx-stripe';
import { reservationReducer } from './ngRx/reducers/reservation.reducer';
import { paymentReducer } from './ngRx/reducers/payment.reducer';
import { sharedReducer } from './ngRx/reducers/shared.reducer';

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Configure state persistence
    NgxStripeModule.forRoot(
      'pk_test_51NCPvQE1zTbpE1XrstSYo605AosZ3Ex16fbL3L4Uw0rRdbuz891xFpbX1iO6cRc62LdWDJSFwFt9hjl3CNANJDP4001FSThYst'
    ),
    StoreModule.forRoot(
      {
        campground: camgroundReducer,
        campsite: campsiteReducer,
        reservation: reservationReducer,
        payment: paymentReducer,
        shared: sharedReducer,
      },
      {
        metaReducers: [localStorageSyncReducer],
      }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    ThemeModule,
    RoutesModule,
    SharedModule,
    FormlyConfigModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // Demo purposes only for GitHub Pages
    HttpClientInMemoryWebApiModule.forRoot(InMemDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
    }),
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.baseUrl },
    httpInterceptorProviders,
    authInterceptorProviders,
    appInitializerProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['campground', 'campsite'], rehydrate: true })(reducer);
}
