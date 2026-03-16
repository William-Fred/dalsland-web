"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's broken default marker icons when bundled with webpack
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LAT = 58.7176262;
const LNG = 12.0816585;

export default function PropertyMap() {
  useEffect(() => {
    const map = L.map("property-map").setView([LAT, LNG], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([LAT, LNG], { icon: markerIcon })
      .addTo(map)
      .bindPopup("Dalsland Cabin")
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return <div id="property-map" className="h-96 w-full rounded-xl z-0" />;
}
