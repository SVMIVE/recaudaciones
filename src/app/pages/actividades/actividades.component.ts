import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource } from '@nebular/theme';

import { FormControl } from '@angular/forms';
import { ActividadService } from '../../servicio/sysbase/actividad.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Codigo: string;
  Nombre: string;
  Moneda: string;
  Acciones?: number;
}

@Component({
  selector: 'ngx-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
})
export class ActividadesComponent implements OnInit {

  @ViewChild('escClose', { read: TemplateRef  , static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;

  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  customColumn = 'Codigo';
  defaultColumns = [ 'Nombre', 'Moneda', 'Acciones'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;



  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private actividad : ActividadService, private windowService: NbWindowService) {

  }
  ngOnInit() {
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

  obtenerDatos() {


    this.actividad.listar().subscribe(
      (resp) => {
        resp .forEach(d => {
          console.log(d);

          this.data.push({
              data: { Codigo: d.codigo, Nombre: d.actividad, Moneda: d.moneda },
                      });
          this.dataSource = this.dataSourceBuilder.create(this.data);
        });
        // this.router.navigateByUrl("/pages/")
        // this.loading = false;
      },
      (error) => {
        // this.loading = false;
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
    console.log('Hola mundo');


  }



}
