import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {  NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource, NbToastrService } from '@nebular/theme';

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
  Opciones? : string
  Numero    : string
  Fecha?    : string
  Tipo?     : string
  Cliente?  : boolean
  Codigo?   : number
  Estatus?  : number
  Monto?    : number
  Iva?      : number
  Moneda    : string
}


export interface PeriodicElement {
  Cuenta    : string
  Concepto  : string
  Cantidad  : number
  Monto     : number
}

var ELEMENT_DATA: PeriodicElement[] = [];
var LSTDetalles = []

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
  customColumn = 'Opciones';
  defaultColumns = [ 'Numero', 'Fecha', 'Tipo', 'Cliente', 'Codigo', 'Estatus', 'Monto' , 'Iva', 'Moneda'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  cantidad = ""
  monto = 0.00
  total = 0.00
  index = 0
  codigo = ""
  cliente = ""
  iva = 0.00
  tipo = ""
  pos = 0
  concepto = []
  conceptox = ""
  lstServicio = []
  baseImponible = 0.00
  excento = 0.00
  cuenta = ''
  montoTotal = 0.00
  seniat = ''



  displayedColumnx: string[] = ['Cuenta', 'Concepto', 'Cantidad', 'Monto']

  dataSourcesx = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)


  lblcodigo = "" //Codigo de facturar actual seleccionado
  lblresultado = ""
  flipped = false
  esVisible = false


  toggleView() {
    this.flipped = !this.flipped;
  }

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, 
    private docu : DocumentoService, 
    private windowService: NbWindowService,
    private conceptos : ConceptoService,
    private toastrService: NbToastrService,
    private servicio : ServicioService,
    private servicioCliente : ClienteService ) {
    
      //this.cargarConcepto()
      ELEMENT_DATA = []
      LSTDetalles = []

      this.dataSourcesx.data = ELEMENT_DATA
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
          var opciones = '-'
          if (d.st_documento == "0") {
            opciones = `OK`
          } 
          
          
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
                Moneda: d.moneda,
                //Opciones: opciones
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
        console.log(e);
        var monto = parseFloat(e.mn_monto_bf) * parseInt(this.cantidad)
        if ( e.in_iva == "0"){
          this.excento += this.monto
        }else{
          this.baseImponible += this.monto
        }
        this.monto = parseFloat(  monto.toFixed(2) )
        this.cuenta = e.cd_cuenta
      }
    });
    
    
  }

  calcularCantidad(e){
    var monto = parseInt(this.cantidad) * this.monto
    this.total =  parseFloat(  monto.toFixed(2) )
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



  openWindowDocumento() {
    this.windowService.open(
      this.escCloseTemplate,
      { title: 'Documentos creado', hasBackdrop: true },
    );
  }

  openWindowFacturar( e ) {
    console.log(e.data);
    this.lblcodigo = e.data.Numero
    
    this.windowService.open(
      this.escCloseTemplate,
      { title: 'Número de Factura', hasBackdrop: true },
    );
  }
  facturar(e){
    this.seniat = "A000000568"
    this.lblresultado = "Control Seniat: "
  }


  agregarData(){    
    var concepto = ""
    var cuenta = ""
    this.concepto.forEach(e => {
      if(this.conceptox == e.cd_concepto){        
        concepto = e.nb_concepto
      }
    });

    ELEMENT_DATA.push( {
      Cuenta : this.cuenta,
      Cantidad: parseInt(this.cantidad), 
      Concepto: concepto, 
      Monto: this.total
    } )


    this.montoTotal += this.total
    this.dataSourcesx.data = ELEMENT_DATA
    this.index++
    LSTDetalles.push( {      
        "tbl" : "dbo.admin_detdocumentos",
        "nu_documento":"",
        "nu_renglon": this.index,
        "cd_concepto": this.conceptox,
        "ds_concepto": concepto,
        "nu_cantidad": parseInt(this.cantidad),
        "mn_monto_bf": this.total,
        "exentos":0.00,
        "pc_iva": this.iva,
        "moneda": 'B',
        "tp_cambio":"BS",
        "cd_cuenta": this.cuenta        
    } )
    
    
  }


  guardar(){
    this.iva = 0
    this.monto = 0
    this.codigo = ""
    this.cliente = ""
    this.esVisible = true
    var d = new Date()
    var fe =  d.toISOString().substring(0,10)
    var obj = {
      "call_back": "AutoIncrementoC",
      "nu_documento": "",
      "fe_documento": fe + " " + d.toLocaleTimeString(),
      "tp_documento":"FAC",
      "cd_servicio": this.conceptox,
      "oficina": "2",
      "cd_cliente": this.codigo,
      "st_documento":"O",
      "cd_usuario": "NRECAUDA",
      "pc_iva": 16.00,
      "mn_documento_bf": this.excento + this.baseImponible,
      "baseimponible": this.baseImponible,
      "exentos": this.excento,
      "tbl" : "dbo.admin_documentos",
      "moneda": "B",
      "cod_terminal": "SEDE",
      "onetomany": LSTDetalles,
    }
    //console.log( JSON.stringify  (obj) )

    this.docu.agregar(obj).subscribe(
      (resp) => {         
        this.dataSource = this.dataSourceBuilder.create(this.data)
        console.info("Exito: ", resp)
        this.showToast('top-right', 'success')
      },
      (err) => {
        console.error("Error: ", err)
        this.showToast('top-right', 'warning')
      }
    ) 
    //ELEMENT_DATA = []
    //LSTDetalles = []




  }

  showToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Proceso finalizado`,
      { position, status });
  }


}
