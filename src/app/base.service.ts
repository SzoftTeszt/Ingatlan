import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Kategoria } from './kategoria';
import { Ingatlan } from './ingatlan';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  refKategoria: AngularFireList<Kategoria>;
  refIngatlan: AngularFireList<Ingatlan>;

  constructor(private db: AngularFireDatabase) { 
    this.refIngatlan=db.list('ingatlanok');
    this.refKategoria=db.list('kategoriak');
  }

  getKategoriak(){
    return this.refKategoria;
  }
  getIngatlanok(){
    return this.refIngatlan;
  }
  newAd(body:any){
    return this.refIngatlan.push(body);
  }
}
