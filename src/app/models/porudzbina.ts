import { Dobavljac } from './dobavljac';

export class Porudzbina {
  id: number;
  dobavljac: Dobavljac;
  prodavnica_id: number;
  isporuceno: boolean;
  datum_slanja: Date;
  datum_dospeca: Date;
}
