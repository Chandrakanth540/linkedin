// import { FloatButton } from 'antd';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BsChatText } from 'react-icons/bs';
import { GiThreeFriends } from 'react-icons/gi';
import { FloatButton, Popover, Spin } from 'antd';

const WaterFloatBtn = () => {
  return (
    <>
      <FloatButton.Group
        shape="circle"
        // onClick={() => setFloatBtn(!floatBtn)}
        trigger="click"
      >
        <Popover placement="left" content="Help Center">
          {/* <Button>Left</Button> */}

          <FloatButton
            badge={
              {
                // count: 12,
              }
            }
            icon={<AiOutlineQuestionCircle />}
          />
        </Popover>
        <Popover placement="left" content="Following">
          <FloatButton
            badge={{
              // count: 123,
              overflowCount: 999,
            }}
            icon={<GiThreeFriends />}
            href="/homecomponent/following"
          />
        </Popover>
        <Popover placement="left" content="chat">
          <FloatButton
            badge={{
              // count: 123,
              overflowCount: 999,
            }}
            icon={<BsChatText />}
            href="/homecomponent/chatbox"
          />
        </Popover>
      </FloatButton.Group>
    </>
  );
};
export default WaterFloatBtn;
