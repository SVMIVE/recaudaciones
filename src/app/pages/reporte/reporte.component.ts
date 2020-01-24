import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../servicio/sysbase/servicio.service';

@Component( {
    selector: 'ngx-reporte', templateUrl: './reporte.component.html', styleUrls: ['./reporte.component.scss']
}

) export class ReporteComponent implements OnInit {
    flipped=false;
    loadDosas=false;
    loadterminal=false;
    loadrecaudacion=false;
    loadhabilitaduria=false;
    Dosasbuttom=true;
    Terminalbuttom=true;
    Recaudacionbuttom=true;
    Habilitaduriabuttom=true;
    loadcliente=true;
    loaddocumento=true;
    loadservicio=true;
    loadserie=true;
    loadseniat=true;
    loadrango=true;

    reportex = ""
    lstServicio = []


    constructor(
      private servicio : ServicioService
    ) {
      this.cargarServicio();
    }
    ngOnInit() {}

    toggleView() {
      this.flipped=!this.flipped;
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

test(id){
  this.reportex = ""
  //return this.reportex
  console.log(id);
}
}