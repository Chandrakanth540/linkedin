import { useLocation } from 'react-router';
import { useOutletContext } from 'react-router';
import ProfileTopBarComponent from './components/topbariconComponents/profiletopbarcomp';
import { useSearchParams } from 'react-router-dom';
import { DifferentProfileDetails, GetCurrentUser } from './api/loginapi';
import { useEffect, useMemo, useState } from 'react';
const DivertProfile = (props) => {
  const userData = useOutletContext();
  const [searchParam] = useSearchParams();
  const [bringData, setBringData] = useState('');

  const location = useLocation();

  if (searchParam.get('id') == userData?.userId) {
    return <ProfileTopBarComponent userData={userData} />;
  } else {
    DifferentProfileDetails(location.state.userEmail, setBringData);
    return <ProfileTopBarComponent userData={bringData} />;
  }
};
export default DivertProfile;
