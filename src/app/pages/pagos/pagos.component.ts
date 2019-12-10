import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {  NbWindowService } from '@nebular/theme';

import { FormsModule } from '@angular/forms';
import { DocumentoService } from '../../servicio/sysbase/documento.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';


export interface PeriodicElement {
  Reglon: number
  Numero: string
  Forma: number
  Banco: string
}

var ELEMENT_DATA: PeriodicElement[] = [
  {Reglon: 1, Numero: 'Hydrogen', Forma: 1.0079, Banco: 'H'},
  {Reglon: 2, Numero: 'Helium', Forma: 4.0026, Banco: 'He'},
  {Reglon: 3, Numero: 'Lithium', Forma: 6.941, Banco: 'Li'},
  {Reglon: 4, Numero: 'Beryllium', Forma: 9.0122, Banco: 'Be'},
];

@Component({
  selector: 'ngx-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  @ViewChild('escClose', { read: TemplateRef  , static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;

  

  cantidad = ""

  displayedColumns: string[] = ['select', 'Reglon', 'Numero', 'Forma', 'Banco'];
  dataSources = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor( private docu : DocumentoService, private windowService: NbWindowService) {
    
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




  ngOnInit(){
    //this.obtenerDatos() 
  }


  openWindowWithBackdrop() {
    this.windowService.open(
      this.escCloseTemplate,
      { title: 'Buscar Cliente', hasBackdrop: true },
    );
  }

  Procesar(){
    this.dataSources.data.forEach(row => console.log(row));
    console.log(this.selection);
  }
}
