import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../servicio/sysbase/servicio.service';
import { FormControl } from '@angular/forms';
import { ClienteService } from '../../servicio/sysbase/cliente.service';

@Component( {
    selector: 'ngx-reporte', templateUrl: './reporte.component.html', styleUrls: ['./reporte.component.scss']
}

) export class ReporteComponent implements OnInit {

    reportex = new FormControl();
    flipped=false;
    loadDosas=false;
    loadterminal=false;
    loadrecaudacion=false;
    loadhabilitaduria=false;
    Dosasbuttom=true;
    Terminalbuttom=true;
    Recaudacionbuttom=true;
    Habilitaduriabuttom=true;
    loadcliente=false;
    loaddocumento=false;
    loadservicio=false;
    loadserie=false;
    loadseniat=false;
    loadrango=false;
    loaddesde=false;
    loadhasta=false;

    names = '';

    lstServicio = []
    lstCliente = []
/*
     DOSAS = [
      {"id":	1	,"value":"	1	","description":"	RELACIÓN Y/O INGRESOS DIARIOS DOSAS	"},
      {"id":	2	,"value":"	2	","description":"	TOTAL GENERAL DOSAS	"},
      {"id":	3	,"value":"	3	","description":"	DOSAS ANULADAS	"},
      {"id":	4	,"value":"	4	","description":"	CLIENTES FIJOS	"},
      {"id":	5	,"value":"	5	","description":"	CLIENTES GENÉRICOS	"},
      {"id":	6	,"value":"	6	","description":"	CLIENTES	"},
      {"id":	7	,"value":"	7	","description":"	RESUMEN DE DOCUMENTOS POR CLIENTE FIJO	"},
      {"id":	8	,"value":"	8	","description":"	RESUMEN DE DOCUMENTOS POR CLIENTE CARGUEROS	"},
      {"id":	9	,"value":"	9	","description":"	RESUMEN GENERAL DOSA DE CONTADO CLASIFICADO POR CONCEPTO	"},
      {"id":	10	,"value":"	10	","description":"	CLIENTES CARGUEROS	"},
      {"id":	11	,"value":"	11	","description":"	CLIENTES FIJOS	"},
      {"id":	12	,"value":"	12	","description":"	CLIENTES CARGUEROS	"},
      {"id":	13	,"value":"	13	","description":"	CLIENTES FIJOS	"},
      {"id":	14	,"value":"	14	","description":"	CLIENTES CARGUEROS	"},
      {"id":	15	,"value":"	15	","description":"	CLIENTES FIJOS	"}      
  ];

*/

  REPORTES = [];
    constructor(
      private servicio : ServicioService,
      private Cliente : ClienteService ,
    ) {
      this.cargarServicio();
      this.cargarCliente();
    }
    ngOnInit() {}

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
    
    cargarCliente() {
      console.info("Procesando Clientes")
      return this.Cliente.listar().subscribe(
        (resp) => {          
            this.lstCliente = resp;
         },
        (err) => {
            console.log(err)
        }
    
      ) 
    }

    

  get_report_list(event: any) {
    //this.flipped=!this.flipped;
    this.names = event.target.id;
    
    switch(this.names){
      case "dos_dosa":
        this.REPORTES = [
          {"id":	1	,"value":"fd-fh","description":"	RELACIÓN Y/O INGRESOS DIARIOS DOSAS	"},
          {"id":	2	,"value":"fd-fh","description":"	TOTAL GENERAL DOSAS	"},
          {"id":	3	,"value":"fd-fh","description":"	DOSAS ANULADAS	"},
        ];
      break;
      case "dos_cliente":
        this.REPORTES = [
          {"id":	4	,"value":"na","description":"	CLIENTES FIJOS	"},
          {"id":	5	,"value":"na","description":"	CLIENTES GENÉRICOS	"},
          {"id":	6	,"value":"na","description":"	CLIENTES	"},          
        ];
      break;
      case "dos_resumen_documento":
        this.REPORTES = [
          {"id":	7	,"value":"fd-fh-cl","description":"	RESUMEN DE DOCUMENTOS POR CLIENTE FIJO	"},
          {"id":	8	,"value":"fd-fh-cl","description":"	RESUMEN DE DOCUMENTOS POR CLIENTE CARGUEROS	"},
          {"id":	9	,"value":"fd-fh-cl","description":"	RESUMEN GENERAL DOSA DE CONTADO CLASIFICADO POR CONCEPTO	"},                  
        ];
      break;
      case "dos_estado_cuenta":
        this.REPORTES = [
          {"id":	10	,"value":"cl","description":"	CLIENTES CARGUEROS	"},
          {"id":	11	,"value":"cl","description":"	CLIENTES FIJOS	"},                            
        ];
      break;
      case "dos_hasta":
        this.REPORTES = [
          {"id":	12	,"value":"fh-cl","description":"	CLIENTES CARGUEROS	"},
          {"id":	13	,"value":"fh-cl","description":"	CLIENTES FIJOS	"},                           
        ];
      break;
      case "dos_historico":
        this.REPORTES = [
          {"id":	14	,"value":"fd-fh-cl","description":"	CLIENTES CARGUEROS	"},
          {"id":	15	,"value":"fd-fh-cl","description":"	CLIENTES FIJOS	"},                                  
        ];
      break;
      case "tea_cliente":
        this.REPORTES = [
          {"id":	22	,"value":"na","description":"	CLIENTES	"},                              
        ];
      break;
      case "tea_facturas_anuladas":
        this.REPORTES = [
          {"id":	24	,"value":"fd-fh","description":"	FACTURAS ANULADAS	"},                         
        ];
      break;
      case "tea_relacion_ingresos_diarios":
        this.REPORTES = [
          {"id":	26	,"value":"fd-fh","description":"	RELACIÓN Y/O INGRESOS DIARIOS TERMINAL AUXILIAR	"},
        ];
      break;
      case "tea_resumen_documentos":
        this.REPORTES = [
          {"id":	28	,"value":"fd-fh-td","description":"	RESUMEN DE DOCUMENTOS SERIE F	"},
          {"id":	29	,"value":"fd-fh-td","description":"	RESUMEN DE DOCUMENTOS SERIE B	"},
          {"id":	30	,"value":"fd-fh-td","description":"	RESUMEN DE DOCUMENTOS SERIE F CON PAGOS	"},
          {"id":	31	,"value":"fd-fh-td","description":"	RESUMEN DE DOCUMENTOS SERIE B CON PAGOS	"},          
        ];
      break;
      case "tea_estado_cuenta":
        this.REPORTES = [
          {"id":	33	,"value":"cl","description":"	CLIENTES CARGUEROS	"},
          {"id":	34	,"value":"cl","description":"	CLIENTES FIJOS	"},
          {"id":	35	,"value":"cl","description":"	ESTADO DE CUENTA ACTUAL POR CLIENTE	"},                  
        ];
      break;
      case "tea_totales_servicios":
        this.REPORTES = [
          {"id":	37	,"value":"fd-fh","description":"	FACTURAS	"},
          {"id":	38	,"value":"fd-fh","description":"	NOTAS DE CRÉDITO	"},
          {"id":	39	,"value":"fd-fh","description":"	NOTAS DE DÉBITO	"},
          {"id":	40	,"value":"fd-fh-td","description":"	RESUMEN B Y F	"},
          {"id":	41	,"value":"fd-fh-td","description":"	RESUMEN B Y F POR MONEDA	"},                         
        ];
      break;
      case "rec_documentos_abiertos":
        this.REPORTES = [
          {"id":	43	,"value":"na","description":"	DOCUMENTOS ABIERTOS	"},                     
        ];
      break;
      case "rec_libro_ventas":
        this.REPORTES = [
          {"id":	45	,"value":"fd-fh","description":"	LIBRO DE VENTAS	"},                   
        ];
      break;
      case "rec_retenciones":
        this.REPORTES = [
          {"id":	47	,"value":"fd-fh","description":"	RETENCIONES	"},                  
        ];
      break;
      case "rec_relacion_ingresos":
        this.REPORTES = [
          {"id":	49	,"value":"fd","description":"	RELACIÓN Y/O INGRESOS GENERALES	"},
          {"id":	50	,"value":"fd-fh","description":"	RELACIÓN Y/O INGRESOS DIARIOS DE RECAUDACIÓN 	"},
          {"id":	51	,"value":"fd-fh","description":"	RELACIÓN GENERAL DE DOCUMENTOS	"},
          {"id":	52	,"value":"fd-fh-cl","description":"	RELACIÓN GENERAL DE DOCUMENTOS POR CLIENTE	"},
          {"id":	53	,"value":"fd-fh-","description":"	RELACIÓN GENERAL DE DOCUMENTOS POR SERVICIOS	"},
          {"id":	54	,"value":"td-sv-fd-fh","description":"	RELACIÓN GENERAL DE DOCUMENTOS POR SERVICIOS Y TIPO DE DOCUMENTO	"},
          {"id":	55	,"value":"fd-fh","description":"	RELACIÓN DE DOCUMENTOS ANULADOS	"},
          {"id":	56	,"value":"fd-fh","description":"	RELACIÓN DE DOCUMENTOS ANULADOS SERIE C	"},
          {"id":	57	,"value":"fd-fh-cl","description":"	RELACIÓN DE DOCUMENTOS POR CLIENTE	"},
          {"id":	58	,"value":"fd-fh","description":"	RELACIÓN DE DOSAS FACTURADAS POR CLIENTE	"},                           
        ];
      break;
      case "rec_clientes":
        this.REPORTES = [
          {"id":	60	,"value":"na","description":"	CLIENTES ACTIVOS	"},
          {"id":	61	,"value":"na","description":"	CLIENTES FIJOS	"},
          {"id":	62	,"value":"na","description":"	CLIENTES TEMPORALES	"},
          {"id":	63	,"value":"na","description":"	CLIENTES DECLARA INGRESOS BRUTOS	"},
          {"id":	64	,"value":"cl-ts","description":"	SOLVENCIA DEL CLIENTE	"},                                    
        ];
      break;
      case "rec_listados":
        this.REPORTES = [
          {"id":	66	,"value":"na","description":"	LISTADOS DE BANCOS	"},
          {"id":	67	,"value":"na","description":"	LISTADO DE CLIENTES	"},
          {"id":	68	,"value":"na","description":"	LISTADOS DE SERVICIOS	"},
          {"id":	69	,"value":"na","description":"	LISTADOS DE CONCEPTOS	"},                                           
        ];
      break;
      case "rec_estado_cuenta":
        this.REPORTES = [
          {"id":	71	,"value":"cl","description":"	ESTADO DE CUENTA ACTUAL POR CLIENTE FIJO	"},
          {"id":	72	,"value":"cl","description":"	ESTADO DE CUENTA ACTUAL POR CLIENTE TEMPORAL	"},
          {"id":	73	,"value":"fd-fh-cl","description":"	ESTADO DE CUENTA POR FECHA CLIENTE FIJO -A "},
          {"id":	74	,"value":"fd-fh-cl","description":"	ESTADO DE CUENTA POR FECHA CLIENTE FIJO -A -P	"},
          {"id":	75	,"value":"fd-fh","description":"	SUMATORIA DE LOS SERVICIOS FACTURADOS Y COBRADOS	"},
          {"id":	76	,"value":"fd-fh","description":"	ESTADO DE CUENTA GENERAL CLIENTES ACTIVOS	"},
          {"id":	77	,"value":"fh-cl","description":"	ESTADO DE CUENTA GENERAL 30-60-90 POR CLIENTES	"},
          {"id":	78	,"value":"fh-sv","description":"	ESTADO DE CUENTA GENERAL 30-60-90 POR CONCEPTOS	"},                                                  
        ];
      break;
      case "rec_resumen":
        this.REPORTES = [
          {"id":	80	,"value":"fd-fh-sv","description":"	RESUMEN DE DOCUMENTOS POR SERVICIO	"},
          {"id":	81	,"value":"td-ts-fd-fh","description":"	RESUMEN POR TIPO DE DOCUMENTO Y POR SERIE	"},
          {"id":	82	,"value":"cl-ts-fd-fh","description":"	RESUMEN POR SERIE	"},                                                           
        ];
      break;
      case "rec_relacion_dia":
        this.REPORTES = [
          {"id":	84	,"value":"fd-fh","description":"	SERIE C	"},
          {"id":	85	,"value":"fd-fh","description":"	SERIE D	"},
          {"id":	86	,"value":"na","description":"	LISTADO DE PLANTILLA DE LOS CÁNONES	"},
          {"id":	87	,"value":"fd-fh","description":"	FACTURADO POR RANGO DE FECHA	"},                                                                  
        ];
      break;
      case "rec_recibos":
        this.REPORTES = [
          {"id":	89	,"value":"fd-fh","description":"	RECIBOS DE PAGOS EMITIDOS POR FECHA	"},
          {"id":	90	,"value":"fd-fh-cl","description":"	RECIBOS EMITIDOS POR CLIENTE EN UNA FECHA DETERMINADA	"},
          {"id":	91	,"value":"fd-fh","description":"	RECIBOS EMITIDOS POR TAQUILLA U OFICINA	"},                                                                       
        ];
      break;
      case "rec_nota_credito":
        this.REPORTES = [
          {"id":	93	,"value":"cl-ts","description":"	NOTAS DE CRÉDITO Z ACTIVAS CLIENTES FIJOS	"},
          {"id":	94	,"value":"cl-ts","description":"	NOTAS DE CRÉDITO Z ACTIVAS CLIENTES TEMPORALES	"},                                                                               
        ];
      break;
      case "hab_cliente":
        this.REPORTES = [
          {"id":	96	,"value":"na","description":"	CLIENTES	"},                                                                             
        ];
      break;
      case "hab_facturas_anuladas":
        this.REPORTES = [
          {"id":	98	,"value":"na","description":"	ANULADAS	"},                                                                      
        ];
      break;
      case "hab_relacion_ingresos_diarios":
        this.REPORTES = [
          {"id":	100	,"value":"fh","description":"	RELACIÓN Y/O INGRESOS DIARIOS DE HABILITADO SERIE E	"},
          {"id":	101	,"value":"fh","description":"	RELACIÓN Y/O INGRESOS DIARIOS DE TAQUILLA SERIE C	"},                                                                           
        ];
      break;
      case "hab_resumen_documentos":
        this.REPORTES = [
          {"id":	103	,"value":"fd-fh-td","description":"	RESUMEN DE DOCUMENTOS POR SERVICIO DE LA SERIE E	"},
          {"id":	104	,"value":"fd-fh-td","description":"	RESUMEN DE DOCUMENTOS POR SERVICIO DE LA SERIE C	"},                                                                                 
        ];
      break;



    }
    
    this.flipped=!this.flipped;
  }
    

toggleView() {
  this.reportex = null;
  this.loadcliente=false;
  this.loaddocumento=false;
  this.loadservicio=false;
  this.loadserie=false;
  this.loadseniat=false;
  this.loadrango=false;
  this.loaddesde=false;
  this.loadhasta=false;
  this.flipped=!this.flipped;

}

  getcampos(value){
/*
    this.loadcliente=false;
    this.loaddocumento=false;
    this.loadservicio=false;
    this.loadserie=false;
    this.loadseniat=false;
    this.loadrango=false;
*/
    if(value == "fd-fh"){
      this.loadrango=true;
      this.loaddesde=true;
      this.loadhasta=true;
      this.loadcliente=false;
      this.loaddocumento=false;
      this.loadservicio=false;
      this.loadserie=false;
      this.loadseniat=false;
    }
    if(value == "fd-fh-cl"){
      this.loadrango=true;
      this.loaddesde=true;
      this.loadhasta=true;
      this.loadcliente=true;
      this.loaddocumento=false;
      this.loadservicio=false;
      this.loadserie=false;
      this.loadseniat=false;
    }
    if(value == "cl"){
      this.loadrango=false;
      this.loaddesde=false;
      this.loadhasta=false;
      this.loadcliente=true;
      this.loaddocumento=false;
      this.loadservicio=false;
      this.loadserie=false;
      this.loadseniat=false;
    }
    if(value == "fh-cl"){
      this.loadrango=true;
      this.loaddesde=false;
      this.loadhasta=true;
      this.loadcliente=true;
      this.loaddocumento=false;
      this.loadservicio=false;
      this.loadserie=false;
      this.loadseniat=false;
    }
    if(value == "fd-fh-td"){
      this.loadrango=true;
      this.loaddesde=true;
      this.loadhasta=true;
      this.loadcliente=false;
      this.loaddocumento=true;
      this.loadservicio=false;
      this.loadserie=false;
      this.loadseniat=false;
    }
    if(value == "fd"){
      this.loadrango=true;
      this.loaddesde=true;
      this.loadhasta=false;
      this.loadcliente=false;
      this.loaddocumento=false;
      this.loadservicio=false;
      this.loadserie=false;
      this.loadseniat=false;
    }
    if(value == "td-sv-fd-fh"){
      this.loadrango=true;
      this.loaddesde=true;
      this.loadhasta=true;
      this.loadcliente=false;
      this.loaddocumento=true;
      this.loadservicio=true;
      this.loadserie=false;
      this.loadseniat=false;
    }
    if(value == "cl-ts"){
      this.loadrango=false;
      this.loaddesde=false;
      this.loadhasta=false;
      this.loadcliente=true;
      this.loaddocumento=false;
      this.loadservicio=false;
      this.loadserie=true;
      this.loadseniat=false;
    }
    if(value == "fh-sv"){
      this.loadrango=true;
      this.loaddesde=false;
      this.loadhasta=true;
      this.loadcliente=false;
      this.loaddocumento=false;
      this.loadservicio=true;
      this.loadserie=false;
      this.loadseniat=false;
    }
    if(value == "td-ts-fd-fh"){
      this.loadrango=true;
      this.loaddesde=true;
      this.loadhasta=true;
      this.loadcliente=false;
      this.loaddocumento=true;
      this.loadservicio=false;
      this.loadserie=true;
      this.loadseniat=false;
    }
    if(value == "cl-ts-fd-fh"){
      this.loadrango=true;
      this.loaddesde=true;
      this.loadhasta=true;
      this.loadcliente=true;
      this.loaddocumento=false;
      this.loadservicio=false;
      this.loadserie=true;
      this.loadseniat=false;
    }

    if(value == "fd-fh-sv"){
      this.loadrango=true;
      this.loaddesde=true;
      this.loadhasta=true;
      this.loadcliente=false;
      this.loaddocumento=false;
      this.loadservicio=true;
      this.loadserie=false;
      this.loadseniat=false;
    }


    //console.log(value);
  }
  loadDosasCategory() {
      this.loadDosas=!this.loadDosas;
      this.Dosasbuttom=!this.Dosasbuttom;
      this.ResetTerminalCategory();
      this.ResetRecaudaccionCategory();
      this.ResetHabilitaduriaCategory();
  }
  ResetDosasCategory() {
    this.loadDosas=false
    this.Dosasbuttom=true;
  }
  loadTerminalCategory() {
      this.loadterminal=!this.loadterminal;
      this.Terminalbuttom=!this.Terminalbuttom;
      this.ResetDosasCategory();
      this.ResetRecaudaccionCategory();
      this.ResetHabilitaduriaCategory();
  }
  ResetTerminalCategory() {
    this.loadterminal=false
    this.Terminalbuttom=true;
  }
  loadRecaudaccionCategory() {
      this.loadrecaudacion=!this.loadrecaudacion;
      this.Recaudacionbuttom=!this.Recaudacionbuttom;
      this.ResetTerminalCategory();
      this.ResetDosasCategory();
      this.ResetHabilitaduriaCategory();
  }
  ResetRecaudaccionCategory() {
    this.loadrecaudacion=false;
    this.Recaudacionbuttom=true;
  }
  loadHabilitaduriaCategory() {
      this.loadhabilitaduria=!this.loadhabilitaduria;
      this.Habilitaduriabuttom=!this.Habilitaduriabuttom;
      this.ResetTerminalCategory();
      this.ResetRecaudaccionCategory();
      this.ResetDosasCategory();
  }
  ResetHabilitaduriaCategory() {
    this.loadhabilitaduria=false;
    this.Habilitaduriabuttom=true;
  }

}