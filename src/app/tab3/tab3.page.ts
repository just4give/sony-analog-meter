import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';

declare var google: any;
import { APIService } from '../API.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  device:any = {
    oilLevel: 0,
    online: false,
    ts: Math.floor(new Date().getTime()/1000)
  };
  geoCoder;
  
  
  

  address:string;
  lat: string;
  long: string;  
  autocomplete: { input: string; } = { input:''};
  autocompleteItems: any[] = [];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  

  constructor(private ngZone: NgZone,private apiService: APIService, private toastController: ToastController) {}


  ngOnInit(): void {
    document.body.classList.toggle('dark', true);
   
    
  }

  async ionViewWillEnter() {
    this.geoCoder = new google.maps.Geocoder();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    
    this.autocompleteItems = [];
  }

  
  registerNewDevice =  async function() {
      

      try {
        await this.apiService.CreateCustomer(this.device);
        const toast = await this.toastController.create({
          message: 'Device registered.',
          duration: 2000,
          color:"success"
        });
        toast.present();

    } catch (error) {

      const toast = await this.toastController.create({
        message: 'Failed to register the device.',
        duration: 2000,
        color:"danger"
      });
      toast.present();
      
    }
  }

  auocompleteAddress = async function(text){
    console.log(text);
    if(text != undefined && text.length > 5){
      console.log("search google address");

      try {

        // let r = await this.geoCoder.geocode( { 'address': text});
        // console.log(r.results);
       let r = await this.GoogleAutocomplete.getPlacePredictions({ input: text });
       let predictions = r.predictions;
       console.log(predictions);
       this.autocompleteItems = [];
       this.ngZone.run(() => {
        this.autocompleteItems  = predictions;
      });

      } catch (error) {
        //console.log(error);
      }
    }
  }

  async selectSearchResult(item)  {
    this.autocompleteItems = []
   // this.autocomplete.input = ''
    console.log(item);   
    this.placeid = item.place_id;
    let r = await this.geoCoder.geocode({ 'placeId': this.placeid });
    this.device.addres = item.description;
    this.device.latitude = r.results[0].geometry.location.lat();
    this.device.longitude = r.results[0].geometry.location.lng();

    
    
  }
  
  
  //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
  clearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }

}
