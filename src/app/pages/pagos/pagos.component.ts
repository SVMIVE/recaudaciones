import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';


import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource } from '@nebular/theme';
import { FormControl, FormsModule } from '@angular/forms';
import { DocumentoService } from '../../servicio/sysbase/documento.service';
import { PagoService } from '../../servicio/sysbase/pago.service';
import { ClienteService } from '../../servicio/sysbase/cliente.service';
import { BancoService } from '../../servicio/sysbase/banco.service';
import { PagadoresComponent } from '../pagadores/pagadores.component';
import { WindowRef } from '@agm/core/utils/browser-globals';
import { LoginService } from '../../servicio/auth/login.service';

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
  Reglon ?: number
  Control ?: string
  Seniat ?: string
  Servicio ?: string
  Tipo ?: string
  Moneda ?: string
  Fecha ?: string
  Monto ?: number
}

//Forma de pago 
export interface PeriodicPagos {
  Operacion ?: string
  Banco ?: string
  Referencia ?: string
  FechadPag ?: string
  Monto ?: number 
}


var ELEMENT_DATA: PeriodicElement[] = [];
var ELEMENT_DATA_PAGOS: PeriodicPagos[] = [];

@Component({
  selector: 'ngx-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export class PagosComponent implements OnInit {

  @ViewChild('escClose', { read: TemplateRef  , static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;
  @ViewChild('frmCancelaPago', { read: TemplateRef  , static: false }) frmCancelaPago: TemplateRef<HTMLElement>;
  @ViewChild('frmProcesarPago', { read: TemplateRef  , static: false }) frmProcesarPagoTemplate: TemplateRef<HTMLElement>;

  concepto = []
  conceptox = ""

  codigo = ""
  cliente = ""
  rif = ''
  direccion = ''
  selectedItem = ''
  cantidad = ''
  selectedItemx = ''
  forma = ''
  banco = ''
  fechadep = ''
  montofact = 0.00
  montofactd = 0.00
  ngFactura = false;
  monto = 0.00
  referencia = ''
  operacion = ''
  seriepago = ''
  montodet= 0.00
  totaldet= 0.00
  Monto= 0.00

  lstBancos = []
  lstFPago = []

  Maestro = {}
  DetalleFact = []
  DetalleDoc = []
  montoTotal = 0.00
  clickbox = false;
  montoTotalPagos = 0.00
  montoAcumulado = 0.00

  lblNumeroPago = ''

  windowRef: any
  windowClient: any
  windowProcesar: any

  displayedColumns: string[] = ['select', 'Reglon', 'Control', 'Seniat', 'Servicio', 'Tipo', 'Moneda', 'Fecha', 'Monto'];
  dataSources = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  displayedColumnsPagos: string[] = ['button', 'Operacion', 'Banco', 'Referencia', 'Fecha', 'Monto'];
  dataSourcesPagos = new MatTableDataSource<PeriodicPagos>(ELEMENT_DATA_PAGOS);
  toastrService: any;


  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private docu: DocumentoService, 
    private pago: PagoService, 
    private windowService: NbWindowService,
    private usrService : LoginService,
    private servicioCliente : ClienteService,
    private bancoServicio: BancoService) {
      ELEMENT_DATA = []
      this.dataSources.data = []

      ELEMENT_DATA_PAGOS = []
      this.dataSourcesPagos.data = []
      this.totaldet = 0

      this.lblNumeroPago = ''
  }


   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSources.data.length;
    
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if ( this.isAllSelected() ){
      this.selection.clear() 

    }else {
      this.dataSources.data.forEach(row => { 
        console.info(row)
        this.selection.select(row) 
      });     

    }
    
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    // console.log( this.selection.isSelected(row) ) 
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Reglon +1}`;
  }




  ngOnInit() {
  // this.obtenerDatos()

    this.bancoServicio.listar().subscribe(
      (resp) => {
        //console.log(resp)
        this.lstBancos = resp;

      },
      (error) => {
        console.error('No se logro conectar...');
      },
    );
    this.lstFormPago()
  }
  /*showToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `Proceso finalizado`,
      { position, status });
  }*/


  clickMontoTotal(row){
    if ( this.selection.isSelected( row ) ) {
      this.montoTotal -= parseFloat ( parseFloat( row.Monto ).toFixed(2) )
    } else {
      this.montoTotal += parseFloat ( parseFloat( row.Monto ).toFixed(2) )
    }
    console.log(row)
  }

  clickMontoTotalFila(row){
    console.log(row)
    
  }

  Procesar() {
  if ( this.montoTotal <= 0 ) {
      this.montoTotal = 0;
      return false;
    }



    //console.log ( this.selection.selected )

    var items = this.selection.selected 
    var monto = 0
    var montodol = 0

    items.forEach(e => {

      /**
         * INSERT INTO dbo.admin_pagosdoc

(nu_pago,nu_documento,nu_renglon,mn_pago_bf,mn_pago_dol,moneda)

VALUES('299083','00322774',1,1443638.40,0.00,'B')
         */
        this.DetalleDoc.push(

          )

          
      /**
      INSERT INTO 

      (,,,,,nu_docpago,mn_pago_bf,mn_pago_dol,moneda)
      
      VALUES('299083',1,'009','000',2020-01-02 00:00:00.0,'2020100007095',1443638.40,0.00,'B')      
      
      */
     this.montofact = monto
     this.montofactd = montodol
     var d = new Date()
     var fe =  d.toISOString().substring(0,10)
     this.DetalleFact.push(
        {                
          "tbl" : "dbo.admin_detpagos",
          "nu_pago":"",
          "nu_renglon": e.Reglon,
          "tp_pago": this.forma,
          "id_banco": this.banco,
          "fe_tppago": fe,
          "nu_docpago": "",
          "mn_pago_bf": parseFloat(this.montofact.toFixed(2) ),
          "mn_pago_dol": parseFloat(this.montofactd.toFixed(2) ),
          "moneda": e.Moneda,
        }
        
      )
        
      monto += e.Monto
    });
    
    

    this.windowService.open(
      this.escCloseTemplate,
      { title: "Forma de Pago", hasBackdrop: true} ,
    )
    
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
    ELEMENT_DATA = []
    this.dataSources.data = []
    this.montoTotal = 0

    return this.servicioCliente.lstPagos(this.codigo).subscribe(
      (resp) => { 
        console.log(resp )
        var i = 0
        resp.data.forEach(e => {
          var monto = e.moneda == "B"? e.mn_documento_bf:e.mn_documento_dol

          i++
          ELEMENT_DATA.push( {
            Reglon: i,
            Control: e.nu_documento,
            Seniat: e.nu_seniat,
            Servicio: e.nb_servicio,
            Tipo: e.tp_documento,
            Moneda: e.moneda,
            Fecha: e.fe_documento.substr(0,10),
            Monto: parseFloat (parseFloat(monto).toPrecision(2)),
          } )
        });
       

        this.dataSources.data = ELEMENT_DATA
               
       },
      (err) => {
          console.log(err)
      }
    )
  }

  ProcesarPago(){
    var usr = this.usrService.obtenerUsuario()
    this.seriepago = usr.serie
    if(this.codigo == "")return false
    var d = new Date()
    var fe =  d.toISOString().substring(0,10)
    var obj = {     
      "call_back": "AutoIncrementoPagos", 
      "tbl" : "dbo.admin_pagos",
      "nu_pago": "",
      "fe_pago": fe + " " + d.toLocaleTimeString('en-US', { hour12: false }),
      "cd_cliente": this.codigo,
      "cd_usuario": usr.usuario,
      "st_pago": "1",
      "ds_observaciones": "PRUEBA PAGO",
      "st_reversa": 0,
      "mn_pago_bf": 0,
      "oficina": "2",
      "mn_pago_dol": 0,
      "moneda": "B",
      "fe_pago_servidor": "2020-04-27",
      "nu_sobrante": 0,
      "mn_sobrante": 0,
      "onetomany": this.DetalleFact,
      }
    this.pago.agregar(obj).subscribe(
      (data) => {    
        //this.showToast('top-right', 'success')
        this.lblNumeroPago = data.resp
        this.windowProcesar = this.windowService.open(
          this.frmProcesarPagoTemplate,
          { title: 'Pago Generado', hasBackdrop: true, closeOnEsc: true },
          );
          
          this.limpiarCampos()    
      },
      (err) => { 
        console.info(obj)
        console.log(err)
        //this.showToast('top-right', 'warning')
        console.info( JSON.stringify( obj ) )
      }
    ) 
  }
  lstFormPago() {
      
      this.servicioCliente.lstFormaPago().subscribe(     
        (resp) => {          
            this.lstFPago = resp;
            console.info(resp)
         },
        (err) => {
          console.error("Error lista de Forma de Pago") 
        }
  
      ) 
    }
  BtnAgregar() {
    var fe = new Date(this.fechadep)
    this.montoAcumulado = ( ( this.montofactd * 1 ) + (this.montoAcumulado * 1) )
    ELEMENT_DATA_PAGOS.push( {
      Operacion : this.operacion,
      Banco : this.banco,
      Referencia: this.referencia, 
      FechadPag:fe.toLocaleDateString('en-GB').substring(0,10),
      Monto: this.montofactd,
      
     } )
    this.dataSourcesPagos.data = ELEMENT_DATA_PAGOS
  }
  //Eliminar elementos del pagos  
    BtnEliminar(element){
      var i = 0
      var eliminar = 0
  
      ELEMENT_DATA_PAGOS.forEach(e => {
        if(e.Banco == element.Banco){ 
          eliminar = i 
        }
        i++
      });
      
      ELEMENT_DATA_PAGOS.splice(eliminar, 1) //Elimino
      
      ELEMENT_DATA_PAGOS.forEach(x => {
        this.montodet += this.totaldet
       
      });  

      this.dataSourcesPagos.data = ELEMENT_DATA_PAGOS
    }

    SeleccionarMontoTotal(e){
      this.montoTotal = 0;
      if (this.clickbox = false) {
        return this.clickbox = true;
        this.montoTotal = 0;
      }else{
          
          ELEMENT_DATA.forEach(el => {
          var mon =this.montoTotal += el.Monto;
           console.log(mon)
          } );
         
      }
      
    }
    cancelarPago(){
      this.windowRef = this.windowService.open(
        this.frmCancelaPago,
        { title: 'Cancelar proceso', hasBackdrop: true, closeOnEsc: true },
      );
      
    }
    limpiarCampos(){
      this.operacion = ""
      this.banco = ""
      this.referencia = ""
      this.fechadep = ""
      this.montofactd = 0
      this.montoAcumulado = 0
      this.dataSourcesPagos.data = []
    }
  
    siCancelar(e){
      this.limpiarCampos()
      this.windowRef.close()
    }
    noCancelar(e){
      this.windowRef.close()
    }
}