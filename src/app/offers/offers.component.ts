import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})

export class OffersComponent {
  kategoriak:any;
  ingatlanok:any;
  oszlopokText=["Kategória","Leírás","Hirdetés dátuma","Tehermentes", "Fénykép"];
  oszlopok=["kategoriaid","leiras","hirdetesdatuma","tehermentes", "kepUrl"];
  constructor(private base:BaseService){
    this.base.getKategoriak().snapshotChanges().pipe(
      map(changes=>changes.map(c=>({key:c.payload.key, ...c.payload.val()})))
    ).subscribe({
      next: adat=>{this.kategoriak=adat; console.log(this.kategoriak)},
      error: err=>console.log(err)
    })

    this.base.getIngatlanok().snapshotChanges().pipe(
      map(changes=>changes.map(c=>({key:c.payload.key, ...c.payload.val()})))
    ).subscribe({
      next: adat=>{this.ingatlanok=adat; console.log(this.ingatlanok)},
      error: err=>console.log(err)
    })


  }
}
