import "../App.css";
import { Link } from 'react-router-dom';

function Navbar({ mode, switchMode }) {
    return (
        <div className="h-screen w-64 bg-(--dark2) text-white flex flex-col p-6 gap-6 shadow-2xl">
            <Link
                to="/hci-final/"
                className="text-2xl font-bold text-(--main1) tracking-wide hover:opacity-80 transition"
            >
                SiteManager
            </Link>
            <nav className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-3 mt-4 text-base">
                    <Link to="/hci-final/projects" className="flex items-center gap-3 p-3 rounded-xl hover:bg-(--main2) transition">Projects</Link>
                    <Link to="/hci-final/equipment" className="flex items-center gap-3 p-3 rounded-xl hover:bg-(--main2) transition">Equipment</Link>
                    <Link to="/hci-final/employees" className="flex items-center gap-3 p-3 rounded-xl hover:bg-(--main2) transition">Employees</Link>
                    <Link to="/hci-final/materials" className="flex items-center gap-3 p-3 rounded-xl hover:bg-(--main2) transition">Materials</Link>
                </div>
                <div>
                    <button onClick={switchMode} className="flex items-center w-full gap-3 p-3 rounded-xl hover:bg-(--main2) hover:cursor-pointer transition">
                        {mode === 'light' ? 'Light ☀️' : 'Dark 🌙'}
                    </button>
                    <a href="#" className="flex items-center gap-3 p-3 rounded-xl text-(--main3) hover:text-(--light2) hover:bg-(--main3) transition">Log Out</a>
                </div>
            </nav>
            <div className="mt-auto flex flex-col gap-2 text-sm text-(--light1) opacity-70">
                <p>© 2025 Project Manager</p>
            </div>
        </div>
    );
}

export default Navbar;
