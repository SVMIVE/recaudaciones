import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource } from '@nebular/theme';
import { ClienteService, WCliente } from '../../../servicio/sysbase/cliente.service';
import { FormControl } from '@angular/forms';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Cliente: string;
  Activo: string;
  Inactivo: string;
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
  customColumn = 'Cliente';
  defaultColumns = [ 'Activo', 'Inactivo' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  loading = false;


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
    this.loading = true;
    this.cliente.lstActividad().subscribe(
      (resp) => {
        sessionStorage.setItem('key-iaim', resp.token)
        resp.forEach(d => {        
            this.data.push({
                data: { 
                  Cliente: d.ACTIVIDAD, Activo: d.ACTIVOS, Inactivo: d.INACTIVOS },      
            });
          this.dataSource = this.dataSourceBuilder.create(this.data);
        });
        //this.router.navigateByUrl("/pages/")
        this.loading = false;
      },
      (error) => {
        this.loading = false;
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

 
}
