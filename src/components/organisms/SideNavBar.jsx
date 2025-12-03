import { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from '../atoms/Logo';
import NavItem from '../molecules/NavItem';

const SideNavBar = ({ activeItem = 'study-programs' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const navItems = [
    { id: 'dashboard', icon: 'grid_view', label: 'Dashboard', href: '#' },
    { id: 'courses', icon: 'book', label: 'Courses', href: '#' },
    { id: 'study-programs', icon: 'school', label: 'Study Programs', href: '#', filled: true },
    { id: 'users', icon: 'group', label: 'Users', href: '#' },
    { id: 'settings', icon: 'settings', label: 'Settings', href: '#' }
  ];

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-lg bg-[#1A1A2E] border border-white/10 text-white hover:bg-[#2b2839] transition-colors"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
      </button>

      {/* Overlay - Mobile Only */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 shrink-0 bg-[#1A1A2E] p-4 border-r border-white/10 h-screen
        lg:sticky lg:top-0
        fixed top-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      <div className="flex h-full flex-col justify-between">
        {/* Top Section */}
        <div className="flex flex-col gap-8">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 px-3">
            <Logo size={10} />
            <h1 className="text-white text-lg font-bold">Concurrent</h1>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={activeItem === item.id}
                filled={item.filled && activeItem === item.id}
                onClick={closeSidebar}
              />
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-1">
          <div 
            onClick={closeSidebar}
            className="flex items-center gap-3 px-3 py-2 text-[#a19cba] hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">logout</span>
            <p className="text-sm font-medium leading-normal">Log Out</p>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

SideNavBar.propTypes = {
  activeItem: PropTypes.string
};

export default SideNavBar;
