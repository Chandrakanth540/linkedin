import { useState } from 'react';
import pic from '../../assets/images/profilepic.svg';
import '../../css/hometopbarcomp.scss';
import HomeTopBarModal from '../common/modal/homepostmodal';
import { Avatar, Button } from 'antd';
import { TiUserOutline } from 'react-icons/ti';
const HomeTopBarComponent = (props) => {
  const [postData, setPostData] = useState({});
  const { userData } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState('');
  return (
    <>
      <section className="section">
        <div className="pic-search-div">
          <Avatar
            size={50}
            src={userData.profilePicUrl}
            icon={<TiUserOutline />}
          />
          <Button
            type="primary"
            className="home-search-btn-one"
            onClick={() => {
              setModalOpen(true);
              setContent('image');
            }}
          >
            Share a post
          </Button>
        </div>
        <div className="pic-video-event-article-div">
          <button
            onClick={() => {
              setModalOpen(true);
              setContent('image');
            }}
          >
            image
          </button>
          <button
            onClick={() => {
              setModalOpen(true);
              setContent('video');
            }}
          >
            video
          </button>
          <button
            onClick={() => {
              setModalOpen(true);
              setContent('event');
            }}
          >
            event
          </button>
          <button>article</button>
        </div>

        <HomeTopBarModal
          content={content}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </section>
    </>
  );
};
export default HomeTopBarComponent;
