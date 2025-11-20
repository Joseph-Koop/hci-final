import '../App.css';
import '../pages/Dashboard';
import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core';

function Card({ id, children }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className="bg-white shadow-lg rounded-xl p-4 border border-orange-200"
        >
            {children}
        </div>
    );
}

function DraggableItem({ id, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="cursor-grab active:cursor-grabbing"
        >
            {children}
        </div>
    );
}



function ProjectBox({ key, data, materialDisplay }) {
    
  return (
    
    <Card id={ `card` + key } className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-orange-200 space-y-6">

        <h3 className="text-2xl font-semibold text-gray-800 mb-2 border-b border-orange-300 pb-2">{data.name}</h3>
        <h4 className="text-lg font-medium text-orange-600">Equipment</h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.equipment.map((item, index) => {
                const code = item.substring(0, 2);
                let imgSrc = code.toLowerCase() + ".png";

                return (
                    <DraggableItem key={ index } id={ index } className="flex flex-col items-center">
                        <img src={imgSrc} alt={item} className="w-16 h-16 object-contain mb-1" />
                        <p className="text-gray-700 font-medium">{item}</p>
                    </DraggableItem>
                );
            })}     
        </div>

        <h4 className="text-lg font-medium text-orange-600">Employees</h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.employees.map((employee, index) => (
                <div key={index} className="flex flex-col items-center">
                    <img src="profile.png" alt={employee} className="w-16 h-16 rounded-full mb-1" />
                    <p className="text-gray-700 font-medium">{employee}</p>
                </div>
            ))}
        </div>

        { materialDisplay === 1 && ( 
            <>
                <h4 className="text-lg font-medium text-orange-600">Materials</h4>

                <div className="space-y-3">
                    {data.materials.map((material, index) => (
                        <div key={index} className="flex justify-between items-center bg-orange-100 px-4 py-2 rounded-xl border border-orange-200">
                            <p className="font-medium text-gray-800">{material.name}</p>

                            <div className="flex items-center space-x-3 text-black">
                                <input className="text-right" type="number" defaultValue={ material.amount }/>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}

    </Card>


  );
}

export default ProjectBox;
