import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NearbyPlacesComponent } from './components/nearby-places/nearby-places.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"nearbyPlaces",component:NearbyPlacesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
