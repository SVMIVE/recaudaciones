import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';


import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource } from '@nebular/theme';
import { FormControl, FormsModule } from '@angular/forms';
import { DocumentoService } from '../../servicio/sysbase/documento.service';
import { ClienteService } from '../../servicio/sysbase/cliente.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Numero: string;
  Tipo?: string;
  Servicio?: string;
  Fecha?: boolean;
  Moneda?: number;
  Iva?: number;
  Monto?: number;
  Total?: number;
}
export interface PeriodicElement {
  Reglon: number;
  Control: string;
  Seniat: string;
  Banco: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {Reglon: 1, Numero: 'Hydrogen', Forma: 1.0079, Banco: 'H'},
//   {Reglon: 2, Numero: 'Helium', Forma: 4.0026, Banco: 'He'},
//   {Reglon: 3, Numero: 'Lithium', Forma: 6.941, Banco: 'Li'},
//   {Reglon: 4, Numero: 'Beryllium', Forma: 9.0122, Banco: 'Be'},
// ];

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'ngx-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent implements OnInit {

  @ViewChild('escClose', { read: TemplateRef  , static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;

  
  codigo = ""
  cliente = ""
  rif = ''
  direccion = ''

  cantidad = '';



  displayedColumns: string[] = ['select', 'Reglon', 'Control', 'Seniat', 'Banco'];
  dataSources = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private docu: DocumentoService, 
    private windowService: NbWindowService,
    private servicioCliente : ClienteService) {

      this.dataSources.data = ELEMENT_DATA
    
  }


   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSources.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSources.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Reglon + 1}`;
  }




  ngOnInit() {
  // this.obtenerDatos()
  }


  openWindowWithBackdrop() {
    this.windowService.open(
      this.escCloseTemplate,
      { title: 'Buscar Cliente', hasBackdrop: true },
    );
  }

  Procesar() {
    this.dataSources.data.forEach(row => 'console.log(row)');
    'console.log(this.selection)';
  }



  consultarCliente(id){

    return this.servicioCliente.consultar(this.codigo).subscribe(
      (resp) => { 
        console.log(resp )
        this.cliente = resp[0].razon_social
        this.rif = resp[0].cedula_rif 
        this.direccion = resp[0].dir_estado              
       },
      (err) => {
          console.log(err)
      }
    )
  }

  lstPagos(){
    return this.servicioCliente.lstPagos(this.codigo).subscribe(
      (resp) => { 
        console.log(resp )
        var i = 0
        resp.data.forEach(e => {
          i++
          ELEMENT_DATA.push( {
            Reglon: i,
            Control: e.nu_documento,
            Seniat: e.nu_seniat,
            Banco: "string"
          } )
        });
       

        this.dataSources.data = ELEMENT_DATA
               
       },
      (err) => {
          console.log(err)
      }
    )
  }
}
