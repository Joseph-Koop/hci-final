import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Equipment from './pages/Equipment';
import EquipmentItem from './pages/EquipmentItem';
import Employee from './pages/Employee';
import Material from './pages/Material';
import Project from './pages/Project';
import Projects from './pages/Projects';
import { projects as initialProjects, equipment as initialEquipment, employees as initialEmployees } from './data/projects';

function App() {
  const [mode, setMode] = useState('dark');
  const [projectsList, setProjectsList] = useState(initialProjects);
  const [equipmentList, setEquipmentList] = useState(initialEquipment);
  const [employeeList, setEmployeeList] = useState(initialEmployees);

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

  const handleAddProject = (newProject) => {
    setProjectsList([...projectsList, newProject]);
  };

  const handleDeleteProject = (id) => {
    setProjectsList(prev => prev.filter(project => project.id !== id));
  };

  const handleAddEquipment = (newEquipment) => {
    setEquipmentList([...equipmentList, newEquipment]);
  };

  const handleEditEquipment = (updatedEquipment) => {
    setEquipmentList(prev => prev.map(item =>
      item.id === updatedEquipment.id ? updatedEquipment : item
    ));
  };

  const handleDeleteEquipment = (id) => {
    setEquipmentList(prev => prev.filter(item => item.id !== id));
  };

  const handleAddLog = (projectId, newLog) => {
    setProjectsList(prev =>
      prev.map(project =>
        project.id === projectId
          ? { ...project, logs: [...project.logs, newLog] }
          : project
      )
    );
  };

  const handleEditLog = (projectId, logIndex, updatedLog) => {
    setProjectsList(prev =>
      prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              logs: project.logs.map((log, index) =>
                index === logIndex ? updatedLog : log
              )
            }
          : project
      )
    );
  };

  const handleDeleteLog = (projectId, logIndex) => {
    setProjectsList(prev =>
      prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              logs: project.logs.filter((_, index) => index !== logIndex)
            }
          : project
      )
    );
  };

  const handleEditProjectMaterials = (projectId, updatedMaterials) => {
    setProjectsList(prev =>
      prev.map(project =>
        project.id === projectId
          ? { ...project, materials: updatedMaterials }
          : project
      )
    );
  };

  const handleEditProjectCompletion = (projectId, newCompletion) => {
    setProjectsList(prev =>
      prev.map(project =>
        project.id === projectId
          ? { ...project, completion_percentage: newCompletion }
          : project
      )
    );
  };

  const handleEditProject = (updatedProject) => {
    setProjectsList(prev =>
      prev.map(project =>
        project.id === updatedProject.id
          ? updatedProject
          : project
      )
    );
  };

  const switchMode = () => {
    setMode(prevMode => prevMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <main className={`${mode === 'dark' ? 'dark' : ''} flex w-screen min-h-screen`}>
      <BrowserRouter>
        <Navbar mode={mode} switchMode={switchMode} />
        <Routes>
          <Route path='/hci-final/' element={<Dashboard />} />
          <Route
            path='/hci-final/projects'
            element={
              <Projects
                equipmentList={equipmentList}
                employeeList={employeeList}
                projectsList={projectsList}
                onDrop={handleDrop}
                onAddProject={handleAddProject}
                onDeleteProject={handleDeleteProject}
                onEditProjectMaterials={handleEditProjectMaterials}
              />
            }
          />
          <Route
            path='/hci-final/projects/:id'
            element={
              <Project
                equipmentList={equipmentList}
                employeeList={employeeList}
                projectsList={projectsList}
                onDeleteProject={handleDeleteProject}
                onAddLog={handleAddLog}
                onEditLog={handleEditLog}
                onDeleteLog={handleDeleteLog}
                onEditProjectMaterials={handleEditProjectMaterials}
                onEditProjectCompletion={handleEditProjectCompletion}
                onEditProject={handleEditProject}
              />
            }
          />
          <Route
            path='/hci-final/equipment'
            element={
              <Equipment
                equipmentList={equipmentList}
                onAddEquipment={handleAddEquipment}
                onEditEquipment={handleEditEquipment}
                onDeleteEquipment={handleDeleteEquipment}
              />
            }
          />
          <Route
            path='/hci-final/equipment/:id'
            element={
              <EquipmentItem
                equipmentList={equipmentList}
                onEditEquipment={handleEditEquipment}
                onEditLog={handleEditLog}
                onDeleteLog={handleDeleteLog}
              />
            }
          />
          <Route
            path='/hci-final/map'
            element={
              <Map projectsList={projectsList} />
            }
          />
          <Route path='/hci-final/employees' element={<Employee />} />
          <Route path='/hci-final/materials' element={<Material projectsList={projectsList} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
