import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource } from '@nebular/theme';
import { FormControl } from '@angular/forms';
import { ConceptoService, WConcepto } from '../../servicio/sysbase/concepto.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Codigo: string;
  Descripcion: string;
  Servicio: string;
  Acciones?: boolean;
  //items?: number;
}

@Component({
  selector: 'ngx-concepto',
  templateUrl: './concepto.component.html',
  styleUrls: ['./concepto.component.scss']
})
export class ConceptoComponent implements OnInit {

 

  @ViewChild('escClose', { read: TemplateRef  , static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;

  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  customColumn = 'Codigo';
  defaultColumns = [ 'Descripcion', 'Servicio', 'Acciones' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  Descripcion = ""
  Servicio = 0
  Monto = 0
  Tipo = 0
  Estatus = 0
  Iva = 0
  Descuento = 0
  Numero = ""


  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, 
    private concepto : ConceptoService, 
    private windowService: NbWindowService
  ) {
    
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

    this.concepto.listar().subscribe(
      (resp) => {
        
        resp.forEach(d => {         
            this.data.push({
                data: { Codigo: d.cd_concepto, Descripcion: d.nb_concepto, Servicio: d.cd_servicio },      
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
      { title: 'Crear Concepto', hasBackdrop: true },
    );
  }

  agregar(){
    var wCon : WConcepto = {
      Descripcion : this.Descripcion,
      Servicio :  this.Servicio,
      Monto : this.Monto,
      Tipo : this.Tipo,
      Estatus : this.Estatus,
      Iva : this.Iva,
      Descuento : this.Descuento,
      Numero : this.Numero
    }
    

  }

}
