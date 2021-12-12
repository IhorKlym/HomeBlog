import styled from 'styled-components';
import DefaultButton from 'components/Button';
import { breakpoint } from 'styles/mixins';
import { black, gray, primary, redPink } from 'styles/colors';
import { fontText } from 'styles/variables';

export const Contacts = styled.div`
  width: 100%;
`;

export const Contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: relative;
  
  span {
    font-size: 16px;
    font-weight: bold;
  }

  button {
    margin-left: 10px;
    white-space: nowrap;
  }
`;

export const ContactAvatar = styled.div`
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${gray};
  color: ${black};

  i {
    font-size: 30px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.03);
    }
  }
`;

export const ContactInfo = styled.div`
  padding: 6px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  span {
    font-size: 16px;
    padding: 5px 0;
  }
`;

export const ModalContent = styled.div`
  padding: 20px 10px;
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${primary};
  margin-bottom: 30px;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 3;
  
  ${breakpoint.md`
    padding: 20px 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  `}
  
  & > div {
    max-width: 100%;
    margin-bottom: 10px;
    
    ${breakpoint.md`
      max-width: 70%;
      width: 100%;
      margin-bottom: 0;
    `}
  }

  ${Contacts} {
    max-width: 100%;
  }
  
  button {
    width: 25%;
    z-index: 1;
  }
`;

export const PhoneFieldWrap = styled.div`
  .react-tel-input {
    .country-list {
      max-height: 200px;
      border-radius: 10px;
      width: 240px;
      
      ${breakpoint.md`
        width: 300px;
    `}
    }
    
    .form-control {
      width: 100%;
      height: 50px;
      background-color: white;
      border-radius: 50px;
      color: black;
      line-height: 1.83;
      font-size: 16px;
      font-weight: 300;
      font-stretch: normal;
      font-family: ${fontText};
      font-style: normal;
      border: 1px solid #D7D7D7;
    }
    
    .flag-dropdown {
      border-radius: 50px 0 0 50px;
      border: 1px solid #D7D7D7;
    }
    
    .selected-flag:hover, .react-tel-input .selected-flag:focus, .react-tel-input .selected-flag.open {
      background: transparent;
    }
    
    .flag-dropdown.open .selected-flag {
      background: transparent;
    }
  }
`;

export const PhoneFieldError = styled.div`
  color: ${redPink};
  font-size: 14px;
  margin-top: 4px;
  font-family: ${fontText};
`;

export const ModalButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  
  button {
    width: 260px;
    font-size: 11px;
    margin: 8px 0 7px;
    
    ${breakpoint.md`
      width: 340px;
      font-size: 14px;
    `}
  }
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
`;

export const Button = styled(DefaultButton)`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
`;
