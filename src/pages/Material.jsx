import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Material({ projectsList }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState({ id: '', name: '', amount: 0, projectName: '' });
  const [newMaterial, setNewMaterial] = useState({ name: '', amount: 0, projectName: '' });

  // Mock data for materials (replace with your actual data)
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Cement', amount: 10, projectName: 'Grading Campsite' },
    { id: 2, name: 'Bricks', amount: 20, projectName: 'Hummingbird Roadwork' },
    { id: 3, name: 'Stone', amount: 15, projectName: 'Paving Business Lot' },
  ]);

  const handleAddMaterial = (e) => {
    e.preventDefault();
    const newMaterialWithId = { ...newMaterial, id: materials.length + 1 };
    setMaterials([...materials, newMaterialWithId]);
    setShowAddModal(false);
    setNewMaterial({ name: '', amount: 0, projectName: '' });
  };

  const handleEditMaterial = (e) => {
    e.preventDefault();
    setMaterials(materials.map(mat => mat.id === currentMaterial.id ? currentMaterial : mat));
    setShowEditModal(false);
  };

  const handleDeleteMaterial = (id) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  const openEditModal = (material) => {
    setCurrentMaterial(material);
    setShowEditModal(true);
  };

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) min-h-screen w-full text-gray-800 dark:text-white p-6">
      {/* Header */}
      <div className="bg-(--light2) dark:bg-(--dark1) sticky top-0 z-10 flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold">Materials</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-(--main2) text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Add Material
        </button>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {materials.map((material) => (
          <div
            key={material.id}
            className="bg-white dark:bg-(--dark2) rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4
                       hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out"
          >
            <h3 className="text-lg font-semibold mb-2 truncate">{material.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Amount: {material.amount}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">Project: {material.projectName}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => openEditModal(material)}
                className="px-3 py-1 bg-(--main1) text-white text-xs rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMaterial(material.id)}
                className="px-3 py-1 bg-(--main3) text-white text-xs rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Material</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddMaterial} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Material Name</label>
                <input
                  type="text"
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Amount</label>
                <input
                  type="number"
                  value={newMaterial.amount}
                  onChange={(e) => setNewMaterial({ ...newMaterial, amount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Project</label>
                <select
                  value={newMaterial.projectName}
                  onChange={(e) => setNewMaterial({ ...newMaterial, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                >
                  <option value="">Select a project</option>
                  {projectsList.map(project => (
                    <option key={project.name} value={project.name}>{project.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-(--main1) text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Material Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Material</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditMaterial} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Material Name</label>
                <input
                  type="text"
                  value={currentMaterial.name}
                  onChange={(e) => setCurrentMaterial({ ...currentMaterial, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Amount</label>
                <input
                  type="number"
                  value={currentMaterial.amount}
                  onChange={(e) => setCurrentMaterial({ ...currentMaterial, amount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Project</label>
                <select
                  value={currentMaterial.projectName}
                  onChange={(e) => setCurrentMaterial({ ...currentMaterial, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                >
                  <option value="">Select a project</option>
                  {projectsList.map(project => (
                    <option key={project.name} value={project.name}>{project.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-(--main1) text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
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
