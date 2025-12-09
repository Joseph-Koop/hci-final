import '../App.css';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Dashboard() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the mini map
    const miniMap = L.map(mapRef.current).setView([17.25, -88.76], 7);

    // Add the OpenStreetMap tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(miniMap);

    // Add markers for each project
    projects.forEach(project => {
      if (project.locationX && project.locationY) {
        L.marker([project.locationX, project.locationY]).addTo(miniMap);
      }
    });

    // Disable map interactions for the preview
    miniMap.dragging.disable();
    miniMap.touchZoom.disable();
    miniMap.doubleClickZoom.disable();
    miniMap.scrollWheelZoom.disable();
    miniMap.boxZoom.disable();
    miniMap.keyboard.disable();

    // Clean up the mini map on unmount
    return () => {
      miniMap.remove();
    };
  }, []);

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) w-full h-screen text-black dark:text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
      <div className="overflow-x-auto bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200 mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-(--dark2)">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Completion</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expected Completion</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-(--dark1) divide-y divide-gray-200 dark:divide-gray-700">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-(--dark2)">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/hci-final/projects/${project.id}`}
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 font-medium"
                  >
                    {project.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{Math.round(project.completion_percentage * 100)}%</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.start_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.expected_completion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-xl font-semibold mb-4">Map View</h2>
      <Link to="/hci-final/map" className="block">
        <div className="bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
          <div ref={mapRef} className="h-64 bg-gray-100 dark:bg-gray-700"></div>
        </div>
      </Link>
    </div>
  );
}

export default Dashboard;
