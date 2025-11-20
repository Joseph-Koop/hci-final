import '../App.css';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, useMap } from 'react-leaflet';

function Map() {

  const mapRef = useRef(null);

  useEffect(() => {

    const map = L.map(mapRef.current).setView([17.25, -88.76], 8);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([16.96, -88.22]).addTo(map).bindPopup('<h3 className="text-2xl font-semibold text-gray-800 mb-2 border-b border-orange-300 pb-2">Hummingbird Roadwork</h3>').openPopup();

    L.marker([17.15, -89.07]).addTo(map).bindPopup('<h3 className="text-2xl font-semibold text-gray-800 mb-2 border-b border-orange-300 pb-2">Grading Campsite</h3>').openPopup();

    L.marker([18.08, -88.56]).addTo(map).bindPopup('<h3 className="text-2xl font-semibold text-gray-800 mb-2 border-b border-orange-300 pb-2">Paving Business Lot</h3>').openPopup();

    return () => {
      map.remove(); // Clean up map on unmount
    };
  }, []);

  return (
    
    <div className="bg-(--light2) dark:bg-(--dark1) grid grid-rows-[1fr_5fr_1fr] w-full h-screen text-black dark:text-white">
      <div>Map</div>
      <div ref={ mapRef } className="w-full">
        
      </div>
      <div className="flex flex-row-reverse items-end">
        <Link to="/" className="text-center gap-3 p-3 m-3 rounded-xl hover:bg-(--main3) bg-(--main2) transition">Dashboard View</Link>
      </div>
      
    </div>
  );
}

export default Map;