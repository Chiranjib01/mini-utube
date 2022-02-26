import { VscMenu } from 'react-icons/vsc';
import './sidebar.css';
import logo from '../../logo1.jpg';

interface SidebarProps {
  setShowSidebar: Function;
}

const SidebarActive = ({ setShowSidebar }: SidebarProps) => {
  return (
    <div className="sidebar-container sidebar-active">
      <div className="flex items-center sidebar-header">
        <div className="menu-container" onClick={() => setShowSidebar(false)}>
          <VscMenu className="menu" />
        </div>
        <div className="logo-container">
          <img src={logo} height={30} className="logo-img" />
          <span className="logo-text">MiniUTube</span>
        </div>
      </div>
      {/* links */}
      <div className="main">
        <div className="sidebar-item">Home</div>
        <div className="sidebar-item">Library</div>
        <div className="sidebar-item">History</div>
      </div>
    </div>
  );
};

export default SidebarActive;
