/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbSelectModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbLayoutModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbCardModule,
  NbTreeGridModule,
  NbSpinnerModule,
  NbWindowModule,
} from '@nebular/theme';

import { NotadebitoComponent } from './pages/notadebito/notadebito.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PasswordValidationDirective } from './validations/password-validation.directive';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData, CurrencyPipe } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');
@NgModule({
  
  providers: [CurrencyPipe],
  declarations: [
    AppComponent,
     NotadebitoComponent,
     LoginComponent,
     PasswordValidationDirective,
     
    ],
  imports: [
    NbSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    ThemeModule.forRoot(),
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    MatTableModule,
    MatCheckboxModule,
    NbIconModule,
    NbCardModule,
    NbSpinnerModule,
    NbTreeGridModule,
    FormsModule,
    Ng2SmartTableModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(environment.configWindow),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
