import { primary } from 'core/styles/colors';
import styled from 'styled-components';
import { navigationHeightMobile, navigationHeightDesktop } from 'styles/variables';
import { breakpoint } from 'styles/mixins';
import { rgba } from 'polished';

export const Section = styled.section`
  width: 100vw;
  padding: 30px 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${rgba(primary, .7)};
  overflow: auto;
  
  ${breakpoint.md`
    margin: -${navigationHeightMobile}px 0;
    height: 100vh;
    padding: 0 40px 40px;
  `}
  
  ${breakpoint.lg`
    margin: -${navigationHeightDesktop}px 0;
  `}

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${primary};
    background-size: cover;
    opacity: .1;
    z-index: -1;
  }

  & p {
    font-size: 14px;
    line-height: 1.75;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }

  & a {
    font-size: 14px;
  }
`;

export const Heading = styled.h1`
  font-size: 46px;
  color: ${rgba(primary, .8)};
  margin-bottom: 10px;
`;

export const SubHeading = styled.span`
  font-size: 36px;
  color: ${primary};
  margin-bottom: 30px;
`;

export const SectionImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 180px;
  color: ${primary};
  margin-bottom: 30px;
  
  & > div {
    margin: 0 25px;
  }
  
  & > span {
    display: none;
    
    ${breakpoint.sm`
      display: block;
    `}
  }
`;
