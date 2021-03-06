import { NgModule } from '@angular/core';
import {
  NbMenuModule,
  NbTreeGridModule,
  NbCardModule,
  NbInputModule,
  NbTableModule,
  NbButtonModule,
  NbWindowModule,
  NbIconModule,
  NbSelectModule,
  NbDatepickerModule,
  NbToastrModule,
  NbStepperModule,
  NbTabsetModule,
  NbSpinnerModule,
  NbSearchModule} from '@nebular/theme';

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
import { BancosComponent } from './bancos/bancos.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { FormsModule } from '@angular/forms';
import { ConceptoComponent } from './concepto/concepto.component';
import { MonedaComponent } from './moneda/moneda.component';
import { PagadoresComponent } from './pagadores/pagadores.component';
import { ControlComponent } from './control/control.component';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { PagosComponent } from './pagos/pagos.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {NgxPrintModule} from 'ngx-print';
import { ReporteComponent } from './reporte/reporte.component';
import { TabsetWidthComponent } from './reporte/tabs/tabs.component';
import { StepperComponent } from './reporte/stepper/stepper.component';
import { SalirComponent } from './salir/salir.component';
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
    FormsModule,
    NbToastrModule,
    MatTableModule,
    MatCheckboxModule,
    NgxPrintModule,
    NbTabsetModule,
    NbStepperModule,
    NbSpinnerModule,
    NbSearchModule,
  ],
  declarations: [
    PagesComponent,
    ClienteComponent,
    DocumentosComponent,
    BancosComponent,
    ActividadesComponent,
    ServiciosComponent,
    ConceptoComponent,
    MonedaComponent,
    PagadoresComponent,
    ControlComponent,
    SeguridadComponent,
    PagosComponent,
    ReporteComponent,
    TabsetWidthComponent,
    StepperComponent,
    SalirComponent,
  ],
})
export class PagesModule {
}
