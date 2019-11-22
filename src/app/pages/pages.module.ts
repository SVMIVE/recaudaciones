import { NgModule } from '@angular/core';
import { NbMenuModule, NbTreeGridModule, NbCardModule, NbInputModule, NbTableModule, NbButtonModule, NbWindowModule, NbIconModule, NbSelectModule, NbDatepickerModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ClienteComponent } from './cliente/cliente.component';
import { environment } from '../../environments/environment';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DocumentosComponent } from './documentos/documentos.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbTreeGridModule,
    NbCardModule,
    NbInputModule,
    NbTableModule,
    NbButtonModule,
    NbWindowModule.forRoot(environment.configWindow),
    NbEvaIconsModule,
    NbIconModule,
    NbSelectModule,
    NbDatepickerModule,
  ],
  declarations: [
    PagesComponent,
    ClienteComponent,
    DocumentosComponent,
  ],
})
export class PagesModule {
}
