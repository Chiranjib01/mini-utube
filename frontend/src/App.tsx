import './App.css';
import { Route, Routes } from 'react-router-dom';

// pages
import Home from './pages/Home/Home';
import Videos from './pages/Videos/Videos';

// components
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import Register from './pages/Register/Register';
import History from './pages/History/History';
import UserProfile from './pages/UserProfile/UserProfile';
import Feed from './pages/Feed/Feed';
import UploadVideo from './pages/UploadVideo/UploadVideo';
import EditProfile from './pages/EditProfile/EditProfile';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname);
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <Header
        setShowSidebar={setShowSidebar}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      {showSidebar && (
        <Sidebar
          setShowSidebar={setShowSidebar}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      )}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Videos />} path="/videos" />
        <Route element={<Register />} path="/register" />
        <Route element={<Feed />} path="/feed" />
        <Route element={<History />} path="/history" />
        <Route element={<UploadVideo />} path="/upload-video" />
        <Route element={<UserProfile />} path="/user/:userId" />
        <Route element={<EditProfile />} path="/profile/edit/:userId" />
      </Routes>
    </>
  );
}

export default App;
