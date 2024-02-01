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
import MyModal from '../../components/modal/MyModal';
import VoteModal from './VoteModal';
import ExitModal from './ExitModal';
import VoteCountHeart from '../../components/voteCountHeart/VoteCountHeart';
import ReportModal from './ReportModal';

interface MeetingRoomProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const MeetingRoom = (props: MeetingRoomProps) => {
  const [notice, setNotice] = useState<string>('공개된 정보인 [배정된 이름, 나이, 지역]만을 통해 60초씩 본인을 소개해주세요.');
  const [time, setTime] = useState<number>(1); // 공지 부분 타이머 시간, 초단위
  const [repeatCount, setRepeatCount] = useState<number>(4); // 공지 부분 타이머 반복 횟수
  const [modalTime, setModalTime] = useState<number>(10); // 투표 모달 타이머 시간, 초단위
  const [exitModalOpen, setExitModalOpen] = useState(false);

  useEffect(() => {
    if (props.state === 'step12') {
      setNotice('공개된 정보인 [키워드]를 통해 10분동안 자유롭게 대화를 나눠보세요.');
      setTime(2);
      setRepeatCount(0);
    } else if (props.state === 'step12_vote') {
      setModalTime(10); // 모달 시간 설정
      setVoteModalOpen(true);
    } else if (props.state === 'step123') {
      setVoteModalOpen(false);
      setNotice('공개된 정보인 [직업]을 통해 1명당 5분씩 질의응답 시간을 가져 보세요.');
      setTime(5);
      setRepeatCount(4);
    } else if (props.state === 'step123_vote') {
      setModalTime(10);
      setVoteModalOpen(true);
    } else if (props.state === 'step1234') {
      setNotice('참여자 분들의 얼굴이 공개되었습니다! 1명당 5분씩 자유롭게 질문 시간을 가져보세요. 질문 시간 후에는 밸런스 게임이 시작됩니다.');
      setTime(5);
      setRepeatCount(4);
    } else if (props.state === 'step12345') {
      setNotice('이번 주제는 “10년지기 이성친구 1명 vs 가끔 안부 묻는 이성친구 40명” 입니다. 10분 동안 대화를 나눠보세요!');
      setTime(10);
      setRepeatCount(3);
    } else if (props.state === 'step12345_vote') {
      setModalTime(15);
      setVoteModalOpen(true);
    }
  }, [props.state]);

  const myInfo = { userId: 'ssafy1', gender: false, nickName: '영자', area: '서울', birth: '19990520', tags: ['INFP', '산책', '패러글라이딩'], job: '개발자' };

  const userInfos = [
    { userId: 'ssafy1', gender: false, nickName: '영자', area: '서울', birth: '19990520', tags: ['INFP', '산책', '패러글라이딩'], job: '개발자' },
    { userId: 'ssafy2', gender: false, nickName: '영숙', area: '인천', birth: '19990520', tags: ['ESFJ', '영화보기', '게임'], job: '공무원' },
    { userId: 'ssafy3', gender: true, nickName: '영철', area: '서울', birth: '19990520', tags: ['ENFP', '영화보기', '클라이밍'], job: '대학생' },
    { userId: 'ssafy4', gender: true, nickName: '상철', area: '경기', birth: '19990520', tags: ['INFP', '수영', '넷플릭스보기'], job: '의사' },
  ];

  // 투표 관련 파트
  const voteValues = userInfos.filter((user) => user.gender !== myInfo.gender).map((user) => ({ id: user.userId, name: 'gender', value: user.nickName }));
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [voteModalOpen, setVoteModalOpen] = useState(false);

  // 신고 관련 파트
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportUser, setReportUser] = useState(''); // 신고할 회원
  const handleReport = (userId: string) => {
    // TODO: 회원 신고 로직 작성
    setReportUser(userId);
    setReportModalOpen(true);
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
                <div style={{ display: 'flex', gap: '4px' }}>
                  <HashtagButton backgroundColor={userInfo.gender ? '#A5A4E1' : '#E1A4B4'}>{userInfo.nickName}</HashtagButton>
                  {props.state.includes('step123') && myInfo.userId === userInfo.userId && <VoteCountHeart color={userInfo.gender ? 'purple' : 'pink'} count={1} />}
                </div>
                {userInfo.userId !== myInfo.userId && (
                  <ClickBox onClick={() => handleReport(userInfo.userId)}>
                    <Icon src={Report} width='24px' height='24px' />
                  </ClickBox>
                )}
              </HashtagContainer>
              <HashtagWrapper>
                {props.state.includes('step1') && (
                  <HashtagContainer>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{userInfo.area}
                    </HashtagButton>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{calcAge(userInfo.birth)}세
                    </HashtagButton>
                  </HashtagContainer>
                )}
                {props.state === 'step12' ? (
                  <HashtagContainer>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{userInfo.tags[0]}
                    </HashtagButton>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{userInfo.tags[1]}
                    </HashtagButton>
                    <HashtagButton fontSize='14px' padding='6px'>
                      #{userInfo.tags[2]}
                    </HashtagButton>
                  </HashtagContainer>
                ) : (
                  props.state.includes('step123') && (
                    <HashtagContainer>
                      <HashtagButton fontSize='14px' padding='6px'>
                        #{userInfo.tags[0]}
                      </HashtagButton>
                      <HashtagButton fontSize='14px' padding='6px'>
                        #{userInfo.tags[1]}
                      </HashtagButton>
                      <HashtagButton fontSize='14px' padding='6px'>
                        #{userInfo.tags[2]}
                      </HashtagButton>
                      <HashtagButton fontSize='14px' padding='6px'>
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
        <VideoButton exitModalOpen={exitModalOpen} setExitModalOpen={setExitModalOpen} />
      </VideoButtonContainer>
      <MyModal isOpen={voteModalOpen} setIsOpen={setVoteModalOpen}>
        <VoteModal
          isOpen={voteModalOpen}
          setIsOpen={setVoteModalOpen}
          state={props.state}
          setState={props.setState}
          time={modalTime}
          voteValues={voteValues}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </MyModal>
      <MyModal isOpen={exitModalOpen} setIsOpen={setExitModalOpen}>
        <ExitModal exitModalOpen={exitModalOpen} setExitModalOpen={setExitModalOpen} />
      </MyModal>
      <MyModal isOpen={reportModalOpen} setIsOpen={setReportModalOpen}>
        <ReportModal userId={reportUser} reportModalOpen={reportModalOpen} setReportModalOpen={setReportModalOpen} />
      </MyModal>
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
