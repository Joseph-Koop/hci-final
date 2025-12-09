import '../App.css';
import { employees, projects } from '../data/projects';
import { useState } from 'react';

function Employee() {
  const [employeeList, setEmployeeList] = useState(employees);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({ id: null, name: '', position: '', group: 'group4' });
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', group: 'group4' });

  const getProjectName = (group) => projects.find(p => p.group === group)?.name || "Unassigned";

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setEmployeeList([...employeeList, { ...newEmployee, id: employeeList.length + 1 }]);
    setShowAddModal(false);
    setNewEmployee({ name: '', position: '', group: 'group4' });
  };

  const handleEditEmployee = (e) => {
    e.preventDefault();
    setEmployeeList(employeeList.map(emp => emp.id === currentEmployee.id ? currentEmployee : emp));
    setShowEditModal(false);
  };

  const handleDeleteEmployee = (id) => setEmployeeList(employeeList.filter(employee => employee.id !== id));

  const openEditModal = (employee) => {
    setCurrentEmployee(employee);
    setShowEditModal(true);
  };

  return (
    <div className="bg-(--light2) dark:bg-(--dark1) w-full h-screen text-gray-800 dark:text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-(--main2) text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Add Employee
        </button>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-(--dark2) rounded-xl shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-(--dark2)">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-(--dark1) divide-y divide-gray-200 dark:divide-gray-700">
            {employeeList.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{employee.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{employee.position || 'Not specified'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{getProjectName(employee.group)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openEditModal(employee)}
                    className="px-3 py-1 bg-(--main1) text-white text-xs rounded-lg hover:bg-opacity-90 transition-colors mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="px-3 py-1 bg-(--main3) text-white text-xs rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Employee</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                ✕
              </button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-4 text-gray-800 dark:text-white">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Position</label>
                <input
                  type="text"
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Project</label>
                <select
                  value={newEmployee.group}
                  onChange={(e) => setNewEmployee({ ...newEmployee, group: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
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

      {/* Edit Employee Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white dark:bg-(--dark2) rounded-xl w-full max-w-md p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Employee</h3>
              <button onClick={() => setShowEditModal(false)} className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                ✕
              </button>
            </div>
            <form onSubmit={handleEditEmployee} className="space-y-4 text-gray-800 dark:text-white">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={currentEmployee.name}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Position</label>
                <input
                  type="text"
                  value={currentEmployee.position}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Project</label>
                <select
                  value={currentEmployee.group}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, group: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-(--main1) dark:bg-(--dark2) dark:text-white"
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

export default Employee;
