import styled from 'styled-components';
import DefaultAvatar from 'components/Avatar';
import { breakpoint, marbleBg } from 'styles/mixins';
import { fontLink, fontText } from 'styles/variables';
import { primary } from 'styles/colors';

export const Wrap = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  padding-top: 8px;
  ${({ theme }) => marbleBg(theme)}
  
  ${breakpoint.md`
    max-width: 980px;
    margin: 0 auto 20px;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  background-color: ${({ background }) => background};
`;

export const Avatar = styled(DefaultAvatar)`
  width: 50px;
  height: 50px;
  position: absolute;
  top: -21px;
  left: 50%;
  transform: translate3d(-50%,0,0);
`;

export const FollowButton = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
  button {
    color: ${primary};
    text-transform: none;
    font-size: 16px;
  }
`;

export const Author = styled.span`
  font-weight: 600;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  font-family: ${fontLink};
  padding: 10px;
  text-align: center;
  transition: color 0.3s ease;
  
  ${({ hasHover }) => hasHover && `
    cursor: pointer;
    
    &:hover {
      color: ${primary};
      font-weight: normal;
      font-family: ${fontText};
      font-style: italic;
    }
  `}
  
  & > i {
    margin-left: 6px;
    color: ${primary};
    font-size: 12px;
  }
  
  ${breakpoint.md`
    font-size: 20px;
  `}
`;

export const Text = styled.div`
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 20px;
  text-align: center;
  max-height: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
    
  span {
    transition: 0.3s all ease;
    cursor: pointer;
    
    &:hover {
      color: ${primary};
    }
  }
`;

export const ReadMoreBtnWrap = styled.div`
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  &:after {
    content: '';
    display: inline-flex;
    width: 5px;
    height: 5px;
    border-left: 1px solid ${primary};
    border-bottom: 1px solid ${primary};
    transform: rotate(-45deg);
    margin-left: 5px;
  }
`;

export const MainImg = styled.div`
  overflow: hidden;
  border-radius: 20px;
  margin: 15px 0;
  
  img { margin: 0 }
  
  ${breakpoint.lg`
    max-width: 100%;
    max-height: 300px;
  `}
`;
