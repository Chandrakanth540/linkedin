import PostDataDesign from '../api/postDatadesign';
import HomeTopBarComponent from './topbariconComponents/hometopbarcomp';
import { useOutletContext } from 'react-router';
import { FloatButton, Popover, Spin } from 'antd';
import { ThreeDots } from 'react-loader-spinner';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { GiThreeFriends } from 'react-icons/gi';
// import { IoChatbubblesOutline } from 'react-icons/io';
import { BsChatText } from 'react-icons/bs';
import WaterFloatBtn from './topbariconComponents/watermarkbtn';
const Homecomponent = () => {
  const userData = useOutletContext();

  return (
    <>
      <HomeTopBarComponent userData={userData} />
      <PostDataDesign profileNeedPost={null} />
      <WaterFloatBtn />
    </>
  );
};
export default Homecomponent;
