import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource, NbToastrService } from '@nebular/theme';

import { FormControl, FormsModule } from '@angular/forms';
import { ClienteService, WCliente } from '../../servicio/sysbase/cliente.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Rif: string;
  Razonsocial: string;
  Nit: string;
  Codigo: string;
  Acciones?: boolean;
  //items?: number;
}


@Component({
  selector: 'ngx-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {


  @ViewChild('escClose', { read: TemplateRef  , static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;

  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  customColumn = 'Rif';
  defaultColumns = [ 'Razonsocial', 'Nit', 'Codigo', 'Acciones' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  codigox = ""
  razonSocialx = ""
  rifx  = ""
  nitx  = ""
  tipox = ""
  estatusx = ""
  actividadx = ""
  declararx  = ""
  fechaIniciox = ""
  fechaModificionx = ""
  emailx = ""
  telefonox = ""
  codigoPostalx = ""
  direccionx = ""


  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private cliente : ClienteService, private windowService: NbWindowService) {
    
  }
  ngOnInit(){
    this.obtenerDatos() 
  }
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  obtenerDatos(){

    this.cliente.listar().subscribe(
      (resp) => {
        resp.forEach(d => {
          console.log(d)
          
            this.data.push({
                data: { Rif: d.cedula_rif, Razonsocial: d.razon_social, Nit: d.nit, Codigo: d.auxiliar_contable },      
            });
          
          this.dataSource = this.dataSourceBuilder.create(this.data);
        });
        //this.router.navigateByUrl("/pages/")
        //this.loading = false;
      },
      (error) => {
        //this.loading = false;
        console.error("No se logro conectar...")
      }
    )
  }


  private data: TreeNode<FSEntry>[] = [ ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 10;
    const nextColumnStep = 10;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }



  openWindowWithBackdrop() {
    this.windowService.open(
      this.escCloseTemplate,
      { title: 'Datos del cliente', hasBackdrop: true },
    );
  }


  add(){
    var wCli : WCliente = {
      Codigo: this.codigox,
      RazonSocial: this.razonSocialx,
      Rif: this.rifx,
      Nit : this.nitx,
      Tipo : this.tipox,
      Estatus: this.estatusx,
      Actividad: this.actividadx,
      Declarar: this.declararx,
      FechaInicio : this.fechaIniciox,
      FechaModificacion: this.fechaModificionx,
      Email: this.emailx,
      Telefono: this.telefonox,
      CodigoPostal: this.codigoPostalx,
      Direccion: this.direccionx
    }
    console.log(wCli)
    //this.cliente.add(wCli)

  }

  actualizar(){

  }


 
}
