import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements AfterViewInit {
  private map;

  private initMap(): void {
    this.map = L.map('map', {
      renderer: L.canvas(),
      center: [ 43.132919,-77.635225],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);


    const marker = new L.Marker([43.129064,-77.628996]);
    marker.addTo(this.map)
    setTimeout(()=> { this.map.invalidateSize()}, 500);

  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}