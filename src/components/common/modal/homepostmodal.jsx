import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import '../../../css/hometopbarcomp.scss';
import PostPrivacy from './postprivacymodal';
import { firestoreapi } from '../../../api/firestoreapi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useOutletContext } from 'react-router';
import { BsFillCameraVideoFill, BsImageFill } from 'react-icons/bs';
import { postImageUpload } from '../../../api/otherapi';

const HomeTopBarModal = ({ content, modalOpen, setModalOpen }) => {
  // console.log(loggedUser, 'nene');
  // const[videoForPost,setVideoForPost]=useState('')
  const [value, setValue] = useState({});
  const userData = useOutletContext();
  const [progress, setProgress] = useState(0);
  const [imageForPost, setImageForPost] = useState('');

  const sendPostData = async () => {
    if (imageForPost.length > 0) {
      await postImageUpload(
        value,
        imageForPost[0],
        userData,
        setProgress,
        setModalOpen,
        setValue,
        setImageForPost,
        content,
      );
    } else {
      firestoreapi({ userPost: value, postImageUrl: '' }, userData);
      setModalOpen(false);
    }
    // setValue('');
    // setImageForPost('');
  };

  return (
    <>
      <Modal
        title=""
        // centered
        style={{ top: 40 }}
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
          sendPostData();
          setValue('');
          setImageForPost('');
        }}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            onClick={() => {
              sendPostData();
            }}
          >
            send post
          </Button>,
        ]}
      >
        <PostPrivacy />

        <ReactQuill
          placeholder="What do you want to talk about?"
          // onChange={setPostData}
          // value={postData}
          value={value}
          onChange={setValue}
          className="postmodel-input-text"
        />

        <footer>
          <h4>{progress}</h4>
          <h4>{imageForPost[0]?.name}</h4>
          <button className="image-post-modal-btn">
            <label htmlFor="image-for-post">
              {content && (
                <>
                  <input
                    type="file"
                    name=""
                    id="image-for-post"
                    hidden
                    // accept={`${content}/*`}
                    accept={
                      content == 'image'
                        ? 'image/*'
                        : content == 'video'
                        ? 'video/mp4, video/mpeg, video/quicktime, video/x-msvideo, video/x-matroska'
                        : ''
                    }
                    onChange={(e) => {
                      setImageForPost(e.target.files);
                    }}
                  />
                  {content == 'image' && (
                    <BsImageFill size={40} className="image-post-model" />
                  )}
                  {content == 'video' && (
                    <BsFillCameraVideoFill
                      size={40}
                      className="image-post-model"
                    />
                  )}
                </>
              )}
            </label>
          </button>
        </footer>
      </Modal>
    </>
  );
};

export default HomeTopBarModal;
