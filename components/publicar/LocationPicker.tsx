"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationPickerProps {
  latitud: string;
  longitud: string;
  ciudad: string;
  barrio: string;
  direccion: string;
  onLocationChange: (lat: number, lng: number) => void;
  onUbicacionChange: (ciudad: string, barrio: string, direccion: string) => void;
}

export function LocationPicker({
  latitud,
  longitud,
  ciudad,
  barrio,
  direccion,
  onLocationChange,
  onUbicacionChange,
}: LocationPickerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const lat = latitud ? parseFloat(latitud) : 4.7;
  const lng = longitud ? parseFloat(longitud) : -74.05;

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([lat, lng], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(mapRef.current);

      markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(mapRef.current);

      markerRef.current.on("dragend", () => {
        if (markerRef.current) {
          const pos = markerRef.current.getLatLng();
          onLocationChange(pos.lat, pos.lng);
        }
      });

      mapRef.current.on("click", (e) => {
        if (markerRef.current) {
          markerRef.current.setLatLng(e.latlng);
          onLocationChange(e.latlng.lat, e.latlng.lng);
        }
      });

      setMapLoaded(true);
    }

    if (mapLoaded && markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      mapRef.current?.setView([lat, lng], 13);
    }
  }, [lat, lng, mapLoaded, onLocationChange]);

  return (
    <div className="space-y-4">
      <div id="map" className="h-80 rounded-lg border border-gray-300" />

      <p className="text-xs text-gray-500">Arrastra el marcador o haz clic en el mapa para cambiar la ubicación</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad *</label>
          <input
            type="text"
            value={ciudad}
            onChange={(e) => onUbicacionChange(e.target.value, barrio, direccion)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Bogotá"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Barrio *</label>
          <input
            type="text"
            value={barrio}
            onChange={(e) => onUbicacionChange(ciudad, e.target.value, direccion)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Chapinero"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Dirección *</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => onUbicacionChange(ciudad, barrio, e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="Calle 50 # 10-20"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Latitud</label>
          <input
            type="number"
            value={latitud}
            readOnly
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-50"
            step="0.000001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Longitud</label>
          <input
            type="number"
            value={longitud}
            readOnly
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-50"
            step="0.000001"
          />
        </div>
      </div>
    </div>
  );
}
