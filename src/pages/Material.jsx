import '../App.css';
import { projects } from '../data/projects';
import { useState } from 'react';

function Material() {
  const [materials, setMaterials] = useState(
    projects.flatMap(project =>
      project.materials.map((material, index) => ({
        ...material,
        id: `${project.name}-${index}`,
        projectName: project.name
      }))
    )
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState({ id: '', name: '', amount: 0, projectName: '' });
  const [newMaterial, setNewMaterial] = useState({ name: '', amount: 0, projectName: '' });

  const handleAddMaterial = (e) => {
    e.preventDefault();
    setMaterials([...materials, { ...newMaterial, id: `new-${materials.length}` }]);
    setShowAddModal(false);
    setNewMaterial({ name: '', amount: 0, projectName: '' });
  };

  const handleEditMaterial = (e) => {
    e.preventDefault();
    setMaterials(materials.map(mat => mat.id === currentMaterial.id ? currentMaterial : mat));
    setShowEditModal(false);
  };

  const handleDeleteMaterial = (id) => setMaterials(materials.filter(material => material.id !== id));

  const openEditModal = (material) => {
    setCurrentMaterial(material);
    setShowEditModal(true);
  };

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) w-full h-screen text-black dark:text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Materials</h1>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-(--main2) text-white rounded-xl hover:bg-(--main3) transition">
          Add Material
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {materials.map((material) => (
          <div key={material.id} className="bg-white dark:bg-(--dark2) p-4 rounded-xl shadow border border-gray-200">
            <h3 className="text-xl font-semibold">{material.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">Amount: {material.amount}</p>
            <p className="text-gray-600 dark:text-gray-300">Project: {material.projectName}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => openEditModal(material)} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Edit
              </button>
              <button onClick={() => handleDeleteMaterial(material.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Material */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-orange-300 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Add New Material</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleAddMaterial} className="space-y-4 text-black">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Material Name</label>
                <input
                  type="text"
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Amount</label>
                <input
                  type="number"
                  value={newMaterial.amount}
                  onChange={(e) => setNewMaterial({ ...newMaterial, amount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Project</label>
                <select
                  value={newMaterial.projectName}
                  onChange={(e) => setNewMaterial({ ...newMaterial, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project.name} value={project.name}>{project.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-200 rounded-xl text-gray-800 hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Material */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-orange-300 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Edit Material</h3>
              <button onClick={() => setShowEditModal(false)} className="p-1 text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleEditMaterial} className="space-y-4 text-black">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Material Name</label>
                <input
                  type="text"
                  value={currentMaterial.name}
                  onChange={(e) => setCurrentMaterial({ ...currentMaterial, name: e.target.value })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Amount</label>
                <input
                  type="number"
                  value={currentMaterial.amount}
                  onChange={(e) => setCurrentMaterial({ ...currentMaterial, amount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Project</label>
                <select
                  value={currentMaterial.projectName}
                  onChange={(e) => setCurrentMaterial({ ...currentMaterial, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project.name} value={project.name}>{project.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-200 rounded-xl text-gray-800 hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Material;
