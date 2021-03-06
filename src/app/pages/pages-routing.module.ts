import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ClienteComponent } from './cliente/cliente.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { BancosComponent } from './bancos/bancos.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ConceptoComponent } from './concepto/concepto.component';
import { MonedaComponent } from './moneda/moneda.component';
import { PagadoresComponent } from './pagadores/pagadores.component';
import { ControlComponent } from './control/control.component';
import { PagosComponent } from './pagos/pagos.component';
import {MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReporteComponent } from './reporte/reporte.component';
import { SalirComponent } from './salir/salir.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'tasa',
      component: DashboardComponent,
    },
    {
      path: 'reporte',
      component: ReporteComponent,
    },
    {
      path: 'pagos',
      component: PagosComponent,
    },
    {
      path: 'cliente',
      component: ClienteComponent,
    },
    {
      path: 'documentos',
      component: DocumentosComponent,
    },
    {
      path: 'bancos',
      component: BancosComponent,
    },
    {
      path: 'actividades',
      component: ActividadesComponent,
    },
    {
      path: 'servicios',
      component: ServiciosComponent,
    },
    {
      path: 'concepto',
      component: ConceptoComponent,
    },
    {
      path: 'moneda',
      component: MonedaComponent,
    },
    {
      path: 'pagadores',
      component: PagadoresComponent,
    },
    {
      path: 'control',
      component: ControlComponent,
    },
    {
      path: 'salir',
      component: SalirComponent,
    },
    {
      path: '',
      redirectTo: 'tasa',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes),

    MatTableModule,
    MatCheckboxModule],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
