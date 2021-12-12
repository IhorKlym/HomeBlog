import styled from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { primary } from 'styles/colors';
import { fontLink, fontText } from 'styles/variables';

export const Participants = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 0 10px;
`;

export const Participant = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${primary};
  height: 30px;
  border-radius: 15px;
  padding: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const ParticipantAvatar = styled.div`
  width: 20px;
  height: 20px;
`;

export const ParticipantName = styled.div`
  padding: 0 10px;
  font-size: 12px;
  line-height: 12px;
  font-family: ${fontLink};
  font-weight: normal;
`;

export const ParticipantDeleteButton = styled.button.attrs(() => ({ type: 'button' }))`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: relative;
  margin-top: -10px;
 
  &:before, &:after {
    display: block;
    position: absolute;
    content: '';
    right: 3px;
    top: 15px;
    height: 1px;
    width: 15px;
    background-color: ${primary};
  }
  
  &:before {
    transform: rotate(45deg);
  }
  
  &:after {
    transform: rotate(-45deg);
  }  
`;

export const Connections = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const ConnectionAvatarWrap = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ConnectionAvatar = styled.div`
  width: 100%;
  height: 100%;
`;

export const ConnectionCheckmark = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  top: 0;
  left: 0;
  background: rgba(255,255,255,0.7);
  border: 1px solid ${primary};
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    color: ${primary};
  }
`;

export const ConnectionName = styled.div`
  flex: 1;
  padding-left: 10px;
  word-break: break-word;
  font-family: ${fontLink};
  font-weight: normal;
`;

export const Connection = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  
  ${breakpoint.md`
    max-width: 65%;
  `}

  ${({ choosen }) => choosen && `
    ${ConnectionName} {
      font-family: ${fontText};
      font-style: italic;
      font-weight: normal;
      color: ${primary};
    }
  `}
`;

export const NoData = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonWrap = styled.div`
  position: absolute;
  bottom: 20px;
  right: 35px;
  
  button {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 10px;
    
    ${breakpoint.md`
      position: relative;
      width: fit-content;
    `}
  }
`;
