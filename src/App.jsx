import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Equipment from './pages/Equipment';
import Employee from './pages/Employee';
import Material from './pages/Material';


function App() {

  const [mode, setMode] = useState('dark');

  const switchMode = () => {
    mode === 'dark' ? setMode('light') : setMode('dark');
    console.log(mode);
  }

  return (
    <main className={`${mode === 'dark' ? 'dark' : ''} flex w-screen h-screen`}>  
      <BrowserRouter>
        <Navbar mode={mode} switchMode={switchMode} />
        <Routes>

          <Route path='/' element={<Dashboard />} />
          <Route path='/map' element={<Map />} />
          <Route path='/equipment' element={<Equipment />} />
          <Route path='/employees' element={<Employee />} />
          <Route path='/materials' element={<Material />} />

        </Routes>
      </BrowserRouter>

    </main>
  );
}

export default App;
