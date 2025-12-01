import '../App.css';
import '../pages/Dashboard';

function ProjectBox({ data, equipment, employees, onDrop }) {

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
    
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-orange-200 space-y-6" 
    onDragOver={handleDragOver}
    onDrop={handleDrop}>

        <h3 className="text-2xl font-semibold text-gray-800 mb-2 border-b border-orange-300 pb-2">{data.name}</h3>
        <h4 className="text-lg font-medium text-orange-600">Equipment</h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {equipment.map((item) => {
                const code = item.name.substring(0, 2);
                let imgSrc = "./" + code.toLowerCase() + ".png";

                if(data.group === item.group){
                    return (
                        <div 
                            className="flex flex-col items-center cursor-grab active:cursor-grabbing hover:opacity-80"
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id, "equipment")}
                        >
                            <img src={imgSrc} alt={item.name} className="w-16 h-16 object-contain mb-1" />
                            <p className="text-gray-700 font-medium">{item.name}</p>
                        </div>
                    );
                }
            })}     
        </div>

        <h4 className="text-lg font-medium text-orange-600">Employees</h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {employees.map((item) => {
                if(data.group === item.group){
                    return (
                        <div 
                            className="flex flex-col items-center cursor-grab active:cursor-grabbing hover:opacity-80"
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id, "employees")}
                        >
                            <img src="./profile.png" alt={item.name} className="w-16 h-16 rounded-full mb-1" />
                            <p className="text-gray-700 font-medium">{item.name}</p>
                        </div>
                    );
                }
            })}
        </div>

        { data.materials && data.materials.length > 0 && ( 
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

    </div>


  );
}

export default ProjectBox;
