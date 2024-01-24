import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewCard from '../../components/reviewCard/ReviewCard';
import VoteCountHeart from '../../components/voteCountHeart/VoteCountHeart';
import Footer from '../../components/Footer';
import NoticeBox from '../../components/noticeBox/NoticeBox';
import Toast from '../../components/toast/Toast';
import Header from '../../components/header/Header';
import { click } from '@testing-library/user-event/dist/click';

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  background-color: #f2eeea;
`;
interface Review {
  id: number;
  text: string;
  reviewer: string;
}

const Main = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      text: '진짜 신기하게도 블라인드 소개팅이라는 게임 같은 느낌이었어요. 처음에는 상대방의 얼굴도 모르고 막연하게 대화를 시작해서 조금은 어색했는데, 그게 오히려 더 재밌는 경험이었어요. 서서히 서로에 대한 정보를 알아가면서 마치 로맨틱한 퍼즐을 맞추는 느낌이었어요. 결국엔 커플로 연결돼서 정말 기뻤어요. 후회 없이 이 서비스를 이용한 것 같아요!',
      reviewer: '2X세 김모씨',
    },
    {
      id: 2,
      text: '블라인드 소개팅의 장점 중 하나는 처음부터 상대방의 외모나 외적인 특징에 휘둘리지 않고, 성격과 개성을 중시한다는 점인 것 같아요. 처음에는 어색할 수 있지만, 서로의 정보를 공개하면서 더욱 자연스럽게 친해지고 이어지는 만남에서는 진정한 소재로 발전할 수 있어요. 이런 식의 접근 방식은 정말 새롭고 매력적이었어요.',
      reviewer: '3X세 양모씨',
    },
    {
      id: 3,
      text: '일단 처음에는 상대방이 누군지 모르니까 조금 긴장되더라고요. 그래도 정보를 조금씩 공개하면서 서로에 대해 더 알아가는 과정이 참 흥미로웠어요. 솔직히 이런 소개팅은 처음이라서 좀 어색할 줄 알았는데, 블라인드로 진행되니까 색다른 매력이 있었어요!',
      reviewer: '2X세 김모씨',
    },
  ]);

  const handleLogin = () => {
    console.log('로그인');
    setIsLogin(true);
  };

  const handleLogout = () => {
    console.log('로그아웃');
    setIsLogin(false);
  };
  const handleSignUp = () => {
    console.log('회원가입');
  };
  return (
    <MainContainer>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} onClickLogin={handleLogin} onClickLogout={handleLogout} onClickSignUp={handleSignUp} />
      {/* <div>
        <VoteCountHeart color='pink' count={1} />
        <VoteCountHeart color='purple' count={1} />
      </div>
      <ReviewCard color='pink' review={reviews[0]} /> */}
    </MainContainer>
  );
};

export default Main;
