import '../App.css';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ projectsList }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !projectsList) return;

    const map = L.map(mapRef.current).setView([17.25, -88.76], 8);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const markers = [
      { coords: [16.96, -88.22], id: 2, name: "Hummingbird Roadwork" },
      { coords: [17.15, -89.07], id: 1, name: "Grading Campsite" },
      { coords: [18.08, -88.56], id: 3, name: "Paving Business Lot" },
    ];

    markers.forEach((m) => {
      const marker = L.marker(m.coords).addTo(map);
      const popup = L.popup({ autoClose: false }).setContent(
        `<a href="/hci-final/projects/${m.id}" class="text-sm font-semibold text-black mb-2 border-b border-orange-300 pb-2 hover:text-orange-500">${m.name}</a>`
      );
      marker.bindPopup(popup).openPopup();
    });

    return () => {
      map.remove();
    };
  }, [projectsList]);

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) grid grid-rows-[1fr_6fr_1fr] w-full h-screen text-white">
      <div className="bg-(--light2) dark:bg-(--dark1) sticky top-0 z-10 flex justify-end items-center">
        <Link to="/hci-final/projects" className="text-center gap-3 p-3 m-3 rounded-xl bg-(--main2) transition">
          Project View
        </Link>
      </div>
      <div ref={mapRef} className="m-3 h-full w-full" />
      <div></div>
    </div>
  );
}

export default Map;


