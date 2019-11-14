import { Component, Input, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { DosaService } from '../../../servicio/dosa/dosa.service';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  codigo: string;
  cliente: string;
  forma: string;
  //items?: number;
}

@Component({
  selector: 'ngx-lstdosa',
  templateUrl: './lstdosa.component.html',
  styleUrls: ['./lstdosa.component.scss']
})
export class LstdosaComponent implements OnInit{

  customColumn = 'codigo';
  defaultColumns = [ 'cliente', 'forma' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private dosa : DosaService) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
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
    
    this.dosa.listar().subscribe(
      (resp) => {
        console.log(resp)
        sessionStorage.setItem('key-iaim', resp.token)
        resp.Lista.forEach(d => {
          console.log(d.Cliente)

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


  private data: TreeNode<FSEntry>[] = [
    {
      data: { codigo: 'Projects', cliente: '1.8 MB', forma: 'dir' },      
    },
    {
      data: { codigo: 'Reports', forma: 'dir', cliente: '400 KB'},
      
    },
    {
      data: { codigo: 'Other', forma: 'dir', cliente: '109 MB'},
      
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

