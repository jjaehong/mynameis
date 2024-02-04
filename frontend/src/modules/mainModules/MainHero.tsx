import React, { useEffect } from 'react';
import styled from 'styled-components';
import heroCouple from '../../assets/img/hero_couple.png';
import heroSolo from '../../assets/img/hero_solo.png';
import Button from '../../components/button/Button';
import Icon from '../../components/icon/Icon';
import { Down } from '../../config/IconName';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userState';
import { UserInfo } from '../../recoil/atoms/userState';
const StyledMainHeroContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  background-color: #f2eeea;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// const StyledHero = styled(Hero)`
//   width: 100%; // Set the width to 100%
// `;
const StyledHeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; // 이미지가 container를 가득 채우도록 설정
  position: relative;
`;

const StyledHeroTextContainer = styled.div`
  position: absolute;
  left: 120px;
  top: 33%;
`;
const StyledHeroTitle = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 128px;
  color: #efefef;
  margin-bottom: 15px;
`;
const StyledHeroSubtitle1 = styled.p`
  font-family: 'Pretendard ExtraBold';
  font-size: 32px;
  color: #ececec;
  margin-bottom: 2px;
`;
const StyledHeroSubtitle2 = styled.p`
  font-family: 'Pretendard ExtraBold';
  font-size: 32px;
  color: #ececec;
  margin-bottom: 20px;
`;

const StyledHeroBtnContainer = styled.div`
  display: flex;
  column-gap: 15px;
`;

const StyledHeroDownContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;
`;

const StyledHeroDownText = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 20px;
  color: #efefef;
  text-align: center;
`;
const MainHero = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userInfoState);

  console.log('userInfo', userInfo.couple);
  return (
    <StyledMainHeroContainer>
      {!userInfo.couple && <StyledHeroImage src={heroSolo} alt='hero Solo' />}
      {userInfo.couple && <StyledHeroImage src={heroCouple} alt='hero Solo' />}

      <StyledHeroTextContainer>
        <StyledHeroTitle>저의 이름은</StyledHeroTitle>
        <StyledHeroSubtitle1>매 단계, 새로운 이야기.</StyledHeroSubtitle1>
        <StyledHeroSubtitle2>나만의 매력을 풀어가는 소개팅을 즐겨보세요.</StyledHeroSubtitle2>

        {userInfo.couple && (
          <StyledHeroBtnContainer>
            <Button backgroundColor='#E1A4B4' width='100px' height='40px' borderRadius='15px' fontColor='white'>
              채팅하기
            </Button>
            <Button backgroundColor='#fff' width='100px' height='40px' borderRadius='15px' fontColor='#E1A4B4'>
              화상채팅
            </Button>
          </StyledHeroBtnContainer>
        )}
        {!userInfo.couple && (
          <Button backgroundColor='#E1A4B4' width='100px' height='40px' borderRadius='15px' fontColor='white'>
            시작하기
          </Button>
        )}
      </StyledHeroTextContainer>

      <StyledHeroDownContainer>
        <StyledHeroDownText>My name is</StyledHeroDownText>
        <Icon src={Down} />
      </StyledHeroDownContainer>
    </StyledMainHeroContainer>
  );
};

export default MainHero;