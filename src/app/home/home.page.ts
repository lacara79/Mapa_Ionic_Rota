import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

import * as L from 'leaflet';

import 'leaflet-routing-machine';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: any = L.Map;
  routingControl: any = L.Routing.Control;

  constructor() {}

  ngOnInit() {

  }
  async ionViewDidEnter() {

  }
  async ionViewWillEnter(){
    const coordinates = await Geolocation.getCurrentPosition();
    let lat = coordinates.coords.latitude;
    let lng = coordinates.coords.longitude;
    this.mapa(lat, lng);
  }


  mapa(lat: any, long:any) {
    const a = lat;
    const b = long;

    this.map = L.map('mapId', {
      center: [a, b],
      zoom: 16,
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'ETEC',
    }).addTo(this.map);


    const ondeestou = L.icon({
      iconUrl: '../../assets/marcador.png',
      iconSize: [38, 52], 
      iconAnchor: [20, 40], 
      popupAnchor: [-3, -40] 
    });

    L.marker({ lat: a, lng: b }, { icon: ondeestou }).addTo(this.map).bindPopup('Estou aqui');
    const options = {
      radius: 300,
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.1
    }

    
    L.circle({ lat: a, lng: b }, options).addTo(this.map);

    this.routingControl = L.Routing.control({
      waypoints: [
        L.latLng([lat, long]),
        L.latLng([lat - 0.01, long - 0.1]),
      ],
      show: false

    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);


  }


  ionViewDidLeave(): void {
    this.map.remove();
  }

}
