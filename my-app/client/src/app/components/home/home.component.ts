import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { AddressService } from 'src/app/services/address.service'
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  constructor(private addressServ: AddressService, private router: Router) {}
 
  ngOnInit(): void {
    document.body.style.backgroundColor='white'
  }
 
  searchControl = new FormControl()
  formattedaddress = ' '
  frmtdta: number = 0
 
  options = {
    componentRestrictions: {
      country: ['AU'],
    },
  }
 
  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address
    console.log(this.formattedaddress)
  }
  

  search() {
    const textSearch = this.searchControl.value;
    this.addressServ.search(textSearch).subscribe((result) => {
      this.router.navigate(['nearbyPlaces'])
    })
  }
  
}
