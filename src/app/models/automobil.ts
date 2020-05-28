import {Servis} from './servis';
import {Marka} from './marka';
import {TipAutomobila} from './tip_automobila';

export class Automobil {
  automobilID: number;
  kubikaza: number;
  brojSasije: string;
  konjskaSnaga: number;
  bojaAutomobila: string;
  godinaProizvodnje: number;
  markaID: Marka;
  tipAutomobilaID: TipAutomobila;
  servisID: Servis;
}
