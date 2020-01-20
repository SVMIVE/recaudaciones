import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  flipped = false;
  loadDosas = false;
  loadterminal = false;

  toggleView() {
    this.flipped = !this.flipped;
  }

  loadDosasCategory() {
    this.loadDosas = !this.loadDosas;
    }

    test() {
      this.loadterminal = !this.loadterminal;
      }

      ChangeTab(event) {
        if (event.tabTitle == 'DOSAS') {
            // Action for first tab
            this.loadDosas = !this.loadDosas;
        }
    }
  
  constructor() { }

  ngOnInit() {
  }

}
