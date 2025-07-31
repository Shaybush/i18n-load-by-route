import { NavLink } from 'react-router-dom';
import { FiMenu, FiHome, FiUser, FiSettings } from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center p-2 rounded hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-700' : ''}`;

  return (
    <aside
      className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 md:relative md:translate-x-0`}
    >
      <button className="absolute top-4 right-4 md:hidden" onClick={toggle}>
        <FiMenu className="w-6 h-6" />
      </button>
      <nav className="mt-10 flex flex-col gap-2">
        <NavLink to="/dashboard" className={linkClass} onClick={toggle}>
          <FiHome className="mr-3" /> Dashboard
        </NavLink>
        <NavLink to="/profile" className={linkClass} onClick={toggle}>
          <FiUser className="mr-3" /> Profile
        </NavLink>
        <NavLink to="/settings" className={linkClass} onClick={toggle}>
          <FiSettings className="mr-3" /> Settings
        </NavLink>
      </nav>
    </aside>
  );
}
