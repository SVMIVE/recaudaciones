import { Component, OnInit } from '@angular/core';
import { DosaService, WDosa } from '../../../servicio/dosa/dosa.service';



@Component({
  selector: 'ngx-dosanoprocesada',
  templateUrl: './dosanoprocesada.component.html',
  styleUrls: ['./dosanoprocesada.component.scss']
})
export class DosanoprocesadaComponent implements OnInit {
  
  lstDosa = []
  constructor(private dosaService : DosaService) { }

  ngOnInit() {
    var wD : WDosa = {
      desde : "2019-10-01",
      hasta : "2019-10-30",
    }
    this.dosaService.NoProcesadas(wD).subscribe(
      (resp) => {
        var lst = resp.Lista

        lst.forEach(e => {
          this.lstDosa.push({
            codigo: e.Cliente.codigo,
            nombre: e.Cliente.nombre,
          })
        });   
      },
      (error) => {

      }

    )
  }


}
