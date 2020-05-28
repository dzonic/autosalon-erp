import {Korisnik} from './korisnik';

export class Prodavac {
  prodavacID: number;
  ime: string;
  prezime: string;
  JMBG: number;
  adresa: string;
  kontakt: string;
  datumZaposlenja: Date;
  korisnikID: Korisnik;
}
