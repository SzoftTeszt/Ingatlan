import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Kategoria } from '../kategoria';

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent {
  newAd:any={};
  kategoriak:any;
  kategoriak2:any;

  showError=false;
  errorMessage="";

  constructor(private base:BaseService, private router:Router){
     this.base.getKategoriak().snapshotChanges().pipe(
      map(changes=>changes.map(c=>({key:c.payload.key, ...c.payload.val()})))
    ).subscribe({
      next: adat=>{this.kategoriak=adat, this.showError=false},
      error: err=>{this.showError=true, this.errorMessage=err.message}
    })

    this.newAd.hirdetesDatuma = new Date().toLocaleDateString().replaceAll(".","").replaceAll(" ","-");
    console.log(this.newAd.hirdetesDatuma);
    this.newAd.tehermentes=true;
    this.newAd.tehermentes=true;

    this.base.fsGetKategoriak().snapshotChanges().pipe(
      map(changes=>changes.map( c=> ({key:c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe({
      next: adat=>{this.kategoriak2=adat;         
      },
      error: err=>console.log(err)
    }
    )
    
  }
  
  ujHirdetes(body:any){
    this.newAd.kategoriaid="1";
    if  (this.newAd.kategoriaid)
    {
      this.newAd.hirdetesDatuma=new Date().toLocaleDateString().replaceAll(". ","-").replaceAll(".","");
      this.newAd.cim="";
      // this.base.newAd(body).then(
      this.base.fsNewAd(body).then(
        ()=> this.router.navigate(['/offers'])
      ).catch(
        (e)=>{
          this.showError=true;
          this.errorMessage=e;
        }
      )
    }
      else{
        this.showError=true;
        this.errorMessage="A kategória kiválasztása kötelező!"
      }

  }

}
