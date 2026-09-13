"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface PropertyDetailMapClientProps {
  latitud: number;
  longitud: number;
  titulo: string;
  ciudad: string;
  barrio: string;
}

export default function PropertyDetailMapClient({
  latitud,
  longitud,
  titulo,
  ciudad,
  barrio,
}: PropertyDetailMapClientProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([latitud, longitud], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([latitud, longitud], {
      icon: L.icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    });

    marker
      .bindPopup(
        `<div class="p-2">
          <p class="font-semibold text-gray-900">${titulo}</p>
          <p class="text-sm text-gray-600">${barrio}, ${ciudad}</p>
        </div>`
      )
      .addTo(map);

    marker.openPopup();

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitud, longitud, titulo, ciudad, barrio]);

  return <div ref={mapRef} className="w-full h-full" />;
}
