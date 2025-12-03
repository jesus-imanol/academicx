import PropTypes from 'prop-types';
import AdminSidebar from '../components/organisms/AdminSidebar';

const AdminLayout = ({ children, activeNavItem }) => {
  return (
    <div className="flex min-h-screen bg-[#1a1625]">
      <AdminSidebar activeItem={activeNavItem} />
      
      <main className="flex-1 p-4 pt-16 lg:pt-8 lg:p-12">
        <div className="w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  activeNavItem: PropTypes.string
};

export default AdminLayout;
