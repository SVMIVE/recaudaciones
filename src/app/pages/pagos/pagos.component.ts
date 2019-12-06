import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource } from '@nebular/theme';
import { FormControl, FormsModule } from '@angular/forms';
import { DocumentoService } from '../../servicio/sysbase/documento.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

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
  Numero: string;
  Forma: number;
  Banco: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Reglon: 1, Numero: 'Hydrogen', Forma: 1.0079, Banco: 'H'},
  {Reglon: 2, Numero: 'Helium', Forma: 4.0026, Banco: 'He'},
  {Reglon: 3, Numero: 'Lithium', Forma: 6.941, Banco: 'Li'},
  {Reglon: 4, Numero: 'Beryllium', Forma: 9.0122, Banco: 'Be'},
];

@Component({
  selector: 'ngx-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent implements OnInit {

  @ViewChild('escClose', { read: TemplateRef  , static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;

  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  customColumn = 'Numero';
  defaultColumns = [ 'Fecha', 'Tipo', 'Cliente', 'Codigo', 'Estatus', 'Monto' , 'Iva', 'Moneda'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  cantidad = '';

  displayedColumns: string[] = ['select', 'Reglon', 'Numero', 'Forma', 'Banco'];
  dataSources = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
  private docu: DocumentoService, private windowService: NbWindowService) {
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

  private data: TreeNode<FSEntry>[] = [ ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 10;
    const nextColumnStep = 10;
    return minWithForMultipleColumns + (nextColumnStep * index);
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
}
