import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { CheckUpdateData } from '../../../api/otherapi';
import { useUserData } from '../../../maintopbar';
import { TiUserOutline } from 'react-icons/ti';
const UpdateProfileData = ({ modalOpen, setModalOpen }) => {
  // const [modalOpen, setModalOpen] = useState(false);
  const { presentLoginUser } = useUserData();
  const [updatingData, setUpdatingData] = useState(presentLoginUser);
  console.log(updatingData);
  return (
    <>
      <div>
        <Modal
          title=""
          centered
          className="profil-updateModal"
          // style={{
          //   border: '2px solid red',
          // }}
          open={modalOpen}
          onOk={() => {
            setModalOpen(false);
            //   sendPostData();
            CheckUpdateData(updatingData, localStorage);
            console.log(updatingData);
            setUpdatingData({});
          }}
          onCancel={() => setModalOpen(false)}
        >
          {' '}
          {/* <UpdateProfileData />{' '} */}
          <h2>Basic Info</h2>
          <div className="update-main-div">
            <div className="username-update-div">
              <label htmlFor="profile-username">
                <div>
                  {updatingData?.username?.length > 0 ? (
                    <span className="username-update">Username</span>
                  ) : (
                    <>
                      <div></div>
                    </>
                  )}
                </div>
                <input
                  onChange={(e) =>
                    setUpdatingData({
                      ...updatingData,
                      username: e.target.value,
                    })
                  }
                  value={updatingData?.username}
                  required
                  type="text"
                  id="profile-username"
                  name=""
                  placeholder="Username"
                  prefix={<TiUserOutline />}
                />
              </label>
            </div>
            {/* <h3>Headline</h3> */}

            <div className="username-update-div">
              <label htmlFor="profile-headline">
                <div>
                  {updatingData?.headline?.length > 0 ? (
                    <span className="username-update">HeadLine</span>
                  ) : (
                    <></>
                  )}
                </div>
                <input
                  onChange={(e) =>
                    setUpdatingData({
                      ...updatingData,
                      headline: e.target.value,
                    })
                  }
                  value={updatingData?.headline}
                  type="text"
                  id="profile-headline"
                  name=""
                  placeholder="HeadLine"
                />
              </label>
            </div>

            <div className="username-update-div">
              <label htmlFor="profile-education">
                <div>
                  {updatingData?.education?.length > 0 ? (
                    <span className="username-update">Education</span>
                  ) : (
                    <></>
                  )}
                </div>
                <input
                  onChange={(e) =>
                    setUpdatingData({
                      ...updatingData,
                      education: e.target.value,
                    })
                  }
                  value={updatingData?.education}
                  type="text"
                  id="profile-education"
                  name=""
                  placeholder="Education"
                />
              </label>
            </div>

            <div className="username-update-div">
              <label htmlFor="profile-headline">
                <div>
                  {updatingData?.state?.length > 0 ? (
                    <span className="username-update">State</span>
                  ) : (
                    <></>
                  )}
                </div>
                <input
                  onChange={(e) =>
                    setUpdatingData({ ...updatingData, state: e.target.value })
                  }
                  value={updatingData?.state}
                  type="text"
                  id="profile-state"
                  name=""
                  placeholder="State"
                />
              </label>
            </div>

            <div className="username-update-div">
              <label htmlFor="profile-headline">
                <div>
                  {updatingData?.contact?.length > 0 ? (
                    <span className="username-update">Contact</span>
                  ) : (
                    <></>
                  )}
                </div>
                <input
                  onChange={(e) =>
                    setUpdatingData({
                      ...updatingData,
                      contact: e.target.value,
                    })
                  }
                  value={updatingData?.contact}
                  type="text"
                  id="profile-contact"
                  name=""
                  placeholder="Contact"
                />
              </label>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default UpdateProfileData;
