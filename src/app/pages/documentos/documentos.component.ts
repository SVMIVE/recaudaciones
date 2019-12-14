import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource } from '@nebular/theme';

import { FormControl, FormsModule } from '@angular/forms';
import { DocumentoService } from '../../servicio/sysbase/documento.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConceptoService } from '../../servicio/sysbase/concepto.service';
import { ServicioService } from '../../servicio/sysbase/servicio.service';
import { ClienteService } from '../../servicio/sysbase/cliente.service';


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Numero: string
  Fecha?: string
  Tipo?: string
  Cliente?: boolean
  Codigo?: number
  Estatus?: number
  Monto?: number
  Iva?: number
  Moneda: string
}


export interface PeriodicElement {
  Concepto: string
  Cantidad: number
  Monto: number
}


var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'ngx-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {

  

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

  cantidad = ""

  codigo = ""
  cliente = ""
  monto = 0.00
  iva = 0.00
  tipo = ""

  concepto = []
  conceptox = ""
  lstServicio = []

  displayedColumnx: string[] = ['Concepto', 'Cantidad', 'Monto'];
  
  dataSourcesx = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  
  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, 
    private docu : DocumentoService, 
    private windowService: NbWindowService,
    private conceptos : ConceptoService,
    private servicio : ServicioService,
    private servicioCliente : ClienteService ) {
    
      //this.cargarConcepto()

      this.cargarServicio()
      //this.consultarConcepto("DO")

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
     this.docu.listar().subscribe(
      (resp) => {        
        resp.data.forEach(d => {          
          this.data.push({
              data: { 
                Numero: d.nu_documento, 
                Fecha: d.fe_documento, 
                Tipo: d.tp_documento, 
                Cliente: d.razon_social, 
                Codigo: d.cd_cliente, 
                Estatus: d.st_documento, 
                Monto: d.mn_documento_bf,
                Iva : d.mn_iva_bf,
                Moneda: d.moneda  
            },      
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

  cargarServicio() {
    console.info("Procesando servicios")
    return this.servicio.listar().subscribe(
      (resp) => {          
          this.lstServicio = resp;
       },
      (err) => {
          console.log(err)
      }

    ) 
  }
  cargarConcepto() {
    return this.conceptos.listar().subscribe(
      (resp) => { 
          this.concepto = resp;
       },
      (err) => {
          console.log(err)
      }

    )
  }

  consultarConcepto(id){
    this.conceptox = ""
    return this.conceptos.consultar(id).subscribe(
      (resp) => { 
        
        this.concepto = resp
        
       },
      (err) => {
          console.log(err)
      }
    )
  }

  consultarCantidad(id){
    
    this.concepto.forEach(e => {
      if(this.conceptox == e.cd_concepto){        
        this.monto = parseFloat(e.mn_monto_bf) * parseInt(this.cantidad);
      }
    });
    
    
  }

  consultarCliente(id){
    return this.servicioCliente.consultar(this.codigo).subscribe(
      (resp) => { 
        console.log(resp.length )
        this.cliente = resp[0].razon_social               
       },
      (err) => {
          console.log(err)
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

  agregarData(){    
    var concepto = ""
    this.concepto.forEach(e => {
      if(this.conceptox == e.cd_concepto){        
        concepto = e.nb_concepto
      }
    });

    ELEMENT_DATA.push( {
      Cantidad: parseInt(this.cantidad), 
      Concepto: concepto, 
      Monto: this.monto
    } )
    this.dataSourcesx.data = ELEMENT_DATA
  }

  guardar(){
    this.iva = 0
    this.monto = 0
    this.codigo = ""
    this.cliente = ""

  }
}
