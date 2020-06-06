import {Automobil} from './automobil';
import {Prodavac} from './prodavac';
import {Kupac} from './kupac';

export class KupoprodajniUgovor {
  kupoprodajniUgovorID: number;
  datumSklapanja: Date;
  nacinPlacanja: string;
  cena: number;
  automobilID: Automobil;
  kupacID: Kupac;
  prodavacID: Prodavac;
}
