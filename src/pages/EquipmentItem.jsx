import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

function EquipmentItem({ equipmentList, onEditEquipment }) {
  const { id } = useParams();
  const equipment = equipmentList.find(e => e.id === parseInt(id));
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [showEditLogModal, setShowEditLogModal] = useState(false);
  const [currentLog, setCurrentLog] = useState({ date: '', message: '', index: null });
  const [newLog, setNewLog] = useState({ date: '', message: '' });

  if (!equipment) {
    return <div>Equipment not found</div>;
  }

  const handleAddLog = (e) => {
    e.preventDefault();
    const updatedEquipment = {
      ...equipment,
      logs: [...(equipment.logs || []), { ...newLog, id: Date.now() }]
    };
    onEditEquipment(updatedEquipment);
    setShowAddLogModal(false);
    setNewLog({ date: '', message: '' });
  };

  const handleEditLog = (e) => {
    e.preventDefault();
    const updatedLogs = [...(equipment.logs || [])];
    updatedLogs[currentLog.index] = { ...currentLog };
    const updatedEquipment = {
      ...equipment,
      logs: updatedLogs
    };
    onEditEquipment(updatedEquipment);
    setShowEditLogModal(false);
  };

  const handleDeleteLog = (logIndex) => {
    const updatedLogs = (equipment.logs || []).filter((_, index) => index !== logIndex);
    const updatedEquipment = {
      ...equipment,
      logs: updatedLogs
    };
    onEditEquipment(updatedEquipment);
  };

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) w-full min-h-screen text-gray-800 dark:text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{equipment.name}</h1>
        <Link
          to="/hci-final/equipment"
          className="px-4 py-2 bg-(--main2) text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Back to Equipment
        </Link>
      </div>

      {/* Equipment Details */}
      <div className="bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-orange-600">Details</h2>
        <div className="space-y-3">
          <p><strong>Quantity:</strong> {equipment.quantity}</p>
          <p><strong>Group:</strong> {equipment.group}</p>
        </div>
      </div>

      {/* Maintenance Logs Section */}
      <div className="bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-orange-600">Maintenance Logs</h2>
          <button
            onClick={() => setShowAddLogModal(true)}
            className="px-3 py-1 text-xs bg-(--main1) text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Add Log
          </button>
        </div>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {equipment.logs && equipment.logs.length > 0 ? (
            equipment.logs.map((log, index) => (
              <div key={log.id || index} className="flex justify-between items-center bg-orange-50 dark:bg-orange-900/30 px-4 py-2 rounded-lg border border-orange-200 dark:border-orange-700">
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{log.date}</p>
                  <p className="text-gray-800 dark:text-gray-200 truncate">{log.message}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentLog({ ...log, index });
                      setShowEditLogModal(true);
                    }}
                    className="px-2 py-0.5 bg-(--main1) text-white text-xs rounded hover:bg-opacity-90 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLog(index)}
                    className="px-2 py-0.5 bg-(--main3) text-white text-xs rounded hover:bg-opacity-90 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No logs available</p>
          )}
        </div>
      </div>

      {/* Add Log Modal */}
      {showAddLogModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add Maintenance Log</h3>
              <button
                onClick={() => {
                  setShowAddLogModal(false);
                  setNewLog({ date: '', message: '' });
                }}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={newLog.date}
                  onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Message</label>
                <textarea
                  value={newLog.message}
                  onChange={(e) => setNewLog({ ...newLog, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddLogModal(false);
                    setNewLog({ date: '', message: '' });
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-(--main1) text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Add Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Log Modal */}
      {showEditLogModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Maintenance Log</h3>
              <button
                onClick={() => setShowEditLogModal(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleEditLog} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={currentLog.date}
                  onChange={(e) => setCurrentLog({ ...currentLog, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Message</label>
                <textarea
                  value={currentLog.message}
                  onChange={(e) => setCurrentLog({ ...currentLog, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditLogModal(false)}
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

export default EquipmentItem;
