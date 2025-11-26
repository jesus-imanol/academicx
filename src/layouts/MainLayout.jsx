import PropTypes from 'prop-types';
import SideNavBar from '../components/organisms/SideNavBar';

const MainLayout = ({ children, activeNavItem }) => {
  return (
    <div className="flex min-h-screen">
      <SideNavBar activeItem={activeNavItem} />
      
      <main className="flex-1 p-8 md:p-12">
        <div className="w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  activeNavItem: PropTypes.string
};

export default MainLayout;
