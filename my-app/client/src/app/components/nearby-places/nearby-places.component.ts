import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'; 
import { Observable } from 'rxjs';
import { Address } from 'src/app/classes/address.class';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-nearby-places',
  templateUrl:'./nearby-places.component.html',
  styleUrls: ['./nearby-places.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NearbyPlacesComponent {
  popularSearch$: Observable<any> | undefined 
  places: Array<Address>=[];
  currentSearch:string=''

  ngOnInit(): void {
    this.currentSearch=this.addressService.currentSearch
  this.places=this.addressService.nearestPlaces;
  document.body.style.backgroundColor='black'
  this.popularSearch$ = this.addressService.getPopularSearch();
  console.log(this.addressService.nearestPlaces);
}
  constructor(private router:Router , private addressService:AddressService) {}

finish(){
  this.router.navigate(['/']);
}
}
