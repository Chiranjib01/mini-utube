import './header.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { VscMenu } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import logo from '../../logo1.jpg';
import { APP_NAME } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import PopUpMessage from '../PopUpMessage/PopUpMessage';
import { useEffect, useState } from 'react';
import { logoutUser } from '../../redux/slices/user';

interface HeaderProps {
  activeItem: string;
  setActiveItem: Function;
  setShowSidebar: Function;
}

const Header = ({ setShowSidebar, setActiveItem }: HeaderProps) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  const { message } = useAppSelector((state) => state.message);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [searchInput, setSearchInput] = useState('');

  return (
    <header className="header">
      {message.text && <PopUpMessage />}
      <div className="flex items-center">
        <div className="menu-container" onClick={() => setShowSidebar(true)}>
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
      <div className="search-form-container">
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?q=${searchInput}`);
          }}
        >
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="search-icon-container">
            <button type="submit">
              <AiOutlineSearch className="search-icon" />
            </button>
          </div>
        </form>
      </div>
      <div className="login-btn-container">
        {user ? (
          <div
            className="profile-image"
            onClick={() => setShowProfileModal(!showProfileModal)}
          >
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="" />
            ) : (
              <img src="/no-profile-picture.png" alt="" />
            )}
            {showProfileModal && (
              <>
                <div
                  className="no-profile-modal"
                  onClick={() => setShowProfileModal(false)}
                ></div>
                <div className="profile-modal">
                  <Link to={`/user/${user._id}`}>
                    <div className="profile-item">
                      <CgProfile className="profile-modal-icon" />
                      profile
                    </div>
                  </Link>
                  <Link to={`/profile/edit/${user._id}`}>
                    <div className="profile-item">
                      <IoSettingsOutline className="profile-modal-icon" />
                      edit profile
                    </div>
                  </Link>
                  <Link to={`/upload-video`}>
                    <div className="profile-item">
                      <MdOutlineVideoLibrary className="profile-modal-icon" />
                      Upload Video
                    </div>
                  </Link>
                  <div
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                    className="profile-item"
                  >
                    logout
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate('/')}>
            LogIn
          </button>
        )}
      </div>
      {/* <MdHome/> */}
      {/* <VscHome /> */}
      {/* <VscHistory /> */}
      {/* <MdOutlineSubscriptions /> */}
      {/* <MdOutlineVideoLibrary /> */}
      {/* <IoSettingsOutline /> */}
      {/* <VscChromeClose /> */}
      {/* <BiDotsVerticalRounded /> */}
    </header>
  );
};

export default Header;
