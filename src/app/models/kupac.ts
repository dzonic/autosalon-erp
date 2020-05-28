import {Korisnik} from './korisnik';

export class Kupac {
  kupacID?: number;
  ime: string;
  prezime: string;
  JMBG: number;
  adresa: string;
  kontakt: string;
  popustNaKupovinu: number;
  korisnikID: Korisnik;
}
