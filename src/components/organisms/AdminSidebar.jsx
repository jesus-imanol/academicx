import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Icon from '../atoms/Icon';

const AdminSidebar = ({ activeItem = 'dashboard' }) => {
  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '/admin/dashboard' },
    { id: 'courses', icon: 'import_contacts', label: 'Courses', href: '/admin/courses' },
    { id: 'groups', icon: 'group', label: 'Groups', href: '/groups/dashboard', filled: true },
    { id: 'teachers', icon: 'school', label: 'Teachers', href: '/teachers/dashboard' },
    { id: 'students', icon: 'person', label: 'Students', href: '/students/dashboard' }
  ];

  return (
    <aside className="flex h-screen min-w-64 max-w-64 flex-col border-r border-white/10 bg-linear-to-b from-[#0f1729] via-[#1a2744] to-[#0f1729] p-4 sticky top-0">
      <div className="flex h-full flex-col justify-between">
        {/* Top Section */}
        <div className="flex flex-col gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 px-3">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLxlgQ4pM0PjBKtv1gTfjYr-pwASX5UkLeJZ-eoDV3_w66vl18Ao4qvqRBtxueq5qdjKTruqaro7aewAHYhEjjOkimoVpBnydZtgO5BKjnxq48Oy9CEgtYMZjCcU87Q0_y-oxN8e3r7TuIK6-0yHaSlRH7PMuXHKQIlQU4cfDB0N_T9GNGuAG6TGcYFXJMuw4Uopv777WOAFvqPFjKLAJfzCXT3lPBqIh34Jry4K99c2HKv9EPgvKX5WJ3S9pJxNn7b4xutQlKAUk")'
              }}
              aria-label="Admin logo"
            />
            <div className="flex flex-col">
              <h1 className="text-white text-base font-medium leading-normal">Admin Panel</h1>
              <p className="text-[#a19cba] text-sm font-normal leading-normal">Moodle Management</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 transition-colors duration-200 ${
                  activeItem === item.id
                    ? 'rounded-lg bg-primary/20 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  filled={item.filled && activeItem === item.id} 
                />
                <p className="text-sm font-medium leading-normal">{item.label}</p>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
          <Link
            to="/admin/courses/create"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
          >
            <span className="truncate">New Course</span>
          </Link>

          <div className="flex flex-col gap-1 border-t border-white/10 pt-2">
            <Link
              to="/admin/settings"
              className="flex items-center gap-3 px-3 py-2 text-[#a19cba] hover:bg-[#2b2839] hover:text-white transition-colors duration-200"
            >
              <Icon name="settings" />
              <p className="text-sm font-medium leading-normal">Settings</p>
            </Link>
            <Link
              to="/logout"
              className="flex items-center gap-3 px-3 py-2 text-[#a19cba] hover:bg-[#2b2839] hover:text-white transition-colors duration-200"
            >
              <Icon name="logout" />
              <p className="text-sm font-medium leading-normal">Logout</p>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

AdminSidebar.propTypes = {
  activeItem: PropTypes.string
};

export default AdminSidebar;
