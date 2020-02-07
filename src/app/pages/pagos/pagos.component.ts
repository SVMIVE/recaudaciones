import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';


import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { NbSortDirection, NbTreeGridDataSourceBuilder, NbSortRequest, NbWindowService, NbTreeGridDataSource } from '@nebular/theme';
import { FormControl, FormsModule } from '@angular/forms';
import { DocumentoService } from '../../servicio/sysbase/documento.service';
import { ClienteService } from '../../servicio/sysbase/cliente.service';
import { BancoService } from '../../servicio/sysbase/banco.service';
import { PagadoresComponent } from '../pagadores/pagadores.component';

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
  selectedItem = ''
  cantidad = '';
  selectedItemx = ''
  forma = ''
  banco = ''
  fechadep = ''
  montofact = 0.00
  montofactd = 0.00
  ngFactura = false;

  lstBancos = []

  Maestro = {}
  DetalleFact = []
  DetalleDoc = []



  displayedColumns: string[] = ['select', 'Reglon', 'Control', 'Seniat', 'Servicio', 'Tipo', 'Moneda', 'Fecha', 'Monto'];
  dataSources = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);


  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private docu: DocumentoService, 
    private windowService: NbWindowService,
    private servicioCliente : ClienteService,
    private bancoServicio: BancoService) {
      ELEMENT_DATA = []
      this.dataSources.data = []

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

    this.bancoServicio.listar().subscribe(
      (resp) => {
        //console.log(resp)
        this.lstBancos = resp;

      },
      (error) => {
        console.error('No se logro conectar...');
      },
    );
  }



  Procesar() {

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
     this.DetalleFact.push(
        {                
          "tbl" : "dbo.admin_detpagos",
          "nu_pago":"",
          "nu_renglon": e.Reglon,
          "tp_pago": this.forma,
          "id_banco": this.banco,
          "fe_tppago": "2020-01-02 00:00:00.0",
          "nu_docpago": "",
          "mn_pago_bf": this.montofact,
          "mn_pago_dol": this.montofactd,
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
    return this.servicioCliente.lstPagos(this.codigo).subscribe(
      (resp) => { 
        console.log(resp )
        var i = 0
        resp.data.forEach(e => {
          var monto = e.moneda == "B"? e.mn_documento_bf:e.mn_documento_dol
          // if(e.moneda == "B"){
          //   monto = e.mn_documento_bf
          // }else {
          //   monto = e.mn_documento_dol
          // }

          i++
          ELEMENT_DATA.push( {
            Reglon: i,
            Control: e.nu_documento,
            Seniat: e.nu_seniat,
            Servicio: e.nb_servicio,
            Tipo: e.tp_documento,
            Moneda: e.moneda,
            Fecha: e.fe_documento.substr(0,10),
            Monto: monto  
          } )
        });
       

        this.dataSources.data = ELEMENT_DATA
               
       },
      (err) => {
          console.log(err)
      }
    )
  }

  guardar(){

    /**
     *  INSERT INTO dbo.admin_pagos (nu_pago,fe_pago,cd_cliente,
     * cd_usuario,st_pago,ds_observaciones,
     * st_reversa,mn_pago_bf,oficina,mn_pago_dol,moneda,fe_pago_servidor,nu_sobrante,mn_sobrante)

        VALUES('299401','2020-01-10 10:55:04.38','10773','AMARRERO',1,NULL,0,3620800.00,'2',0.00,'B','2020-01-10 10:55:04.38',NULL,0.00)
     */
    var Pago = {     
      "call_back": "AutoIncrementoPagos", 
      "tbl" : "dbo.admin_pagos",
      "nu_pago": "",
      "fe_pago": "",
      "cd_cliente": this.codigo,
      "cd_usuario": "TUPA",
      "st_pago": "1",
      "ds_observaciones": "",
      "st_reversa": 0,
      "mn_pago_bf": "",
      "oficina": "",
      "mn_pago_dol": "",
      "moneda": "",
      "fe_pago_servidor": "",
      "nu_sobrante": "",
      "mn_sobrante": "",
      "onetomany": this.DetalleFact,
      "manytomany": this.DetalleDoc,
    }

  }
  Pagar() {}
}
