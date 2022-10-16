import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { EventService } from 'services/event.service';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { DataService } from 'services/data.service';
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
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {
  events = [];
  private map;

  constructor(
    private router: Router,
    private eventService: EventService,
    private dataService: DataService
  ) {}

  async ngAfterViewInit() {
    this.events = await this.eventService.getAllEvents();
    this.initMap();
  }

  private onPopupClick(e) {
    console.log(e);
    this.router.navigateByUrl('tabs/tabs/eventpage/' + e, {
      replaceUrl: true,
    });
    this.dataService.getCurrentID(e);
  }
  private initMap(): void {
    this.map = L.map('map', {
      renderer: L.canvas(),
      center: [43.128806, -77.63022],
      zoom: 16,
    });

    const tiles = L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 20,
        minZoom: 5,
      }
    );

    tiles.addTo(this.map);
    for (const e of this.events) {
      const popup = L.DomUtil.create('div', 'infoWindow');
      popup.innerHTML = `<div style="width:max-content;display:flex;flex-direction:column;justify-content:center;gap:10px;padding-top:20px;"><img width="150px" height="200px" style="object-fit:cover;" src="${e.banner}"><center style="font-size:1rem;"> ${e.name} </center></div>`;
      const marker = new L.Marker(e.location);
      marker.bindPopup(popup);
      L.DomEvent.addListener(popup, 'click', () => {
        this.onPopupClick(e.creatorPlayerID);
      });
      marker.addTo(this.map);
    }
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }
}
