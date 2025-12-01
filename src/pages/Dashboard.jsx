import '../App.css';
import { Link } from 'react-router-dom';
import { projects, unassigned, equipment, employees } from '../data/projects';
import ProjectBox from '../components/ProjectBox';
import { useState } from 'react';

function Dashboard() {

  const [equipmentList, setEquipmentList] = useState(equipment);
  const [employeeList, setEmployeeList] = useState(employees);

  const [showModal, setShowModal] = useState(false);

  const handleDrop = (itemId, itemType, sourceGroup, targetGroup) => {
    if (itemType === "equipment") {
      setEquipmentList(prev => prev.map(item => 
        item.id === parseInt(itemId) ? { ...item, group: targetGroup } : item
      ));
    } else if (itemType === "employees") {
      setEmployeeList(prev => prev.map(item => 
        item.id === parseInt(itemId) ? { ...item, group: targetGroup } : item
      ));
    }
  };

  
  return (
    
    <div className="bg-(--light2) dark:bg-(--dark1) grid grid-rows-[1fr_6fr_1fr] w-full h-screen text-black dark:text-white">
      <div className="flex justify-between items-center">
        <button className="text-center gap-3 p-3 m-3 rounded-xl hover:bg-(--main3) hover:cursor-pointer bg-(--main2) transition" onClick={() => setShowModal(true)}>New Project</button>
        <Link to="/map" className="text-center gap-3 p-3 m-3 rounded-xl hover:bg-(--main3) bg-(--main2) transition">Map View</Link>
      </div>

      <div>
        <div className="flex justify-between gap-10 p-6 overflow-auto">
          <div className="flex flex-wrap gap-10">
            { projects.map((project, index) => (
              <ProjectBox 
                key={project.group} 
                data={project} 
                equipment={equipmentList}
                employees={employeeList}
                onDrop={handleDrop}
              />
            ))}
          </div>
          <div className="flex-shrink-0 w-80">
            <ProjectBox 
              data={unassigned} 
              equipment={equipmentList}
              employees={employeeList}
              onDrop={handleDrop}
            />
          </div>
        </div>
      </div>

      <div></div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-orange-300 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">New Project</h3>

              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 hover:cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4 text-black">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Project Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Expected Completion</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Location Coordinates</label>
                <div className="flex gap-3">
                  <input
                    type="number" step="0.000001" placeholder="X"
                    className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    type="number" step="0.000001" placeholder="Y"
                    className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-xl text-gray-800 hover:bg-gray-300 hover:cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 hover:cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Dashboard;
