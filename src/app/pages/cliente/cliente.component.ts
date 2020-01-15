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
  selectedItem: string;
  selectedItemS: string;
  selectedItemA: string;
  // items?: number;
}


@Component({
  selector: 'ngx-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  @ViewChild('escClose', { read: TemplateRef  , static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;

  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  customColumn = 'Rif';
  defaultColumns = [ 'Razonsocial', 'Nit', 'Codigo', 'Acciones' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];


  dataSource: NbTreeGridDataSource<FSEntry>;
  selectedItem: string;
  selectedItemS: string;
  selectedItemA: string;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  index = 0;
  codigox = '';
  razonSocialx = '';
  rifx  = '';
  nitx  = '';
  tipox = '';
  estatusx = 0;
  actividadx = '';
  declararx  = 0;
  fechaIniciox = '';
  fechaModificionx = '';
  emailx = '';
  telefonox = '';
  codigoPostalx = '';
  direccionx = '';


constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private toastrService: NbToastrService, private cliente : ClienteService, private windowService: NbWindowService) {

  }
  ngOnInit(){
    this.obtenerDatos();
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
            this.data.push({
                data: { Rif: d.cedula_rif, Razonsocial: d.razon_social, Nit: d.nit, Codigo: d.auxiliar_contable },
            });

          this.dataSource = this.dataSourceBuilder.create(this.data);
        });
      },
      (error) => {
        console.error('No se logro conectar...');
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

  showToast(position, status) {
    this.index += 1;
    this.toastrService.show(
      status || 'Success',
      `Proceso finalizado`,
      { position, status });
  }


  agregar(){
    const wCli: WCliente = {
      Codigo: this.codigox,
      RazonSocial: this.razonSocialx,
      Rif: this.rifx,
      Nit : this.nitx,
      Tipo : this.tipox,
      Estatus: parseInt(this.estatusx),
      Actividad: this.actividadx,
      Declarar: this.declararx,
      FechaInicio : this.fechaIniciox,
      FechaModificacion: this.fechaModificionx,
      Email: this.emailx,
      Telefono: this.telefonox,
      CodigoPostal: this.codigoPostalx,
      Direccion: this.direccionx,
      Usuario : "ANUGULAR-NGX",
    }
    console.log(wCli);
    this.cliente.agregar(wCli).subscribe(
      (resp) => {
        this.dataSource = this.dataSourceBuilder.create(this.data)
        this.showToast('top-right', 'success');
      },
      (err) => {
        console.error('Error: ', err);
      },
    );
  }

  actualizar(){

  }


 
}
