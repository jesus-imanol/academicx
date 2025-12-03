import PropTypes from 'prop-types';
import AdminSidebar from '../components/organisms/AdminSidebar';

const MainLayout = ({ children, activeNavItem }) => {
  return (
    <div className="flex min-h-screen bg-[#131022]">
      <AdminSidebar activeItem={activeNavItem} />
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  activeNavItem: PropTypes.string
};

export default MainLayout;
