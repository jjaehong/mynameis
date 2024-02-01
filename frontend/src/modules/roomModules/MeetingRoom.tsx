import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NoticeBox from '../../components/noticeBox/NoticeBox';
import Timer from '../../components/timer/Timer';
import VideoCard from '../../components/videoCard/VideoCard';
import VideoButton from '../../components/videoButton/VideoButton';
import HashtagButton from '../../components/hashtagButton/HashtagButton';
import Icon from '../../components/icon/Icon';
import { Report } from '../../config/IconName';
import { calcAge } from '../../utils/numberUtil';

interface MeetingRoomProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const MeetingRoom = (props: MeetingRoomProps) => {
  const [notice, setNotice] = useState<string>('공개된 정보인 [배정된 이름, 나이, 지역]만을 통해 60초씩 본인을 소개해주세요.');
  const [time, setTime] = useState<number>(1); // 초단위
  const [repeatCount, setRepeatCount] = useState<number>(4);

  useEffect(() => {
    if (props.state.includes('step12')) {
      setNotice('공개된 정보인 [키워드]를 통해 10분동안 자유롭게 대화를 나눠보세요.');
      setTime(10);
      setRepeatCount(0);
    }
    if (props.state.includes('step123')) {
      setNotice('공개된 정보인 [직업]을 통해 1명당 5분씩 질의응답 시간을 가져 보세요.');
      setTime(5);
      setRepeatCount(4);
    }
    if (props.state.includes('step1234')) {
      setNotice('참여자 분들의 얼굴이 공개되었습니다! 1명당 5분씩 자유롭게 질문 시간을 가져보세요. 질문 시간 후에는 밸런스 게임이 시작됩니다.');
      setTime(5 * 60);
      setRepeatCount(4);
    }
    if (props.state.includes('step12345')) {
      setNotice('이번 주제는 “10년지기 이성친구 1명 vs 가끔 안부 묻는 이성친구 40명” 입니다. 10분 동안 대화를 나눠보세요!');
      setTime(10 * 60);
      setRepeatCount(3);
    }
  }, [props.state]);

  const userInfos = [
    { userId: 'ssafy1', gender: false, nickName: '영자', area: '서울', birth: '19990520', tags: ['INFP', '산책', '패러글라이딩'], job: '개발자' },
    { userId: 'ssafy2', gender: false, nickName: '영숙', area: '인천', birth: '19990520', tags: ['ESFJ', '영화보기', '게임'], job: '공무원' },
    { userId: 'ssafy3', gender: true, nickName: '영철', area: '서울', birth: '19990520', tags: ['ENFP', '영화보기', '클라이밍'], job: '대학생' },
    { userId: 'ssafy4', gender: true, nickName: '상철', area: '경기', birth: '19990520', tags: ['INFP', '수영', '넷플릭스보기'], job: '의사' },
  ];

  const reportMember = (userId: string) => {
    // TODO: 회원 신고 로직 작성
    console.log(userId);
  };

  return (
    <MeetingRoomContainer>
      <NoticeContainer>
        <NoticeBox noticeText={notice} />
        <Timer repeatCount={repeatCount} time={time} state={props.state} setState={props.setState} />
      </NoticeContainer>
      {/* ******************************************************** */}
      {/* ********** 4단계가 지나면 openvidu 카메라 ON ************* */}
      {/* ******************************************************** */}
      <VideoContainer>
        {userInfos.map((userInfo) => (
          <VideoCard width={'40vw'} height={'37vh'}>
            <InfoContainer>
              <HashtagContainer justifyContent='space-between'>
                <HashtagButton backgroundColor={userInfo.gender ? '#A5A4E1' : '#E1A4B4'}>{userInfo.nickName}</HashtagButton>
                <ClickBox onClick={() => reportMember(userInfo.userId)}>
                  <Icon src={Report} width='24px' height='24px' />
                </ClickBox>
              </HashtagContainer>
              <HashtagWrapper>
                {props.state.includes('step1') && (
                  <HashtagContainer>
                    <HashtagButton backgroundColor={'#4F4F4F'} fontSize='14px' padding='6px'>
                      #{userInfo.area}
                    </HashtagButton>
                    <HashtagButton backgroundColor={'#4F4F4F'} fontSize='14px' padding='6px'>
                      #{calcAge(userInfo.birth)}세
                    </HashtagButton>
                  </HashtagContainer>
                )}
                {props.state === 'step12' ? (
                  <HashtagContainer>
                    <HashtagButton backgroundColor={'#4F4F4F'} fontSize='14px' padding='6px'>
                      #{userInfo.tags[0]}
                    </HashtagButton>
                    <HashtagButton backgroundColor={'#4F4F4F'} fontSize='14px' padding='6px'>
                      #{userInfo.tags[1]}
                    </HashtagButton>
                    <HashtagButton backgroundColor={'#4F4F4F'} fontSize='14px' padding='6px'>
                      #{userInfo.tags[2]}
                    </HashtagButton>
                  </HashtagContainer>
                ) : (
                  props.state === 'step123' && (
                    <HashtagContainer>
                      <HashtagButton backgroundColor={'#4F4F4F'} fontSize='14px' padding='6px'>
                        #{userInfo.tags[0]}
                      </HashtagButton>
                      <HashtagButton backgroundColor={'#4F4F4F'} fontSize='14px' padding='6px'>
                        #{userInfo.tags[1]}
                      </HashtagButton>
                      <HashtagButton backgroundColor={'#4F4F4F'} fontSize='14px' padding='6px'>
                        #{userInfo.tags[2]}
                      </HashtagButton>
                      <HashtagButton backgroundColor={'#4F4F4F'} fontSize='14px' padding='6px'>
                        #{userInfo.job}
                      </HashtagButton>
                    </HashtagContainer>
                  )
                )}
              </HashtagWrapper>
            </InfoContainer>
          </VideoCard>
        ))}
      </VideoContainer>
      <VideoButtonContainer>
        <VideoButton />
      </VideoButtonContainer>
    </MeetingRoomContainer>
  );
};

////////////////////////////////////////////////////
/////////// styled component //////////////////////
///////////////////////////////////////////////////
const MeetingRoomContainer = styled.div`
  padding: 10px;
`;

const NoticeContainer = styled.div`
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const VideoContainer = styled.div`
  padding: 10px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
  row-gap: 30px;
  flex-wrap: wrap;
`;

const VideoButtonContainer = styled.div`
  margin-top: 3px;
  display: flex;
  justify-content: center;
`;

interface FlexBoxProps {
  justifyContent?: string;
  alignItems?: string;
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 100%;
  z-index: 10;
`;

const HashtagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const HashtagContainer = styled.div<FlexBoxProps>`
  margin-right: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-start')};
`;

const ClickBox = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export default MeetingRoom;