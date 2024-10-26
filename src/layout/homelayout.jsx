import { Outlet } from 'react-router';
import { GetCurrentUser } from '../api/loginapi';
import { useState, useMemo } from 'react';
import Topbar from '../components/topbarcomponent';
import HomeTopBarComponent from '../components/topbariconComponents/hometopbarcomp';
// import { Outlet, useOutlet, setOutletData } from 'react-router-dom';
const HomeLayout = () => {
  const [userData, setCurrentUser] = useState({});

  useMemo(() => {
    GetCurrentUser(setCurrentUser);
  }, []);

  return (
    <>
      {/* <Topbar userData={userData} /> */}
      <Outlet />
      <div>{/* <Outlet context={userData} /> */}</div>
    </>
  );
};
export default HomeLayout;
