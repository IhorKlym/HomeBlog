import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { gray, primary, whitePrimary } from 'styles/colors';
import { fontLink, fontText } from 'styles/variables';

export const Wrap = styled.div`
  width: 100%;
  background: ${gray};
  min-height: 100%;
`;

export const TopBar = styled.div`
  background: #F3F3F3;
  padding: 20px 0;
  font-size: 36px;
  line-height: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  
  ${breakpoint.md`
    padding: 20px 0 30px;
  `}
`;

export const Title = styled.div`
  font-weight: 300;
  font-size: 24px;
  line-height: 36px;
  
  ${breakpoint.md`
    font-size: 36px;
    line-height: 36px;
  `}

  .brash-wrap {
    font-style: italic;
  }
`;

export const BackButton = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 1.25px;
  line-height: 19px;
  font-weight: 600;
  font-family: ${fontLink};
  transition: .3s;
  color: ${primary};
  cursor: pointer;
  align-self: flex-start;
  margin-bottom: 12px;
  
  ${breakpoint.md`
    font-size: 18px;
  `}
  
  &:hover {
    color: black;
  }
    
  i {
    margin-right: 12px;
    line-height: 19px;
    font-size: 18px;
    
    ${breakpoint.md`
      font-size: 20px;
    `}
  }
`;

export const Content = styled.div`
  padding: 30px 0;
`;

export const Tabs = styled.div`
  display: flex;
`;

export const Tab = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 20px 20px 0 0;
  font-size: 26px;
  line-height: 42px;
  font-family: ${fontLink};
  height: 80px;
  
  ${breakpoint.md`
    font-size: 36px;
    height: 110px;
  `}

  span {
    margin-left: 10px;
    font-family: ${fontText};
  }

  ${({ active }) => active && `
    background: ${whitePrimary};
  `}
`;

export const TabConent = styled.div`
  ${({ active }) => !active && `
    display: none;
  `}
`;

