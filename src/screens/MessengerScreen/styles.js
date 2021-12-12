import styled, { css } from 'styled-components';
import { breakpoint } from 'styles/mixins';
import { gray, black, whitePrimary } from 'styles/colors';

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const ConversationsCol = styled.div`
  flex: 1;
  max-width: 100%;
  color: ${black};
  padding: 0 20px;

  ${breakpoint.md`
    max-height: 80vh;
    max-width: 300px;
  `}
  
  ${breakpoint.lg`
    max-height: 80vh;
    max-width: 400px;
  `}
  
  @media only screen and (min-height: 760px) {
    max-height: 85vh;
  }
  
  @media only screen and (min-height: 1000px) {
    max-height: 90vh;
  }
`;

export const MessengerCol = styled.div`
  flex: 1;
  position: fixed;
  right: -100%;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  background: ${whitePrimary};
  transition: 0.4s;
  opacity: 0;
  
  ${({ visibilityMobile }) => visibilityMobile && css`
    right: 0;
    opacity: 1;
  `}
  
  ${breakpoint.md`
    max-height: 80vh;
    position: relative;
    margin-left: 10px;
    margin-right: 20px;
    max-height: 75vh;
    border-radius: 20px;
    right: auto;
    top: auto;
    z-index: auto;
    border: 1px solid ${gray};
    overflow-x: hidden;
  `}
  
  @media only screen and (min-height: 760px) and (min-width: 768px) {
    max-height: 85vh;
  }
`;

export const EmptyMessenger = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
