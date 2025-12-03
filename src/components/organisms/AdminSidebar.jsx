import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router';
import Icon from '../atoms/Icon';
import LanguageSelector from '../molecules/LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminSidebar = ({ activeItem = 'dashboard' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = () => {
    // Aquí puedes agregar lógica de logout (limpiar tokens, etc.)
    localStorage.clear();
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: t('nav.home'), href: '/' },
    { id: 'students', icon: 'person', label: t('nav.students'), href: '/students/dashboard' },
    { id: 'study-programs', icon: 'school', label: t('nav.studyPrograms'), href: '/study-programs' },
    { id: 'subjects', icon: 'import_contacts', label: t('nav.subjects'), href: '/subjects' },
    { id: 'groups', icon: 'group', label: t('nav.groups'), href: '/groups/dashboard', filled: true },
    { id: 'teachers', icon: 'school', label: t('nav.teachers'), href: '/teachers/dashboard' }
  ];

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a2744] border border-white/10 text-white hover:bg-[#2b2839] transition-colors"
        aria-label="Toggle menu"
      >
        <Icon name={isOpen ? 'close' : 'menu'} />
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
        flex h-screen min-w-64 max-w-64 flex-col border-r border-white/10 
        bg-linear-to-b from-[#0f1729] via-[#1a2744] to-[#0f1729] p-4
        lg:sticky lg:top-0
        fixed top-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
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
                onClick={closeSidebar}
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
          {/* Language Selector */}
          <LanguageSelector />
          
          <Link
            to="/study-programs/create"
            onClick={closeSidebar}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-linear-to-r from-[#2563eb] to-[#3b82f6] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:from-[#1d4ed8] hover:to-[#2563eb] hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            <span className="truncate">New Program</span>
          </Link>

          <div className="flex flex-col gap-1 border-t border-white/10 pt-2">
            <Link
              to="/admin/settings"
              onClick={closeSidebar}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#a19cba] hover:bg-white/5 hover:text-white transition-colors duration-200"
            >
              <Icon name="settings" />
              <p className="text-sm font-medium leading-normal">Settings</p>
            </Link>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#a19cba] hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200 w-full text-left"
            >
              <Icon name="logout" />
              <p className="text-sm font-medium leading-normal">Logout</p>
            </button>
          </div>
        </div>
      </div>
    </aside>

    {/* Logout Confirmation Modal */}
    {showLogoutModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-[#1a2744] border border-white/10 rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-red-500/20">
              <Icon name="logout" className="text-red-400 text-2xl" />
            </div>
            <div>
              <h3 className="text-white text-lg font-bold">Cerrar Sesión</h3>
              <p className="text-white/60 text-sm">¿Estás seguro de que deseas salir?</p>
            </div>
          </div>
          
          <p className="text-white/70 text-sm mb-6">
            Se cerrará tu sesión actual y deberás iniciar sesión nuevamente para acceder al sistema.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors font-medium text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors font-bold text-sm shadow-lg shadow-red-500/25"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

AdminSidebar.propTypes = {
  activeItem: PropTypes.string
};

export default AdminSidebar;
