import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import { FiMenu } from 'react-icons/fi';

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <div className="min-h-screen md:flex">
      <Sidebar isOpen={open} toggle={toggle} />
      <div className="flex-1">
        <header className="p-4 md:hidden bg-gray-100">
          <button onClick={toggle}>
            <FiMenu className="w-6 h-6" />
          </button>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
