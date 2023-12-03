import React from 'react';
import { useMediaQuery } from 'react-responsive';
import useIsMobile from '../../../hooks/useIsMobile';
// import useIsTab from "../../../hooks/useIsTab";
import useIsTab from '../../../hooks/useIsTab';
import PlayerViewer from './PlayerViewer';
import ViewIcon from '../../../icons/Bottombar/ViewIcon';
import IconArrowsFullscreen from '../../../icons/Bottombar/FullScreen';
import { Row, Col, Typography, Button, Popover, Space } from 'antd';
import SharePopover from 'Pages/Buyer/Live/SharePopover';

const { Title, Text } = Typography;
const MotionPlayer = () => {
  return (
    <div style={{ height: `100%`, width: `100%` }}>
      <PlayerViewer />
    </div>
  );
};

export const MemoizedMotionPlayer = React.memo(MotionPlayer);

const HLSContainer = ({ width, fullScreenRef }) => {
  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  const FullScreenBtn = (ref) => {
    if (ref.current) {
      const fullscreenApi =
        ref.current.requestFullscreen ||
        ref.current.webkitRequestFullScreen ||
        ref.current.mozRequestFullScreen ||
        ref.current.msRequestFullscreen;
      if (!document.fullscreenElement) {
        fullscreenApi.call(ref.current);
      } else {
        document.exitFullscreen();
      }
    }
  };
  const rowSpacing = isMobile
    ? 12
    : isTab
    ? 14
    : isLGDesktop
    ? 16
    : isXLDesktop
    ? 24
    : 0;

  const gutter = 4;

  const spacing = rowSpacing - gutter;

  return (
    <div
      style={{
        height: `calc(100% - ${2 * spacing}px)`,
        width: width - 2 * spacing,
        margin: spacing,
        // transition: `all ${800 * 1}ms`,
        // transitionTimingFunction: 'ease-in-out',
        position: 'relative',
      }}
      id="video-section">
      <MemoizedMotionPlayer />
      {/* <button className="">
        <ViewIcon fillcolor="red" />
      </button> */}
      <div className="absolute top-0 left-0 m-sm flex w-full">
        <Space>
          <button className="" onClick={() => FullScreenBtn(fullScreenRef)}>
            <IconArrowsFullscreen fillcolor="white" />
          </button>
          {/* <Row className=" flex-1"> */}
          {/* <Col span={12} className="text-start "> */}
          <Title level={3} className="!text-orange-200 ">
            👨‍🍳🍳In the Kitchen with MBE👩‍🍳🍪
          </Title>

          <div className="just-show-in-fullscreen hidden">
            <Popover
              content={<SharePopover />}
              title="Share"
              trigger="click"
              getPopupContainer={() => fullScreenRef.current}>
              <Button className="px-xl" type="primary">
                Share
              </Button>
            </Popover>
          </div>
        </Space>
        {/* <HeartFilled className="text-[30px] mx-xl text-red-600" /> */}
        {/* </Row> */}
      </div>
    </div>
  );
};

export default HLSContainer;
