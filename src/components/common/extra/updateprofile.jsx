import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import { useUserData } from '../../../maintopbar';
import { TiUserOutline } from 'react-icons/ti';
import { Checkbox, Form, Input } from 'antd';
import { AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import {
  MdOutlineCastForEducation,
  MdOutlineViewHeadline,
} from 'react-icons/md';
import { FaCity } from 'react-icons/fa';
import { updateCurrentUser } from 'firebase/auth';
import { CheckUpdateData } from '../../../api/otherapi';

const UpdateProfileData = ({ modalOpen, setModalOpen }) => {
  // const [modalOpen, setModalOpen] = useState(false);
  const { presentLoginUser } = useUserData();
  const [updatingData, setUpdatingData] = useState({ ...presentLoginUser });
  console.log(updatingData);
  const onFinish = (e) => {
    setUpdatingData(e);
    CheckUpdateData(e, localStorage);
    setModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className="update-data-modal-div">
        <Modal
          title="Basic Info"
          centered
          className="profile-updateModal"
          //   style={{
          //     border: '2px solid red',
          //     backgroundColor: 'orange',
          //   }}
          onOk={() => setModalOpen(false)}
          open={modalOpen}
          // onOk={() => {
          //   setModalOpen(false);

          //   CheckUpdateData(updatingData, localStorage);
          //   console.log(updatingData);
          //   setUpdatingData({});
          // }}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <Form
            name="basic"
            // labelCol={{
            //   span: 8,
            // }}
            // wrapperCol={{
            //   span: 16,
            // }}
            // style={{
            //   maxWidth: 600,
            // }}
            initialValues={{
              remember: true,
              username: updatingData.username,
              headline: updatingData.headline,
              education: updatingData.education,
              state: updatingData.state,
              contact: updatingData?.contact || '',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="update-data-form"
          >
            {/* ________________________________________________ */}

            <Form.Item
              label=""
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input prefix={<AiOutlineUser />} placeholder="Username" />
            </Form.Item>

            <Form.Item label="" name="headline">
              <Input
                prefix={<MdOutlineViewHeadline />}
                placeholder="HeadLine"
              />
            </Form.Item>
            <Form.Item label="" name="education">
              <Input
                prefix={<MdOutlineCastForEducation />}
                placeholder="Education"
              />
            </Form.Item>
            <Form.Item label="" name="state">
              <Input prefix={<FaCity />} placeholder="State" />
            </Form.Item>
            <Form.Item label="" name="contact">
              <Input prefix={<AiOutlinePhone />} placeholder="Contact Info" />
            </Form.Item>
            <div className="update-data-btns">
              <Form.Item>
                <Button type="primary" htmlType="button">
                  Cancel
                </Button>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
        {/* _______________________________________________________ */}
      </div>
    </>
  );
};
export default UpdateProfileData;
