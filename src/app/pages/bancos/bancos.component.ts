import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  NbSortDirection,
  NbTreeGridDataSourceBuilder,
  NbSortRequest,
  NbWindowService,
  NbTreeGridDataSource,
  NbToastrService } from '@nebular/theme';

import { FormControl, FormsModule } from '@angular/forms';
import { BancoService, WBanco } from '../../servicio/sysbase/banco.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Codigo: string;
  Nombre: string;
  Abreviatura: string;
  Estatus: string;
  Acciones?: string;
}


@Component({
  selector: 'ngx-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss'],
})
export class BancosComponent implements OnInit {

  @ViewChild('escClose', { read: TemplateRef  , static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;

  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  customColumn = 'Codigo';
  defaultColumns = [ 'Nombre', 'Abreviatura', 'Estatus', 'Acciones'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  codigo = '';
  nombre = '';
  abreviatura = '';
  estatus = 0;
  index = 0;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private bancoService: BancoService,
    private windowService: NbWindowService, private toastrService: NbToastrService) {

  }
  ngOnInit() {
    this.obtenerDatos() ;
  }

  showToast(position, status) {
    this.index += 1;
    this.toastrService.show(
      status || 'Success',
      `Proceso finalizado`,
      { position, status });
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

  obtenerDatos() {


    this.bancoService.listar().subscribe(
      (resp) => {
        resp.forEach(d => {
          const strEstatus = (d.activo === 1) ? 'ACTIVO' : 'INACTIVO';
          this.data.push({
              data: { Codigo: d.id_banco, Nombre: d.des_banco,  Abreviatura: d.ds_corta, Estatus: strEstatus },
          });

          this.dataSource = this.dataSourceBuilder.create(this.data);
        });
      },
      (error) => {
        console.error('No se logro conectar...');
      },
    );
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
      { title: 'Crear documentos', hasBackdrop: true },
    );
  }

  add() {
    //    console.info(this.codigo);
    const strEstatus = (this.estatus === 1) ? 'ACTIVO' : 'INACTIVO';
    this.data.push({
      data: { Codigo: this.codigo, Nombre: this.nombre,  Abreviatura: this.abreviatura, Estatus: strEstatus  },
    });

    const banco: WBanco = {
      codigo: this.codigo,
      descripcion: this.nombre,
      abreviatura: this.abreviatura,
      estatus : 1,
      usuario: 'ANUGULAR-NGX',
    };

    this.bancoService.agregar(banco).subscribe(
      (resp) => {
        this.dataSource = this.dataSourceBuilder.create(this.data);
        this.showToast('top-right', 'success');
      },
      (err) => {
        console.log ('Personales');
      },
    );


  }


}
