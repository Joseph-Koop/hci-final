import '../App.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProjectBox({ data, equipment, employees, onDrop, onEditMaterials }) {
  const projectRoute = `/hci-final/projects/${data.id}`;
  const [materials, setMaterials] = useState(data.materials || []);

  useEffect(() => {
    setMaterials(data.materials || []);
  }, [data.materials]);

  const updateMaterial = (index, delta) => {
    setMaterials(prev => {
      const next = prev.map((m, i) => i === index ? { ...m, amount: Math.max(0, m.amount + delta) } : m);
      // call optional external updater
      if (typeof onEditMaterials === 'function') {
        try { onEditMaterials(data.id, next); } catch (e) {}
      }
      return next;
    });
  };

  const handleDragStart = (e, id, type) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("itemId", id);
    e.dataTransfer.setData("itemType", type);
    e.dataTransfer.setData("sourceGroup", data.group);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const itemType = e.dataTransfer.getData("itemType");
    const sourceGroup = e.dataTransfer.getData("sourceGroup");
    if (sourceGroup !== data.group) {
      onDrop(itemId, itemType, sourceGroup, data.group);
    }
  };

  return (
    <div
      className="bg-white dark:bg-(--dark2) rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 transition-transform hover:scale-[1.02] hover:shadow-lg"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Link to={projectRoute} className="block mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {data.name}
        </h3>
      </Link>

      {/* Equipment Section */}
      <div className="mb-3">
        <h4 className="text-sm font-medium text-(--main1) dark:text-orange-300 mb-2">Equipment</h4>
        <div className="grid grid-cols-3 gap-2">
          {equipment
            .filter(item => item.group === data.group)
            .map(item => {
              const code = item.name.substring(0, 2);
              const imgSrc = `${code.toLowerCase()}.png`;
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center cursor-grab active:cursor-grabbing hover:opacity-80 p-1"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id, "equipment")}
                >
                  <img src={imgSrc} alt={item.name} className="w-10 h-10 object-contain mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{item.name}</p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Employees Section */}
      <div className="mb-3">
        <h4 className="text-sm font-medium text-(--main1) dark:text-orange-300 mb-2">Employees</h4>
        <div className="grid grid-cols-3 gap-2">
          {employees
            .filter(item => item.group === data.group)
            .map(item => (
              <div
                key={item.id}
                className="flex flex-col items-center cursor-grab active:cursor-grabbing hover:opacity-80 p-1"
                draggable
                onDragStart={(e) => handleDragStart(e, item.id, "employees")}
              >
                <img src="profile.png" alt={item.name} className="w-10 h-10 rounded-full mb-1" />
                <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{item.name}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Materials Section */}
      {materials && materials.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-(--main1) dark:text-orange-300 mb-2">Materials</h4>
          <div className="space-y-2">
            {materials.map((material, index) => (
              <div key={index} className="flex justify-between items-center px-2 py-1 rounded border bg-orange-50 dark:bg-orange-500/30 border-orange-200 dark:border-orange-500">
                <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{material.name}</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Decrease ${material.name}`}
                    onClick={() => updateMaterial(index, -1)}
                    className="bg-orange-300 dark:bg-orange-500 w-6 h-6 flex items-center justify-center rounded-full hover:opacity-90"
                  >
                    −
                  </button>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{material.amount}</p>
                  <button
                    type="button"
                    aria-label={`Increase ${material.name}`}
                    onClick={() => updateMaterial(index, 1)}
                    className="bg-orange-300 dark:bg-orange-500 w-6 h-6 flex items-center justify-center rounded-full hover:opacity-90"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Details Button */}
      <div className="flex justify-center mt-3">
        <Link
          to={projectRoute}
          className="text-xs px-3 py-1 bg-(--main1) text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProjectBox;
