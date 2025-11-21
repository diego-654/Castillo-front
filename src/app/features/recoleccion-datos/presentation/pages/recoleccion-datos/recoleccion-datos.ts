import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { CARD_DATA } from '../../data/card-data';


@Component({
  selector: 'app-recoleccion-datos',
  imports: [Card],
  templateUrl: './recoleccion-datos.html',
  styleUrl: './recoleccion-datos.scss',
})
export default class RecoleccionDatos {
  cards = CARD_DATA;

}
