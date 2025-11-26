import PropTypes from 'prop-types';
import Logo from '../atoms/Logo';
import NavItem from '../molecules/NavItem';

const SideNavBar = ({ activeItem = 'study-programs' }) => {
  const navItems = [
    { id: 'dashboard', icon: 'grid_view', label: 'Dashboard', href: '#' },
    { id: 'courses', icon: 'book', label: 'Courses', href: '#' },
    { id: 'study-programs', icon: 'school', label: 'Study Programs', href: '#', filled: true },
    { id: 'users', icon: 'group', label: 'Users', href: '#' },
    { id: 'settings', icon: 'settings', label: 'Settings', href: '#' }
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#1A1A2E] p-4 border-r border-white/10">
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
              />
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2 text-[#a19cba] hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
            <span className="material-symbols-outlined">logout</span>
            <p className="text-sm font-medium leading-normal">Log Out</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

SideNavBar.propTypes = {
  activeItem: PropTypes.string
};

export default SideNavBar;
