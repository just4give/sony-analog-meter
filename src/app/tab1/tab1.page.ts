import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
declare var google: any;
import { APIService } from '../API.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  darkTheme: boolean = true;
  @ViewChild("Map", { static: true }) mapElement: ElementRef;

  map: any;
  mapOptions: any;
  location = { lat: null, lng: null };
  markerOptions: any = { position: null, map: null, title: null };
  markerMap = {};
  markers: any = [];
  mapStyle: any = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ "visibility": "off" }]
    },
    
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ "visibility": "off" }]
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [{ "visibility": "off" }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ "visibility": "off" }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ "visibility": "off" }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [{ "visibility": "off" }]
    },
    
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }
  ];

  size = window.innerWidth/6;

  selectedDevice:any;
  showDeviceData:boolean = false;

  thresholdConfigTemperature = {
    '0': { color: 'lightcyan' },
    '40': { color: 'green' },
    '60': { color: 'orange' },
    '90': { color: 'red' }
  };

  thresholdConfigHumdity = {
    '0': { color: 'red' },
    '25': { color: 'green' },
    '40': { color: 'lightblue' },
    '80': { color: 'blue' }
  };

  thresholdConfigIAQ = {
    '0': { color: 'green' },
    '50': { color: 'orange' },
    '100': { color: 'red' }
  };

  thresholdConfigBat = {
    '0': { color: 'red' },
    '25': { color: 'orange' },
    '50': { color: 'lightgreen' },
    '75': { color: 'green' }
  };

  // public lineChartLabelsIAQ: Label[] = ['A','B','C','D','E'];
  // public lineChartDataIAQ: ChartDataSets[] = [
  //   { data: [10,20,30,35,43], label: '# peatguards' }
    
  // ];

  public sensorDataLabels: Label[] = [];
  public sensorDataTemp: ChartDataSets[] = [
    { data: [], label: 'Oil level' },
    
    
  ];
  public sensorDataMoisture: ChartDataSets[] = [
    { data: [], label: 'Moisture' }
    
  ];

  public sensorDataGas: ChartDataSets[] = [
    { data: [], label: 'Carbon' }
    
  ];

  public lineChartOptionsMoisture: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 1,
          label: {
            enabled: false,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColorsMoisture: Color[] = [
    { // grey //green
      backgroundColor: 'rgba(3, 168, 8,0)',
      borderColor: 'rgba(3, 168, 8,1)',
      pointBackgroundColor: 'rgba(3, 168, 8,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(3, 168, 8,0.8)'
    }
  ];
  public lineChartLegendMoisture = false;
  public lineChartTypeMoisture: ChartType = 'line';
  public sensorValues:any[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Healthy','Dry','Fire','Offline'];
  public pieChartData: SingleDataSet = [0,0,0,0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    
    {
      backgroundColor: [ 'rgba(0,255,0,0.3)','rgba(255,255,0,0.3)','rgba(255,0,0,0.3)', 'rgba(128,128,128,1)'],
      borderColor: 'rgba(0, 0, 0,1)'
    },
  ];
  markerIcon:any;
  markerIconOffline:any;
  markerIconAnomaly:any;
  markerIconDry:any;
  devices:any[]=[];
  sensorDataMap:any ={};

  geoCoder;

  constructor(private apiService: APIService, private zone: NgZone ) { 
    this.markerIcon = {
      url: './assets/mc_healthy.png',
      scaledSize: new google.maps.Size(48, 48),
      anchor: new google.maps.Point(32,65),
      labelOrigin: new google.maps.Point(18, -10),
    };
    this.markerIconOffline = {
      url: './assets/mc_offline.png',
      scaledSize: new google.maps.Size(48, 48),
      anchor: new google.maps.Point(32,65),
      labelOrigin: new google.maps.Point(18, -10),
    };
    this.markerIconAnomaly = {
      url: './assets/mc_anomaly.png',
      scaledSize: new google.maps.Size(48, 48),
      anchor: new google.maps.Point(32,65),
      labelOrigin: new google.maps.Point(18, -10),
    };
    this.markerIconDry = {
      url: './assets/mc_dry.png',
      scaledSize: new google.maps.Size(48, 48),
      anchor: new google.maps.Point(32,65),
      labelOrigin: new google.maps.Point(18, -10),
    };
  }


  ngOnInit(): void {
    document.body.classList.toggle('dark', this.darkTheme);
    this.geoCoder = new google.maps.Geocoder();
    this.zone.run(()=>{
      console.log("running in zone");
      this.getAddressFromCords(41.37537, -72.21464);
    })
  }

  getAddressFromCords = async function (latitude,longitude ) {
    let address = "Not decoded";
    let r = await this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } });
    
    //console.log(r);
    var filtered = r.results.filter(m=> m.types.includes('premise')).map(m=> m.formatted_address);
    if (filtered.length > 0 ) {
      address = filtered[0];
    }
    console.log(address);
    return address;
    
  }

  getBadgeColor = function(oilLevel:number){
    let color = "success";
    if (oilLevel <= 30){
      color ="danger";
    }else if(oilLevel <= 60){
      color = "warning";
    }
    return color;
  }
  getIcon = function(oilLevel: number){

    let color = "success";
    if (oilLevel <= 30){
      return this.markerIconAnomaly;
    }else if(oilLevel <= 60){
      return this.markerIconDry;
    }else{
      return this.markerIcon;
    }
    
  }

  getBatteryLife = function(battery_voltage){
    let batPct = 0;
    if(battery_voltage >= 4.100){
      batPct = 100;
    } else if(battery_voltage >= 3.95){
      batPct = 75;
    } else if(battery_voltage >= 3.80){
      batPct = 50;
    } else if(battery_voltage >= 3.25){
      batPct = 25
    } else{
      batPct =0
    }

    return batPct;

  }
  async ionViewWillEnter() {
    console.log("ionViewWillEnter");
//41.371929,-72.2195677
    //this.mapOptions = ;
    this.map = new google.maps.Map(this.mapElement.nativeElement, 
      {
      center: { lat: 41.371929, lng: -72.2195677 },
      zoom: 15,
      mapTypeControl: false,
      styles: this.mapStyle
    });
    //this.map.setCenter({ lat: 41.3094, lng: -72.2475 });

    //41.3094,\"longitude\":-72.2475

    // this.sensorValues = await (await this.apiService.ListPeatlandSensorValues()).items;
    // this.sensorValues = this.sensorValues.sort((m,n) => {return m.timestamp > n.timestamp ? -1:1 });
    // console.log('sensorValues', this.sensorValues);
    this.devices = await (await this.apiService.ListCustomers()).items;
    let healthCount = 0,  dryCount=0 ,fireCount = 0, offlineCount = 0;
    

    console.log('devices', this.devices);
    this.devices.forEach(async (device)=>{
      device.batPct = this.getBatteryLife(device.bat);
      //device.addres = await this.getAddressFromCords(device.latitude, device.longitude);
      
      
      let diff = (new Date().getTime() - new Date(Date.parse(device.updatedAt)).getTime())/1000/60;
      console.log("last updated in minutes ", diff);

      if (diff > 60 ){
        device.clas = 4; //offline
        
      }

      switch(device.clas){
        case 1: healthCount++;break;
        case 2: dryCount++;break;
        case 3: fireCount++;break;
        case 4: offlineCount++;break;
      }

      // let count:number = parseInt(this.pieChartData[device.clas -1].toString());
      // count = count+1;


      device.dt = (new Date(device.ts*1000)).toLocaleString();
      let markerOptions ={
        map : this.map,
        position: { lat: device.latitude, lng: device.longitude },
        data:device,
        icon : this.getIcon(device.oilLevel)
      }
  
      let marker =  new google.maps.Marker(markerOptions);
      
      marker.setAnimation(google.maps.Animation.DROP);
      //this.map.setCenter(markerOptions.position); 


      var infowindow = new google.maps.InfoWindow({
        content: ""
     });
  
     // Attach it to the marker we've just added
     //google.maps.event.addListener(marker, 'click', this.infoCallback(infowindow, marker, this.zone));
     google.maps.event.addListener(marker, 'click', (e)=>{
        let that = this;
       this.zone.run(async ()=>{
         console.log(marker);
         this.showDeviceData = true;
         this.selectedDevice = marker.data;
        

         this.loadSensorData();

         
         
         
       })
     });

     this.markerMap[device.imei] = marker;

    })

    //update pie chart data now
    this.pieChartData = [healthCount, dryCount, fireCount, offlineCount];

    

    this.apiService.OnCreateTankLogListener.subscribe({
      next: (data: any) => {
        console.log("OnCreatePeatlandSensorValueListener", data.value.data.onCreatePeatlandSensorValue);
         let sensorData = data.value.data.onCreatePeatlandSensorValue;
         sensorData.batPct = this.getBatteryLife(sensorData.bat);
         sensorData.dt = (new Date(sensorData.timestamp*1000)).toLocaleString();

         if(this.markerMap[sensorData.imei] == undefined){

          console.log("data received from unknown device");
          
    
         }else{
            console.log("marker already there");
           let marker = this.markerMap[sensorData.imei];
           let oldClas = marker.data.clas;
           marker.data = sensorData;
           marker.icon = this.markerIconAnomaly;
           marker.setIcon(this.getIcon(sensorData.oilLevel));
           this.updateDevicePieChart(sensorData.clas, oldClas);

           if(this.selectedDevice && this.selectedDevice.dev_eui === sensorData.dev_eui ){
             this.selectedDevice = sensorData;
           }
           this.sensorDataLabels.push('');
           this.sensorDataMoisture[0].data.push(sensorData.moisture);
           this.sensorDataTemp[0].data.push(sensorData.temperature);
           this.sensorDataGas[0].data.push(sensorData.gas);
           this.map.setCenter({lat: sensorData.latitude, lng: sensorData.longitude }); 
           marker.setAnimation(google.maps.Animation.BOUNCE);
           setTimeout(()=>{ marker.setAnimation(null);}, 2000);

         }

        // this.lineChartDataIAQ[0].data.push(this.selectedDevice.iaq);
        // this.lineChartLabelsIAQ.push(new Date( Date.parse(this.selectedDevice.createdAt)).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
        
      }
    })


  }

 updateDevicePieChart(newClas, oldClas){

  let healthCount = parseInt(this.pieChartData[0].toString());
  let dryCount = parseInt(this.pieChartData[1].toString());
  let fireCount = parseInt(this.pieChartData[2].toString());
  let offlineCount = parseInt(this.pieChartData[3].toString());

  switch(newClas){
    case 1: healthCount++;break;
    case 2: dryCount++;break;
    case 3: fireCount++;break;
    case 4: offlineCount++;break;
  }

  switch(oldClas){
    case 1: healthCount--;break;
    case 2: dryCount--;break;
    case 3: fireCount--;break;
    case 4: offlineCount--;break;
  }
  this.pieChartData = [healthCount, dryCount, fireCount, offlineCount];


 } 
 infoCallback(infowindow, marker,zone) {
    return function() { 
     let that = this;
     this.selectedDevice = marker.data;
     this.showDeviceData=true;
      
      console.log('clicked',this.selectedDevice);

      let data = marker.data || {temperature:'', moisture: '', gas: '', bat: '', createdAt:'', clas:1};
      let cssClass = "normal";
      let dt  = (new Date(data.timestamp*1000)).toLocaleString();

      switch(data.clas){
        case 1: cssClass = "normal";break;
        case 2: cssClass = "dry";break;
        case 3: cssClass = "fire";break;
      }
   
      infowindow.setContent(`<div class='info-window ${cssClass}'>
      <p>Temperature: ${data.temperature}</p>
      <p>Moisture: ${data.moisture}</p>
      <p>Carbon: ${data.gas}</p>
      <p>Battery: ${data.bat}</p>
      <p>Updated at ${dt}</p>
      </div>`)
      infowindow.open(this.map, marker); 
    }
      
 }

 selectItem = function(device:any){
  console.log("item clicked", device);
  this.selectedDevice = device;
  this.showDeviceData=true;
  this.loadSensorData();
  let marker = this.markerMap[device.imei];
  this.map.setCenter({lat: device.latitude, lng: device.longitude }); 
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(()=>{ marker.setAnimation(null);}, 2000);
 }

 loadSensorData = async function(){

  let sensorData;
  this.sensorDataTemp[0].data = [];
  this.sensorDataMoisture[0].data = [];
  this.sensorDataGas[0].data = [];
  this.sensorDataLabels = [];
  //console.log(this.sensorDataMap);
  if(!this.sensorDataMap[this.selectedDevice.imei]){
    sensorData = await (await this.apiService.ListTankLogs({imei: {eq :this.selectedDevice.imei}},100)).items;
    console.log("fetched log", sensorData);
    sensorData = sensorData.sort((m,n) => {return m.timestamp > n.timestamp ? 1:-1 });
   
    this.sensorDataMap[this.selectedDevice.imei] = sensorData;
    

   }else{
    sensorData = this.sensorDataMap[this.selectedDevice.imei] ;
   }
    
    
    
    sensorData.forEach((d)=>{
      let labels = sensorData.map(m => { return  ''});
      let temps = sensorData.map(m => { return  m.oilLevel});
      
      this.sensorDataTemp[0].data = temps;
      
      this.sensorDataLabels = labels;
      
    })

 }
}
