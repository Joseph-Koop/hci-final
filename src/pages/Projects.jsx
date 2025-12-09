import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { unassigned } from '../data/projects';
import ProjectBox from '../components/ProjectBox';
import { useState } from 'react';

function Projects({ equipmentList, employeeList, projectsList, onDrop, onAddProject, onDeleteProject }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Materials for new projects
  const generateRandomMaterials = () => {
    const materials = [
      { name: "maul", amount: 0 },
      { name: "cement", amount: 0 },
      { name: "stone", amount: 0 },
      { name: "bricks", amount: 0 }
    ];
    return materials.map(material => ({
      ...material,
      amount: Math.floor(Math.random() * 10)
    }));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const newProject = {
      name: e.target.projectName.value,
      id: projectsList.length + 1,
      group: `group${projectsList.length + 1}`,
      locationX: parseFloat(e.target.locationX.value),
      locationY: parseFloat(e.target.locationY.value),
      materials: generateRandomMaterials(),
      completion_percentage: 0,
      start_date: e.target.startDate.value,
      expected_completion: e.target.expectedCompletion.value,
      logs: [],
    };
    onAddProject(newProject);
    setShowModal(false);
  };

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) min-h-screen w-full text-gray-800 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-(--main2) text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            New Project
          </button>
          <Link
            to="/hci-final/map"
            className="px-4 py-2 bg-(--main2) text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Map View
          </Link>
        </div>
      </div>

      {/* Unassigned Resources Section */}
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-4">Unassigned Resources</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Unassigned
              </h3>
              {/* Equipment Section */}
              <div className="mb-3">
                <h4 className="text-sm font-medium text-(--main1) dark:text-orange-300 mb-2">Equipment</h4>
                <div className="grid grid-cols-4 gap-2">
                  {equipmentList
                    .filter(item => item.group === unassigned.group)
                    .map(item => {
                      const code = item.name.substring(0, 2);
                      const imgSrc = `${code.toLowerCase()}.png`;
                      return (
                        <div
                          key={item.id}
                          className="flex flex-col items-center cursor-grab active:cursor-grabbing hover:opacity-80 p-1"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.effectAllowed = "move";
                            e.dataTransfer.setData("itemId", item.id);
                            e.dataTransfer.setData("itemType", "equipment");
                            e.dataTransfer.setData("sourceGroup", unassigned.group);
                          }}
                        >
                          <img src={imgSrc} alt={item.name} className="w-10 h-10 object-contain mb-1" />
                          <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{item.name}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* Employees Section */}
              <div className="mb-3">
                <h4 className="text-sm font-medium text-(--main1) dark:text-orange-300 mb-2">Employees</h4>
                <div className="grid grid-cols-4 gap-2">
                  {employeeList
                    .filter(item => item.group === unassigned.group)
                    .map(item => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center cursor-grab active:cursor-grabbing hover:opacity-80 p-1"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.effectAllowed = "move";
                          e.dataTransfer.setData("itemId", item.id);
                          e.dataTransfer.setData("itemType", "employees");
                          e.dataTransfer.setData("sourceGroup", unassigned.group);
                        }}
                      >
                        <img src="profile.png" alt={item.name} className="w-10 h-10 rounded-full mb-1" />
                        <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{item.name}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Projects Section */}
      <div className="px-6">
        <h2 className="text-xl font-semibold mb-4">All Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projectsList.map((project) => (
            <div key={project.id} className="relative group">
              <ProjectBox
                data={project}
                equipment={equipmentList}
                employees={employeeList}
                onDrop={onDrop}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDeleteProject(project.id);
                }}
                className="absolute top-2 right-2 px-2 py-1 bg-(--main3) text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-90"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">New Project</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Project Name</label>
                <input
                  name="projectName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Expected Completion</label>
                <input
                  name="expectedCompletion"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Location Coordinates</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="locationX"
                    type="number"
                    step="0.000001"
                    placeholder="Latitude"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                    required
                  />
                  <input
                    name="locationY"
                    type="number"
                    step="0.000001"
                    placeholder="Longitude"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-(--main1) text-white rounded-lg hover:bg-opacity-90 transition-colors"
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

export default Projects;
