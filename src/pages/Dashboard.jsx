import '../App.css';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { unassigned } from '../data/unassigned';
import ProjectBox from '../components/ProjectBox';
import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core';

function Dashboard() {

    const handleDragEnd = (event) => {
      const { active, over } = event;

      if (!over) return; // dropped outside any card

      const fromId = active.data.current.cardId; // card the item came from
      const toId = over.id;                     // card it was dropped on

      if (fromId !== toId) {
          moveUnit(active.id, fromId, toId);
      }
  };

    const moveUnit = (unitId, fromCard, toCard) => {
      setCards(prev => {
          const updated = { ...prev };

          // remove from old card
          const unit = updated[fromCard].units.find(u => u.id === unitId);
          updated[fromCard].units = updated[fromCard].units.filter(u => u.id !== unitId);

          // add to new card
          updated[toCard].units.push(unit);

          return updated;
      });
  };

  
  return (
    
    <div className="bg-(--light2) dark:bg-(--dark1) grid grid-rows-[1fr_5fr_1fr] w-full h-screen text-black dark:text-white">
      <div className="flex justify-between items-center">
        Dashboard
        <button className="text-center gap-3 p-3 m-3 rounded-xl hover:bg-(--main3) hover:cursor-pointer bg-(--main2) transition">New Project</button>
      </div>

      <DndContext onDragEnd={ handleDragEnd }>
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-10">
            { projects.map((project, index) => (
              <ProjectBox key={index} data={project} materialDisplay={1}/>
            ))}
          </div>
          <div className="border-left-5">
            <ProjectBox key={projects.length} data={unassigned} materialDisplay={0} />

          </div>
        </div>
      </DndContext>

      <div className="flex flex-row-reverse items-end">
        <Link to="/map" className="text-center gap-3 p-3 m-3 rounded-xl hover:bg-(--main3) bg-(--main2) transition">Map View</Link>
      </div>
      
    </div>
  );
}

export default Dashboard;
