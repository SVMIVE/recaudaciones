import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.scss'],
})
export class SalirComponent implements OnInit {

loading = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }
add() {}
salir () {
  this.loading = true;
  this.router.navigateByUrl('');

}

}
