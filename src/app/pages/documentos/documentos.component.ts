import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {  NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, 
  NbWindowService, NbTreeGridDataSource, NbToastrService, NbSearchService } from '@nebular/theme';

import { FormControl, FormsModule } from '@angular/forms';
import { DocumentoService } from '../../servicio/sysbase/documento.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConceptoService } from '../../servicio/sysbase/concepto.service';
import { ServicioService } from '../../servicio/sysbase/servicio.service';
import { ClienteService } from '../../servicio/sysbase/cliente.service';
import { TasaService } from '../../servicio/tasa/tasa.service';
import { Subscription } from 'rxjs';
import { WindowRef } from '@agm/core/utils/browser-globals';
import { LoginService } from '../../servicio/auth/login.service';



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
  Montous?  : number
  Iva?      : number
  Moneda    : string
}


export interface PeriodicElement {
  Codigo?    : string
  Cuenta?    : string
  Concepto?  : string
  Cantidad?  : number
  Monto      : number
  Montous?   : number
  Iva        : number
  MontoIva   : number
  Exento     : number
  Total      : number
}

export interface PeriodicCliente {
  Codigo?    : string
  Nombre?  : string
  Rif?  : string
}

var ELEMENT_DATA: PeriodicElement[] = [];
var ELEMENT_CLIENTE: PeriodicCliente[] = [];
var LSTDetalles = []

@Component({
  selector: 'ngx-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {

  
  @ViewChild('escClose', { read: TemplateRef  , static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;
  @ViewChild('frmMensaje', { read: TemplateRef  , static: false }) frmMensajeTemplate: TemplateRef<HTMLElement>;
  @ViewChild('frmCliente', { read: TemplateRef  , static: false }) frmClienteTemplate: TemplateRef<HTMLElement>;
  @ViewChild('frmProcesar', { read: TemplateRef  , static: false }) frmProcesarTemplate: TemplateRef<HTMLElement>;

  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  customColumn = 'Opciones';
  defaultColumns = [ 'Numero', 'Fecha', 'Tipo', 'Cliente', 'Codigo', 'Estatus', 'Monto' , 'Iva', 'Moneda'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  cantidad = 0
  monto = 0.00
  total = 0.00
  montous = 0.00
  totalus= 0.00
  index = 0
  codigo = ""
  cliente = ""
  iva = 0.00
  tipo = "FAC"
  pos = 0
  exentox = 0
  concepto = []
  conceptox = ""
  lstServicio = []
  baseImponible = 0.00
  exento = 0.00
  cuenta = ''
  montoTotal = 0.00
  seniat = ''
  ivaf=0.00
  rif=''
  direccion=''
  DicomUS = 0.00
  DicomEU = 0.00
  Petro = 0.00
  ngFactura = false
  serviciox = ''
  baseimponiblex = 0
  selectedItem= '';
  pcIva = "" //Iva global del servicio

  displayedColumnx: string[] = ['button','Codigo', 'Cuenta', 'Concepto', 'Cantidad', 'Monto', 'Iva', 'Exento', 'MontoIva', 'Total']
  displayedColumnCliente: string[] = ['Codigo', 'Nombre', 'Rif']

  dataSourcesx = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
  dataCliente = new MatTableDataSource<PeriodicCliente>(ELEMENT_CLIENTE)


  lblcodigo = "" //Codigo de facturar actual seleccionado
  lblresultado = ""
  flipped = false
  lblNumeroDocumento = ''
  esVisible = false

  fnumero = "0000000"
  ffecha = "0000000" 
  fcontrol = "000000"
  serie = ""
  fserie = ""
  fcodigocliente = ""
  fcliente = ""
  frif = ""
  fdireccion = ""
  fcondicionpago = ""
  ftiposervicio = ""
  montototalx = 0
  ivat = 0
  montobaseimponiblex = 0
  montoivax = 0

  subscription: Subscription;

  toggleView() {
    this.flipped = !this.flipped;
  }
  windowRef: any
  windowClient: any
  windowProcesar: any

  
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, 
    private docu : DocumentoService, 
    private windowService: NbWindowService,
    private conceptos : ConceptoService,
    private toastrService: NbToastrService,
    private servicio : ServicioService,
    private servicioCliente : ClienteService ,
    private tasaService : TasaService,
    private usrService : LoginService,
    private nbSearch : NbSearchService) {
    
      //this.cargarConcepto()
      ELEMENT_DATA = []
      LSTDetalles = []

      this.dataSourcesx.data = []
      this.dataCliente.data = []
      this.cargarServicio()
      this.ngFactura = false
      this.lblNumeroDocumento = ''
      this.ivat = 0
      this.tipo = "FAC"
      //this.consultarConcepto("DO")

      this.montoivax =  0
      this.montobaseimponiblex = 0
      this.montototalx = 0
      //console.info()

  }
  ngOnInit(){    
    this.obtenerDatos() 
    this.tasaService.listar().subscribe(     
      (resp) => { 
        console.log(resp)
        this.DicomUS = resp[0].ta_dollar
        this.DicomEU = resp[0].mn_euro
        this.Petro = resp[0].mn_petro

       },
      (error) =>{
        console.log("Error del sistema")
      }
    )
    //this.nbSearch.submitSearch("Valores", "control")
    this.subscription = this.nbSearch.onSearchSubmit().subscribe(
      (data: { term: string, tag: string }) => {
        
        ELEMENT_CLIENTE = []
        this.dataCliente.data = []

        return this.servicioCliente.consultarNombre(data.term).subscribe(
          (resp) => {
            console.log(resp)
            this.windowClient = this.windowService.open(this.frmClienteTemplate, { title: 'Listado de cliente', hasBackdrop: true, closeOnEsc: true },)
            resp.forEach(e => {
              ELEMENT_CLIENTE.push({
                Codigo: e.auxiliar_contable,
                Nombre: e.razon_social,
                Rif: e.cedula_rif
              })
              
            });
            this.dataCliente.data = ELEMENT_CLIENTE
          }, (err) => {
            console.error(err)
          }
          )
        }
    );
    //console.error("Iniciando")
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
                Montous: d.mn_documento_us,
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
    this.cantidad = 0
    this.ivaf = 0
    this.cuenta = ""
    this.monto = 0
    this.montous = 0
    this.total = 0
    return this.conceptos.consultar(id).subscribe(
      (resp) => { 
        console.log(resp )
        this.concepto = resp
        
       },
      (err) => {
          console.log(err)
      }
    )
  }

  consultarCantidad(id){

    if ( this.cantidad < 0) {
      
      this.cantidad = 0
      return false
      
    }  
    this.concepto.forEach(e => {
      if(this.conceptox == e.cd_concepto){        
        console.log(e.mn_monto_bf)
        var monto = e.mn_monto_bf * this.cantidad
        this.ivaf = e.pc_iva

        if ( e.in_iva == "0" ){
          //this.exento += this.monto
          this.exentox = monto
        }else{
          //this.baseImponible += this.monto
          this.baseimponiblex =  monto * this.Petro
        }
        var valor = monto * this.Petro
        this.monto =  monto 
        this.total = valor 
        this.ivat = ( valor * this.ivaf ) / 100
        this.cuenta = e.cd_cuenta

      }
      
      console.error('Base Imponible: ', this.baseimponiblex)

    });
    
    //this.consultarCantidadUS()  
      
  }

  /**
   * 
   * @param e 
   */
  asignarCliente( e ){
    this.codigo = e.Codigo
    this.consultarCliente(this.codigo)
    this.windowClient.close()
  }



  calcularCantidad() : number{
    var total =  parseFloat(   this.monto.toFixed(2) ) * this.Petro
    return parseFloat( total.toFixed(2) )
  }

  consultarCantidadUS(){    
    this.concepto.forEach(e => {
      if(this.conceptox == e.cd_concepto){         
        var montous = parseFloat(e.mn_monto_s) * this.cantidad
        this.ivaf = e.pc_iva
        if ( e.in_iva == "0"){
          this.exento += this.montous
        }else{
          this.baseImponible += this.montous
        }
        this.montous = parseFloat(  montous.toFixed(2) )
        this.cuenta = e.cd_cuenta

        
      }
    });
    
    
  }

  calcularCantidadUS(){
    var montous = this.cantidad * this.montous
    var totalus =  parseFloat(  montous.toFixed(2) ) * this.DicomUS
    this.totalus = parseFloat(totalus.toFixed(2) )
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
  

  private data: TreeNode<FSEntry>[] = [ ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 10;
    const nextColumnStep = 10;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  cancelarData(){
    this.windowRef = this.windowService.open(
      this.frmMensajeTemplate,
      { title: 'Cancelar proceso', hasBackdrop: true, closeOnEsc: true },
    );
    
  }

  limpiarCampos(){
    this.flipped = !this.flipped;
    this.iva = 0
    this.monto = 0
    this.codigo = ""
    this.cliente = ""
    this.tipo = "FAC"
    this.cantidad = 0
    this.cuenta = ""
    this.monto = 0
    this.total = 0
    this.baseImponible = 0
    this.index = 0
    this.esVisible = true
    this.conceptox = ""
    this.ivaf = 0
    this.cuenta = ""
    this.monto = 0
    this.total = 0
    this.montous = 0
    this.serviciox = ''
    this.totalus = 0
    this.ngFactura = false
    ELEMENT_DATA = []
    LSTDetalles = []

    this.dataSourcesx.data = []
    this.dataCliente.data = []
  }

  siCancelar(e){
    this.limpiarCampos()
    this.windowRef.close()
  }

  noCancelar(e){
    this.windowRef.close()
  }


  openWindowDocumento() {
    this.windowService.open(
      this.escCloseTemplate,
      { title: 'Documentos creado', hasBackdrop: true },
    );
  }

  openWindowFacturar( e ) {
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


  agregarData(  position, status ){    
    if ( this.validarConceptosAgregados() ) {
      this.toastrService.show(
        status || 'danger',
        `El concepto ha sido agregado, si quiere agregar más cantidad elimine el anterior`,
        {  position, status });
        return false
    }

    if( this.cantidad <= 0 ) { 
      this.cantidad = 0
      return false
    }
    if(this.cliente == "")return false
    var concepto = ""
    var cuenta = ""
    this.concepto.forEach(e => {
      if(this.conceptox == e.cd_concepto){        
        concepto = e.nb_concepto
      }
    });


    this.baseImponible += this.baseimponiblex
    this.exento += this.exentox
    this.montoivax +=  this.ivat
    this.montobaseimponiblex = this.baseImponible
    this.montototalx = this.exento + this.baseImponible + this.montoivax

    ELEMENT_DATA.push( {
      Codigo : this.conceptox,
      Cuenta : this.cuenta,
      Cantidad: this.cantidad, 
      Concepto: concepto, 
      Monto: this.total,
      Iva: this.ivaf, 
      MontoIva: this.ivat,
      Exento : this.exentox,
      Total:  0,
    } )

    if( this.ivaf > 0 ) { 
     this.pcIva = this.ivaf.toString()
    }
    this.montoTotal += this.total
    this.dataSourcesx.data = ELEMENT_DATA
    this.index++
    LSTDetalles.push( {      
        "tbl" : "dbo.admin_detdocumentos",
        "nu_documento":"",
        "nu_renglon": this.index,
        "cd_concepto": this.conceptox,
        "ds_concepto": concepto,
        "nu_cantidad": this.cantidad,
        "mn_monto_bf": this.total,
        "mn_monto_s": this.totalus,       
        "exentos": this.exentox,
        "pc_iva": this.ivat,
        "moneda": 'B',
        "tp_cambio":"BS",
        "cd_cuenta": this.cuenta        
    } )

    
    this.conceptox = ""
    this.cantidad = 0
    this.ivaf = 0
    this.cuenta = ""
    this.monto = 0
    this.exentox = 0
    this.baseimponiblex = 0
    this.total = 0
    this.montous = 0
    this.totalus = 0
    this.ngFactura = true

    this.previsualizarFactura()
    
  }


  guardar(){
    var usr = this.usrService.obtenerUsuario()
    this.serie = usr.serie
    
    if(this.cliente == "")return false
    var d = new Date()
    var fe =  d.toISOString().substring(0,10)
    var obj = {
      "call_back": "AutoIncremento" + usr.serie,
      "tp_serie": usr.serie,
      "nu_documento": "",
      "fe_documento": fe + " " + d.toLocaleTimeString('en-US', { hour12: false }),
      "tp_documento": this.tipo,
      "cd_servicio": this.serviciox,
      "oficina": "2",
      "cd_cliente": this.codigo,
      "st_documento":"O",
      "cd_usuario": usr.usuario,
      "pc_iva":  parseFloat(this.pcIva),
      "mn_documento_bf": this.exento + this.baseImponible,
      "baseimponible": this.baseImponible,
      "exentos": this.exento,
      "tbl" : "dbo.admin_documentos",
      "moneda": "B",
      "cod_terminal": "SEDE",
      "onetomany": LSTDetalles,
    }
    this.docu.agregar(obj).subscribe(
      (data) => {    
        this.showToast('top-right', 'success')
        this.lblNumeroDocumento = data.resp
        this.windowProcesar = this.windowService.open(
          this.frmProcesarTemplate,
          { title: 'Documento Generado', hasBackdrop: true, closeOnEsc: true },
          );
          
          this.limpiarCampos()    
      },
      (err) => { 
        console.info(obj)
        console.log(err)
        this.showToast('top-right', 'warning')
        console.info( JSON.stringify( obj ) )
      }
    ) 

   

  }


  validarConceptosAgregados(): boolean{
    var valor = false
    
    ELEMENT_DATA.forEach(e => {
      if(this.conceptox == e.Codigo) valor = true   
    });
    return valor
  }


  aceptarDocumento(){
    this.windowProcesar.close()

  }
  
  
  previsualizarFactura(){
    var html = ``;

    ELEMENT_DATA.forEach(e => {
      html += `<tr>
      <td class="codigo">${e.Cuenta}</td>
      <td class="descripcion">${e.Concepto}</td>
      <td class="num" style="display: none">${e.Iva}</td>
      <td class="num" style="display: none">${e.Iva}</td>
      <td class="num">${e.Iva}</td>
      <td class="num">${e.Monto}</td>
    </tr>`

    });                   
    document.getElementById("ContenidoTbl").innerHTML = html;
  }
  
  
  imprimirFactura () : any {
    
  }

  showToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Proceso finalizado`,
      { position, status });
  }
  onSubmit(f) {
    console.log(f.value);
  }
  vacio() {


  }

  BtnEliminar(element){
    var i = 0
    var eliminar = 0
    var monto = 0
    var iva = 0 
    var exento = 0

    ELEMENT_DATA.forEach(e => {
      if(e.Codigo == element.Codigo){ 
        eliminar = i 
      }
      i++
    });
    
    ELEMENT_DATA.splice(eliminar, 1) //Elimino

    ELEMENT_DATA.forEach(x => {
      monto += x.Monto
      iva += x.MontoIva
      exento += x.Exento
    });

    this.montobaseimponiblex = monto
    this.montoivax =  iva
    this.montototalx = exento + monto + iva

    this.baseImponible = monto
    this.exentox  = exento
    this.ivat = iva

    this.dataSourcesx.data = ELEMENT_DATA
  }


}
