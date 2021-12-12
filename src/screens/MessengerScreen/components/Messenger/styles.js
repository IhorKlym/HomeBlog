import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { breakpoint } from 'styles/mixins';
import { grayDarken, gray, black, primary, whitePrimary } from 'styles/colors';
import { fontLink, fontText } from 'styles/variables';
import TextFieldFormatted from 'components/TextFieldFormatted';
import DefaultRoundedButton from 'components/RoundedButton';

export const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DataItemBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  position: relative;
  border-top: 1px solid ${gray};
  
  ${breakpoint.md`
    position: sticky;
    bottom: 0;
  `}
  
  &:not(:last-child) {
    border-bottom: 1px solid ${gray};
  }
  ${({ grow }) => grow && `
    flex-grow: 1;
  `}

  strong {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const DataItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 20px;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${gray};
  }
  ${({ grow }) => grow && `
    flex-grow: 1;
  `}

  strong {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const ChatCount = styled.span`
  color: black;
  font-size: 18px;
  font-family: ${fontLink};
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${primary};
  }
`;

export const BackButton = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  transition: .3s;
  border: none;
  color: ${primary};
  margin-right: 10px;
  
  &:hover {
    color: black;
  }
  
  ${breakpoint.md`
    display: none;
  `}
`;

export const NewMessageForm = styled.div`
  background-color: ${whitePrimary};
  position: relative;

  .field-formatted {
    max-height: 200px;
    overflow-y: auto;
  }

  .quill-editor {
    .ql-toolbar {
      border: none;
      border-bottom: 1px solid #ccc;
    }
    .ql-container {
      border: none;
    }
  }
`;

export const Participants = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  span {
    display: inline-block;
  }
`;

export const Participant = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const ParticipantAvatar = styled.div`
  width: 40px;
  height: 40px;
  
  .avatar__tooltip {
    display: none;
  }
`;

export const ParticipantName = styled.div`
  margin-left: 10px;
  color: ${black};
  font-family: ${fontLink};
  font-size: 22px;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${primary};
    font-weight: normal;
    font-style: italic;
    font-family: ${fontText};
  }
`;

export const List = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  background: ${whitePrimary};
  margin-top: 10px;
  
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0, 0.0);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${gray};
  }        
  
  & > div {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

export const ParticipantWrap = styled.div`
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  ${Participant} {
    margin-right: 0;
    margin-bottom: 7px;
  }
  
  ${ParticipantName} {
    font-size: 18px;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const TextFieldWrap = styled.div`
  border: 1px solid #DFC798;
  padding: 0 20px;
  border-radius: ${({ radius }) => radius}px;
  position: relative;

  .message-attachment {
    margin: 0 -10px;
  }
`;

export const TextField = styled(TextFieldFormatted)`
  font-size: 16px;
  position: relative;
  * {
    font-size: 16px;
  }
`;

export const NoData = styled.div`
  padding: 20px;
  text-align: center;
  color: ${grayDarken};
  p {
    margin: 2px 0;
  }
`;

export const MsgsDate = styled.div`
  border-top: 1px solid ${grayDarken};
  margin: 10px;
  padding-top: 10px;
  text-align: center;
  font-size: 12px;
  color: black;
`;

export const Text = styled.div`
  text-align: left;
  padding: 15px 0;
`;

export const Message = styled.div`
  padding: 10px 50px 10px 10px;
  display: flex;

  .message-avatar {
    flex-shrink: 0;
    border-radius: 50%;
    
    img {
      border-radius: 50%;
    }
  }
  .message-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 17px;
  }
  .message-text {
    background-color: #FFEAD2;
    padding: 0 20px;
    border-radius: 20px 20px 20px 0;
    color: black;
    font-size: 16px;
    line-height: 24px;
    font-family: ${fontText};
    max-width: 250px;
    
    ${breakpoint.md`
      max-width: 600px;
    `}
    
    span {
      word-break: break-word;
     
      & > div {
        margin-bottom: 30px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    
    .message-attachment {
      background: ${whitePrimary};
      margin: 0 -20px 0;
      border-radius:  0 0 11px 0;
      border: 1px solid #FFEAD2;
      color: black;
      
      & > div {
        margin-top: 0;
        margin-bottom: 0;
      }
      
      ${breakpoint.md`
        min-width: 300px;
      `}
      
      ${breakpoint.lg`
        min-width: 450px;
      `}
      
      ${breakpoint.xl`
        min-width: 520px;
      `}
    }
  }
  .message-date {
    font-size: 12px;
    margin-top: 8px;
    color: black;
  }

  ${({ isMy }) => isMy && `
    padding: 10px 10px 10px 50px;
    justify-content: flex-end;
    text-align: right;

    .message-text {
      background-color: ${primary};
      border-radius: 20px 20px 0 20px;
      color: white;
      
      .mention {
        color: white;

        &:hover {
          color: white;

          span {
            color: white;
          }
        }
        
        span {
          color: white;
        }
      }
      
      .message-attachment {
        border-color: ${primary};
        border-radius: 0 0 0 11px;
      }
    }
    
    span {
      & > div {
        margin-bottom: 30px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

    .message-content {
      order: -1;
    }
  `}
`;

export const ButtonSent = styled(DefaultRoundedButton)`
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 15px;
  text-align: center;
  color: ${primary};
  
  &:hover {
    color: ${primary};
    background-color: transparent;
  }
  
  i {
    margin: 0;
  }
`;
