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

    projectsList.forEach((project) => {
      const marker = L.marker([project.locationX, project.locationY]).addTo(map);
      const popupContent = `
        <a href="/hci-final/projects/${project.id}" class="text-md font-semibold text-black mb-2 border-b border-orange-300 pb-2 hover:text-orange-500">
          ${project.name}
        </a>
      `;
      marker.bindPopup(popupContent);
    });

    return () => {
      map.remove();
    };
  }, [projectsList]);

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) grid grid-rows-[1fr_6fr_1fr] w-full h-screen text-black dark:text-white">
      <div className="flex justify-end items-center">
        <Link to="/hci-final/projects" className="text-center gap-3 p-3 m-3 rounded-xl hover:bg-(--main3) bg-(--main2) transition">
          Project View
        </Link>
      </div>
      <div ref={mapRef} className="m-3 h-full w-full" />
      <div></div>
    </div>
  );
}

export default Map;
