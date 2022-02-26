import { VscMenu } from 'react-icons/vsc';
import './sidebar.css';
import logo from '../../logo1.jpg';
import NavItem from '../NavItem';
import { APP_NAME } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

interface SidebarProps {
  activeItem: string;
  setActiveItem: Function;
  setShowSidebar: Function;
}

const Sidebar = ({
  setShowSidebar,
  activeItem,
  setActiveItem,
}: SidebarProps) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="flex items-center sidebar-header">
          <div className="menu-container" onClick={() => setShowSidebar(false)}>
            <VscMenu className="menu" />
          </div>
          <div
            className="logo-container"
            onClick={() => {
              setActiveItem('/');
              navigate('/');
              setShowSidebar(false);
            }}
          >
            <img src={logo} height={30} className="logo-img" />
            <span className="logo-text">{APP_NAME}</span>
          </div>
        </div>
        {/* links */}
        <div className="main">
          <NavItem
            name="Home"
            path="/"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            setShowSidebar={setShowSidebar}
          />
          <NavItem
            name="Videos"
            path="/videos"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            setShowSidebar={setShowSidebar}
          />
          {user && (
            <>
              <NavItem
                name="Upload Video"
                path="/upload-video"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                setShowSidebar={setShowSidebar}
              />
              <NavItem
                name="Feed"
                path="/feed"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                setShowSidebar={setShowSidebar}
              />
              <NavItem
                name="History"
                path="/History"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                setShowSidebar={setShowSidebar}
              />
              <NavItem
                name="Profile"
                path={`/user/${user._id}`}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                setShowSidebar={setShowSidebar}
              />
            </>
          )}
        </div>
      </div>
      <div className="no-sidebar" onClick={() => setShowSidebar(false)}></div>
    </div>
  );
};

export default Sidebar;
