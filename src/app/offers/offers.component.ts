import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map, zip } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})

export class OffersComponent {
  kategoriak:any;
  ingatlanok:any;
  kategoriak2:any;
  ingatlanok2:any;
  oszlopokText=["Kategória","Leírás","Hirdetés dátuma","Tehermentes", "Fénykép"];
  oszlopok=["kategoriaid","leiras","hirdetesdatuma","tehermentes", "kepUrl"];
  constructor(private base:BaseService){
    zip(
      this.base.getKategoriak().snapshotChanges().pipe(
      map(changes=>changes.map(c=>({key:c.payload.key, ...c.payload.val()})))
    ), 
    this.base.getIngatlanok().snapshotChanges().pipe(
      map(changes=>changes.map(c=>({key:c.payload.key, ...c.payload.val()})))
    )    
    ).subscribe({
      next: adat=>{this.kategoriak=adat[0]; 
                    this.ingatlanok=adat[1];
        // console.log(this.kategoriak)
      },
      error: err=>console.log(err)
    })

    this.base.fsGetIngatlanok().snapshotChanges().pipe(
      map(changes=>changes.map( c=> ({key:c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe({
      next: adat=>{this.ingatlanok2=adat;         
      },
      error: err=>console.log(err)
    }
    )

    this.base.fsGetKategoriak().snapshotChanges().pipe(
      map(changes=>changes.map( c=> ({key:c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe({
      next: adat=>{this.kategoriak2=adat;         
      },
      error: err=>console.log(err)
    }
    )

   
    // this.base.getKategoriak().snapshotChanges().pipe(
    //   map(changes=>changes.map(c=>({key:c.payload.key, ...c.payload.val()})))
    // ).subscribe({
    //   next: adat=>{this.kategoriak=adat; console.log(this.kategoriak)},
    //   error: err=>console.log(err)
    // })

    // this.base.getIngatlanok().snapshotChanges().pipe(
    //   map(changes=>changes.map(c=>({key:c.payload.key, ...c.payload.val()})))
    // ).subscribe({
    //   next: adat=>{this.ingatlanok=adat; console.log(this.ingatlanok)},
    //   error: err=>console.log(err)
    // })

    
  }

  getKategoria(key:string){
      return this.kategoriak.find(
        (k:any)=> {return k.key==key}
      )
  }
}
