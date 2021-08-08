import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(
    private deseosSerivce: DeseosService,
    private route: ActivatedRoute
  ) { 

    const listaId = this.route.snapshot.paramMap.get('listaId');
    
    this.lista = deseosSerivce.obtenerLista(listaId);

  }

  ngOnInit() {
  }

  agrargarItem() {
    if ( this.nombreItem.length === 0 ) {
      return;
    }
    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );

    this.nombreItem = '';
    this.deseosSerivce.guardarStorage();
  }

  cambioCheck( item: ListaItem ) {

    const pendientes = this.lista.items
                            .filter( itemData => !itemData.completado )
                            .length;

    if ( pendientes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosSerivce.guardarStorage();

    console.log(this.deseosSerivce.listas);
  }

  borrar( i: number ) {
    this.lista.items.splice( i, 1 );
    this.deseosSerivce.guardarStorage();
  }

}
