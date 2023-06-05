import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OffersComponent } from './offers/offers.component';
import { NewAdComponent } from './new-ad/new-ad.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"offers", component:OffersComponent},
  {path:"newad", component:NewAdComponent},
  {path:"**", component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
