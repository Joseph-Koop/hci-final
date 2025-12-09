import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

function Project({ equipmentList, employeeList, projectsList, onDeleteProject, onAddLog, onEditProjectMaterials, onEditProjectCompletion, onEditLog, onDeleteLog }) {
  const { id } = useParams();
  const project = projectsList.find(p => p.id === parseInt(id));
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [showEditLogModal, setShowEditLogModal] = useState(false);
  const [showEditMaterialModal, setShowEditMaterialModal] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState({ name: '', amount: 0, index: null });
  const [currentLog, setCurrentLog] = useState({ date: '', message: '', index: null });
  const [newLog, setNewLog] = useState({ date: '', message: '' });
  const [completionPercentage, setCompletionPercentage] = useState(project ? project.completion_percentage * 100 : 0);

  if (!project) {
    return <Navigate to="/hci-final/projects" replace />;
  }

  const assignedEquipment = equipmentList.filter(item => item.group === project.group);
  const assignedEmployees = employeeList.filter(item => item.group === project.group);

  const handleAddLog = (e) => {
    e.preventDefault();
    const logWithId = {
      date: newLog.date,
      message: newLog.message,
      id: Date.now()
    };
    onAddLog(project.id, logWithId);
    setShowAddLogModal(false);
    setNewLog({ date: '', message: '' });
  };

  const handleEditLog = (e) => {
    e.preventDefault();
    onEditLog(project.id, currentLog.index, { date: currentLog.date, message: currentLog.message });
    setShowEditLogModal(false);
  };

  const handleDeleteLog = (logId) => {
    const logIndex = project.logs.findIndex(log => log.id === logId);
    onDeleteLog(project.id, logIndex);
  };

  const handleCompletionChange = (e) => {
    const newCompletion = parseFloat(e.target.value);
    setCompletionPercentage(newCompletion);
    onEditProjectCompletion(project.id, newCompletion / 100);
  };

  const handleEditMaterial = (e) => {
    e.preventDefault();
    const updatedMaterials = [...project.materials];
    updatedMaterials[currentMaterial.index] = { ...currentMaterial, name: currentMaterial.name, amount: currentMaterial.amount };
    onEditProjectMaterials(project.id, updatedMaterials);
    setShowEditMaterialModal(false);
  };

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) w-full min-h-screen text-gray-800 dark:text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <div className="flex gap-4">
          <Link
            to="/hci-final/projects"
            className="px-4 py-2 bg-(--main2) text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Back to Projects
          </Link>
          <button
            onClick={() => onDeleteProject(project.id)}
            className="px-3 py-1 text-xs bg-(--main3) text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Delete Project
          </button>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Details Section */}
        <section className="bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p><strong>Completion:</strong></p>
              <input
                type="range"
                min="0"
                max="100"
                value={completionPercentage}
                onChange={handleCompletionChange}
                className="w-2/3"
              />
              <span>{Math.round(completionPercentage)}%</span>
            </div>
            <p><strong>Start Date:</strong> {project.start_date}</p>
            <p><strong>Expected Completion:</strong> {project.expected_completion}</p>
            <p><strong>Location:</strong> X: {project.locationX}, Y: {project.locationY}</p>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Equipment</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {assignedEquipment.length > 0 ? (
              assignedEquipment.map((item) => {
                const code = item.name.substring(0, 2);
                const imgSrc = `../${code.toLowerCase()}.png`;
                return (
                  <div key={item.id} className="flex flex-col items-center">
                    <img src={imgSrc} alt={item.name} className="w-16 h-16 object-contain mb-1" />
                    <p className="text-gray-700 dark:text-gray-300 font-medium truncate">{item.name}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No equipment assigned</p>
            )}
          </div>
        </section>

        {/* Employees Section */}
        <section className="bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Employees</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {assignedEmployees.length > 0 ? (
              assignedEmployees.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <img src="profile.png" alt={item.name} className="w-16 h-16 rounded-full mb-1" />
                  <p className="text-gray-700 dark:text-gray-300 font-medium truncate">{item.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No employees assigned</p>
            )}
          </div>
        </section>

        {/* Materials Section */}
        <section className="bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Materials</h2>
          <div className="space-y-3">
            {project.materials.length > 0 ? (
              project.materials.map((material, index) => (
                <div key={index} className="flex justify-between items-center bg-orange-50 dark:bg-orange-900/30 px-4 py-2 rounded-lg border border-orange-200 dark:border-orange-700">
                  <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{material.name}</p>
                  <p className="text-gray-800 dark:text-gray-200">{material.amount}</p>
                  <button
                    onClick={() => {
                      setCurrentMaterial({ ...material, index });
                      setShowEditMaterialModal(true);
                    }}
                    className="px-2 py-0.5 bg-(--main1) text-white text-xs rounded hover:bg-opacity-90 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No materials assigned</p>
            )}
          </div>
        </section>

        {/* Progress Logs Section */}
        <section className="bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-orange-600">Progress Logs</h2>
            <button
              onClick={() => setShowAddLogModal(true)}
              className="px-3 py-1 text-xs bg-(--main1) text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Add Log
            </button>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {project.logs.length > 0 ? (
              project.logs.map((log, index) => (
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
                      className="px-3 py-1 text-xs bg-(--main1) text-white rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="px-3 py-1 text-xs bg-(--main3) text-white rounded-lg hover:bg-opacity-90 transition-colors"
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
        </section>
      </div>

      {/* Add Log Modal */}
      {showAddLogModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add Progress Log</h3>
              <button
                onClick={() => setShowAddLogModal(false)}
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
                  onClick={() => setShowAddLogModal(false)}
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
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Log</h3>
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

      {/* Edit Material Modal */}
      {showEditMaterialModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Material</h3>
              <button
                onClick={() => setShowEditMaterialModal(false)}
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
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Amount</label>
                <input
                  type="number"
                  min="0"
                  value={currentMaterial.amount}
                  onChange={(e) => setCurrentMaterial({ ...currentMaterial, amount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditMaterialModal(false)}
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

export default Project;
