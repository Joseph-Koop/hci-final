import '../App.css';
import { equipment, projects } from '../data/projects';
import { useState } from 'react';

function Equipment() {
  const [equipmentList, setEquipmentList] = useState(
    equipment.map(item => ({ ...item, quantity: 1 }))
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState({ id: null, name: '', group: 'group4', quantity: 1 });
  const [newEquipment, setNewEquipment] = useState({ name: '', group: 'group4', quantity: 1 });

  const getProjectName = (group) => projects.find(p => p.group === group)?.name || "Unassigned";

  const handleAddEquipment = (e) => {
    e.preventDefault();
    setEquipmentList([...equipmentList, { ...newEquipment, id: equipmentList.length + 1 }]);
    setShowAddModal(false);
    setNewEquipment({ name: '', group: 'group4', quantity: 1 });
  };

  const handleEditEquipment = (e) => {
    e.preventDefault();
    setEquipmentList(equipmentList.map(item => item.id === currentEquipment.id ? currentEquipment : item));
    setShowEditModal(false);
  };

  const handleDeleteEquipment = (id) => setEquipmentList(equipmentList.filter(item => item.id !== id));

  const openEditModal = (item) => {
    setCurrentEquipment(item);
    setShowEditModal(true);
  };

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) w-full h-screen text-black dark:text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Equipment</h1>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-(--main2) text-white rounded-xl hover:bg-(--main3) transition">
          Add Equipment
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {equipmentList.map((item) => (
          <div key={item.id} className="bg-white dark:bg-(--dark2) p-4 rounded-xl shadow border border-gray-200">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
            <p className="text-gray-600 dark:text-gray-300">{getProjectName(item.group)}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => openEditModal(item)} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Edit
              </button>
              <button onClick={() => handleDeleteEquipment(item.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Equipment */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-orange-300 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Add New Equipment</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleAddEquipment} className="space-y-4 text-black">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Equipment Name</label>
                <input
                  type="text"
                  value={newEquipment.name}
                  onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={newEquipment.quantity}
                  onChange={(e) => setNewEquipment({ ...newEquipment, quantity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Project</label>
                <select
                  value={newEquipment.group}
                  onChange={(e) => setNewEquipment({ ...newEquipment, group: e.target.value })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project.group} value={project.group}>{project.name}</option>
                  ))}
                  <option value="group4">Unassigned</option>
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

      {/* Edit Equipment */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-orange-300 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Edit Equipment</h3>
              <button onClick={() => setShowEditModal(false)} className="p-1 text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleEditEquipment} className="space-y-4 text-black">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Equipment Name</label>
                <input
                  type="text"
                  value={currentEquipment.name}
                  onChange={(e) => setCurrentEquipment({ ...currentEquipment, name: e.target.value })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={currentEquipment.quantity}
                  onChange={(e) => setCurrentEquipment({ ...currentEquipment, quantity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Project</label>
                <select
                  value={currentEquipment.group}
                  onChange={(e) => setCurrentEquipment({ ...currentEquipment, group: e.target.value })}
                  className="w-full px-3 py-2 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project.group} value={project.group}>{project.name}</option>
                  ))}
                  <option value="group4">Unassigned</option>
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

export default Equipment;
