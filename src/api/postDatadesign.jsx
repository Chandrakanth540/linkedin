import { GetDataFireStore } from './getdatafromfirestore';
import { useMemo, useState } from 'react';
import '../../src/css/hometopbarcomp.scss';
import { Triangle } from 'react-loader-spinner';
import PostComponent from '../components/postcomponent';
import { Skeleton } from 'antd';

const PostDataDesign = (prop) => {
  const [completeData, setCompleteData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const postNeedId = prop.profileNeedPost;
  useMemo(() => {
    GetDataFireStore(setCompleteData, setIsLoading);
  }, [postNeedId]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: '50%',
            marginLeft: '20%',
            marginTop: '5%',
          }}
        >
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
            active
          />
        </div>
      ) : (
        <div>
          <div className="sort-line">
            <div></div>
            <p>sort</p>
          </div>
          <div className="postBox-main">
            {completeData.map((item) => {
              return (
                <>
                  {postNeedId == item.userId || postNeedId == null ? (
                    <PostComponent {...item} />
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default PostDataDesign;
