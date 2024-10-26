import Headtitle from '../headtitle';
import { Outlet } from 'react-router';
import '../css/registerloginlayout.scss';
import { Link, NavLink } from 'react-router-dom';
import Homepage from '../homepage';
import MainFooter from '../footer';

const RegisterLayout = () => {
  // const active_Box={
  //     boxShadow:'2px 2px 5px black'

  // }

  return (
    <div className="register-outlet-combined-div">
      <div className="register-layout-toptitles">
        <Homepage />
      </div>
      <div>
        <Outlet />
        <div className="register-layout-footer">
          <MainFooter />
        </div>
      </div>
    </div>
  );
};
export default RegisterLayout;
