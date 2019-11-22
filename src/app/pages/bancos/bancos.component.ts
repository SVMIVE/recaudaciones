import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource } from '@nebular/theme';
import { DosaService, WDosa } from '../../servicio/dosa/dosa.service';
import { FormControl } from '@angular/forms';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Codigo: string;
  Nombre: string;
  Abreviatura: string;
  Estatus: boolean;
  Acciones: number;
}


@Component({
  selector: 'ngx-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss']
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



  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private dosa : DosaService, private windowService: NbWindowService) {
    
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
    var wDosa : WDosa = {
      desde: "2019-10-10",
      hasta: "2019-10-11",
    };

    this.dosa.listar(wDosa).subscribe(
      (resp) => {
        console.log(resp)
        sessionStorage.setItem('key-iaim', resp.token)
        resp.Lista.forEach(d => {
          console.log(d.Cliente)
          var registro = d.Cliente; 
          /**
          this.data.push({
              data: { codigo: registro.numero },      
          });
           */
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
      { title: 'Crear documentos', hasBackdrop: true },
    );
  }

  add(){
    console.log("Hola mundo")
    this.data.push({
      data: { Codigo: 'Erick', Nombre: "Hola", Abreviatura : "kkk", Estatus : true, Acciones: 1 },      
    });
    this.dataSource = this.dataSourceBuilder.create(this.data);

  }


}
