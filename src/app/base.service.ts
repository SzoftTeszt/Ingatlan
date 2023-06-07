import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


import { Kategoria } from './kategoria';
import { Ingatlan } from './ingatlan';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  refKategoria: AngularFireList<Kategoria>;
  refIngatlan: AngularFireList<Ingatlan>;

  fsrefKategoria: AngularFirestoreCollection<Kategoria>;
  fsrefIngatlan: AngularFirestoreCollection<Ingatlan>;

  constructor(private db: AngularFireDatabase, 
    private fsdb: AngularFirestore) { 
    this.refIngatlan=db.list('ingatlanok');
    this.refKategoria=db.list('kategoriak');
    
    this. fsrefKategoria= fsdb.collection("/kategoria")
    this. fsrefIngatlan= fsdb.collection("/ingatlan")

  }

  getKategoriak(){
    return this.refKategoria;
  }
  fsGetKategoriak(){
    return this.fsrefKategoria;
  }
  getIngatlanok(){
    return this.refIngatlan;
  }
  fsGetIngatlanok(){
    return this.fsrefIngatlan;
  }
  newAd(body:any){
    return this.refIngatlan.push(body);
  }
  fsNewAd(body:any){
    return this.fsrefIngatlan.add({...body});
    
  }
}
