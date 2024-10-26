import '../../css/profileTopbarcomponent.scss';
import img2 from '../../assets/images/img2.jpg';
import img1 from '../../assets/images/user.jpg';
import { FaCamera, FaUserEdit } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';
import PostDataDesign from '../../api/postDatadesign';
import { useEffect, useState } from 'react';
import { Avatar, Button, Modal } from 'antd';
import UpdateProfileData from '../common/modal/updateprofiledata';
import { Progress, Space } from 'antd';
import { ImageUpload } from '../../api/otherapi';
import { useLocation, useOutletContext } from 'react-router';
import { Image } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { DifferentProfileDetails, GetCurrentUser } from '../../api/loginapi';
import { auth } from '../../firebaseconfig';
import { TiUserOutline } from 'react-icons/ti';
import bluetick from '../../assets/images/bluetick.png';
const ProfileTopBarComponent = (prop) => {
  const [imageStore, setImageStore] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [imageName, setImageName] = useState('');
  const [progress, setProgress] = useState(0);
  // var { userData } = prop;
  // var userData = '';
  const outletCon = useOutletContext();
  const [userData, setUserData] = useState({});
  const [stru, setStru] = useState('');
  console.log(outletCon, 'conpuff');

  // useEffect(() => {
  //   fetchGetUserCurrent;
  // }, []);
  // const fetchGetUserCurrent = async () => {
  //   await GetCurrentUser(outletCon.userId, setUserData);
  //   // setUserData(result);
  // };

  console.log(stru, 'perfect date');
  const [searchParam] = useSearchParams();
  const [bringData, setBringData] = useState('');
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const handleImageUpload = (event) => {
    setImageStore(event.target.files);
    setImageName(event.target.value);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImageSrc(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const buttonUploadImage = () => {
    ImageUpload(
      imageStore[0],
      localStorage,
      setProgress,
      setImageStore,
      setProfileModal,
    );
    setImageName('');
  };
  const fetchData = async () => {
    if (searchParam.get('id') == outletCon?.userId) {
      setUserData(outletCon);
    } else {
      try {
        const resultProm = await DifferentProfileDetails(searchParam.get('id'));
        setUserData(resultProm);
      } catch (error) {
        console.error('Error fetching profile details:', error);
      }
    }
  };

  return (
    <>
      <h2
        style={{
          height: '0.1px',

          color: 'red',
          backgroundColor: 'black',
        }}
      ></h2>
      <div className="profilecomp-Main-div">
        <div>
          <div>
            <div className="pic-icon-dic">
              <Image
                // width={750}
                // height={280}
                src={img2}
                preview
                className="profile-backgroundImage"
              />

              {/* <img src={img2} alt="" className="profile-backgroundImage" /> */}

              <div className="cam-background-icon">
                <label htmlFor="background-image-update">
                  <input
                    type="file"
                    name=""
                    id="background-image-update"
                    hidden
                    onClick={(e) => console.log(e.target.files[0])}
                  />
                  <FaCamera size={20} />
                </label>
              </div>
            </div>
            <div>
              <Avatar
                size={180}
                src={userData.profilePicUrl}
                icon={<TiUserOutline />}
                className="profile-profilepic"
                onClick={() => {
                  if (outletCon.userId == userData.userId) {
                    setProfileModal(true);
                  }
                }}
              />
              {/* <img
                src={
                  userData && userData.profilePicUrl
                    ? userData.profilePicUrl
                    : img1
                }
                alt=""
              /> */}
            </div>
          </div>

          {outletCon.userId == userData.userId ? (
            <p className="edit-option">
              <FaUserEdit size={20} onClick={() => setModalOpen(true)} />
            </p>
          ) : (
            <></>
          )}

          <div className="all-details-div">
            <div className="Name-clg-div">
              <div className="new-div-added">
                <div>
                  <h2 className="profile-name">
                    {userData ? userData.username : 'Enter Name asshole'}{' '}
                    {userData.bluetick && (
                      <img
                        src={bluetick}
                        alt="not a prblm"
                        height={15}
                        width={15}
                      />
                    )}
                  </h2>
                  <h3 className="blur-no">{'Student'}</h3>
                </div>

                <div className="profile-address">
                  <h4 className="blur-no">{'Vijayawada'},</h4>
                  <h4 className="blur-no">
                    {userData ? userData.state : 'Andhra Pradesh'},
                  </h4>
                  <h4 className="blur-no">India</h4>
                  <h4>
                    <a href="">• contact info</a>{' '}
                  </h4>
                </div>
              </div>
              <div>
                <h3 className="blur-no">
                  {userData
                    ? userData.education
                    : 'Indian institute of technology'}
                </h3>
                <div>
                  <a href="#">15 connections</a>
                </div>
              </div>
            </div>
            <div>
              Bio
              <h3>
                I’m slowly becoming the person I should have been a long time
                ago
              </h3>
            </div>

            {/* <div className="opento-add-more-btns">
              <button>one</button>
              <button>one</button>
              <button>one</button>
            </div> */}

            {/* <div className="opentowork">
              <div>Open to work</div>
              <div>add titles and locations</div>
              <div>show details</div>
            </div> */}
          </div>
        </div>
      </div>

      <div>
        <PostDataDesign profileNeedPost={userData.userId} />
      </div>
      <section>
        <div>
          <UpdateProfileData
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        </div>
        <div>
          <Modal
            title=""
            centered
            // className="profil-updateModal"
            open={profileModal}
            onOk={() => {
              ImageUpload(imageStore[0], localStorage, setProgress);
            }}
            onCancel={() => setProfileModal(false)}
            footer={[
              <Button
                onClick={buttonUploadImage}
                type="primary"
                disabled={imageName.length == 0 ? true : false}
              >
                Upload profile pic
              </Button>,
            ]}
          >
            <div>
              <h2>ProfilePic</h2>
              <label htmlFor="img-upload-profile">
                <input
                  type="file"
                  name=""
                  className="profile-pic-upload-input"
                  hidden
                  id="img-upload-profile"
                  onChange={handleImageUpload}
                />
                <h3
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {imageName}
                </h3>
                <div className="div-profile-modal">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt="Uploaded Image"
                      className="preview-on-modal-profilpic"
                    />
                  )}

                  {progress > 0 && progress < 100 ? (
                    <div className="progress-circle">
                      <Progress
                        type="circle"
                        percent={progress}
                        size={198}
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="div-profile-modal">
                        <BiImageAdd size={50} className="" />
                      </div>
                    </>
                  )}
                </div>
                {/* <h2>{progress > 0 ? <>{progress}</> : ''}</h2> */}
              </label>
            </div>
          </Modal>
        </div>
      </section>
    </>
  );
};
export default ProfileTopBarComponent;
