import { Link } from 'react-router-dom';

interface NavItemProps {
  name: string;
  path: string;
  activeItem: string;
  setActiveItem: Function;
  setShowSidebar: Function;
}

const NavItem = ({
  name,
  path,
  activeItem,
  setActiveItem,
  setShowSidebar,
}: NavItemProps) => {
  return (
    <Link
      to={path}
      onClick={() => {
        setActiveItem(path);
        setShowSidebar(false);
      }}
    >
      <div
        className={`sidebar-item ${
          activeItem === path && 'sidebar-item-active'
        }`}
      >
        {name}
      </div>
    </Link>
  );
};

export default NavItem;
