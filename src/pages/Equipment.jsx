import '../App.css';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useState } from 'react';

function Equipment({ equipmentList, onAddEquipment, onEditEquipment, onDeleteEquipment }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState({ id: null, name: '', group: 'group4', quantity: 1, logs: [], type: '', model: '', vin: '' });
  const [newEquipment, setNewEquipment] = useState({ name: '', group: 'group4', quantity: 1, logs: [], type: '', model: '', vin: '' });

  const getProjectName = (group) => projects.find(p => p.group === group)?.name || "Unassigned";

  const handleAddEquipment = (e) => {
    e.preventDefault();
    onAddEquipment({ ...newEquipment, id: equipmentList.length + 1 });
    setShowAddModal(false);
    setNewEquipment({ name: '', group: 'group4', quantity: 1, logs: [], type: '', model: '', vin: '' });
  };

  const handleEditEquipment = (e) => {
    e.preventDefault();
    onEditEquipment(currentEquipment);
    setShowEditModal(false);
  };

  const openEditModal = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentEquipment(item);
    setShowEditModal(true);
  };

  const handleDeleteEquipment = (e) => {
    e.preventDefault();
    if (currentEquipment && typeof currentEquipment.id !== 'undefined') {
      onDeleteEquipment(currentEquipment.id);
    }
    setShowDeleteModal(false);
  };

  const openDeleteModal = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentEquipment(item);
    setShowDeleteModal(true);
  };

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) min-h-screen w-full text-gray-800 dark:text-white p-6">
      {/* Header */}
      <div className="bg-(--light2) dark:bg-(--dark1) sticky top-0 z-10 flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold">Equipment</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-(--main2) text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Add Equipment
        </button>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {equipmentList.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-(--dark2) rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4
                       hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 ease-in-out"
          >
            <Link to={`/hci-final/equipment/${item.id}`} className="block">
              <h3 className="text-lg font-semibold mb-2 truncate">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{item.type}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Model: {item.model}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">VIN: {item.vin}</p>
            </Link>
            <div className="flex gap-2 mt-3">
              <button
                onClick={(e) => openEditModal(item, e)}
                className="px-3 py-1 bg-(--main1) text-white text-xs rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  openDeleteModal(item, e)
                }}
                className="px-3 py-1 bg-(--main3) text-white text-xs rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Equipment</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddEquipment} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Equipment Name</label>
                <input
                  type="text"
                  value={newEquipment.name}
                  onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Type</label>
                <input
                  type="text"
                  value={newEquipment.type}
                  onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Model</label>
                <input
                  type="text"
                  value={newEquipment.model}
                  onChange={(e) => setNewEquipment({ ...newEquipment, model: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">VIN</label>
                <input
                  type="text"
                  value={newEquipment.vin}
                  onChange={(e) => setNewEquipment({ ...newEquipment, vin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
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
                  className="px-4 py-2 bg-(--main2) text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Equipment Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Equipment</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditEquipment} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Equipment Name</label>
                <input
                  type="text"
                  value={currentEquipment.name}
                  onChange={(e) => setCurrentEquipment({ ...currentEquipment, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Type</label>
                <input
                  type="text"
                  value={currentEquipment.type}
                  onChange={(e) => setCurrentEquipment({ ...currentEquipment, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Model</label>
                <input
                  type="text"
                  value={currentEquipment.model}
                  onChange={(e) => setCurrentEquipment({ ...currentEquipment, model: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">VIN</label>
                <input
                  type="text"
                  value={currentEquipment.vin}
                  onChange={(e) => setCurrentEquipment({ ...currentEquipment, vin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              {/* <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={currentEquipment.quantity}
                  onChange={(e) => setCurrentEquipment({ ...currentEquipment, quantity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Project</label>
                <select
                  value={currentEquipment.group}
                  onChange={(e) => setCurrentEquipment({ ...currentEquipment, group: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project.group} value={project.group}>{project.name}</option>
                  ))}
                  <option value="group4">Unassigned</option>
                </select>
              </div> */}
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
      
      {/* Delete Equipment Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Delete Equipment</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleDeleteEquipment} className="space-y-4">
              <div>
                <p>Are you sure you want to delete this equipment?</p>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-(--main1) text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Equipment;
