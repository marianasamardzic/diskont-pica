import { Uloga } from './uloga'

export class Korisnik{
  id: number
  email: string
  sifra: string
  ime: string
  prezime: string
  jmbg: string
  telefon: string
  uloga: Uloga
}
