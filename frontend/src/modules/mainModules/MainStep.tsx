import React from 'react';
import styled from 'styled-components';
import MainStepImg from '../../assets/img/main_step.svg';
import { BlinkRed } from '../../config/IconName';
import Icon from '../../components/icon/Icon';
const StyledMainStepContainer = styled.div`
  width: 100%;
  height: 900px;
  background-color: #f2eeea;
  display: flex;
  column-gap: 85px;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

const StyledSvg = styled.img`
  width: 40vw;
`;
const StyledTextContainer = styled.div`
  width: 37vw;
`;

const StyledSubTitle = styled.p`
  font-family: 'Pretendard Medium';
  color: #333333;
  letter-spacing: 4px;
  margin-bottom: 7px;
`;
const StyledTitle = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 36px;
  color: #333333;
`;

const StyledStep = styled.div`
  margin-top: 30px;
  padding-bottom: 10px;
`;
const StyledStepTextContainer = styled.div`
  display: flex;
`;
const StyledStepText = styled.p`
  font-family: 'Pretendard Bold';
  font-size: 18px;
  color: #333;
  margin-left: 7px;
`;

const StyledStepContents = styled.p`
  font-family: 'Pretendard Regular';
  font-size: 18px;
  color: #888;
  margin-top: 10px;
  line-height: 27px;
`;
const MainStep = () => {
  return (
    <StyledMainStepContainer>
      <StyledSvg src={MainStepImg} alt='Main Step' />
      <StyledTextContainer>
        <StyledSubTitle>features</StyledSubTitle>
        <StyledTitle>이런 단계를 거쳐요</StyledTitle>
        <StyledStep>
          <StyledStepTextContainer>
            <Icon src={BlinkRed} />
            <StyledStepText>블라인드 소개 단계</StyledStepText>
          </StyledStepTextContainer>
          <StyledStepContents>나이, 성별, 목소리, 지역만을 공개하여 자신을 나타내보세요.</StyledStepContents>
        </StyledStep>
        <StyledStep>
          <StyledStepTextContainer>
            <Icon src={BlinkRed} />
            <StyledStepText>흥미와 특기 공개 단계</StyledStepText>
          </StyledStepTextContainer>
          <StyledStepContents>흥미, 특기 그리고 직업을 단계적으로 공유해보세요.</StyledStepContents>
        </StyledStep>
        <StyledStep>
          <StyledStepTextContainer>
            <Icon src={BlinkRed} />
            <StyledStepText>얼굴 공개 및 취향 탐색 단계</StyledStepText>
          </StyledStepTextContainer>
          <StyledStepContents>상대방의 얼굴을 확인한 후, 추가 질문을 통해 서로의 취향과 성격을 알아가는 시간을 가져보세요.</StyledStepContents>
        </StyledStep>
        <StyledStep>
          <StyledStepTextContainer>
            <Icon src={BlinkRed} />
            <StyledStepText>투표 및 매칭 단계</StyledStepText>
          </StyledStepTextContainer>
          <StyledStepContents>서로에게 관심이 있을 경우 투표로 매칭을 결정하고, 매칭된 분들은 1 : 1 시간을 가져 자유롭게 대화할 수 있어요.</StyledStepContents>
        </StyledStep>
      </StyledTextContainer>
    </StyledMainStepContainer>
  );
};

export default MainStep;