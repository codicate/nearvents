import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { EventService } from 'services/event.service';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { DataService } from 'services/data.service'
import { Router } from '@angular/router';


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
  events = []

  private onPopupClick(e){
    console.log(e)
    this.router.navigateByUrl('tabs/tabs/eventpage/' + e,{
      replaceUrl: true,
    });
    this.dataService.getCurrentID(e);
  }
  private initMap(): void {
    this.map = L.map('map', {
      renderer: L.canvas(),
      center: [43.128806,-77.630220],
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    for (let e of this.events) {
      const popup = L.DomUtil.create('div', 'infoWindow');
      popup.innerHTML = `<center> ${e.name} </center> <img src="${e.banner}"> `;
      const marker = new L.Marker(e.location);
      marker.bindPopup(popup);
      L.DomEvent.addListener(popup, 'click', () => this.onPopupClick(e.creatorPlayerID  ));
      marker.addTo(this.map);
    }
    setTimeout(()=> { this.map.invalidateSize()}, 500);

  }

  constructor(
    private router: Router,
    private eventService: EventService,
    private dataService: DataService
  ) { }

  async ngOnInit() {
  }

  async ngAfterViewInit() {
    this.events = await this.eventService.getAllEvents();
    this.initMap();
  }
}