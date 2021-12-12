import styled from 'styled-components';
import DefaultAvatar from 'components/Avatar';
import { fontLink } from 'styles/variables';
import { breakpoint } from 'styles/mixins';
import { primary } from 'styles/colors';

export const Wrap = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const NetworkRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  button {
    margin-left: 5px;
  }
`;

export const NetworkMobileRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;

  ${breakpoint.md`
    flex-direction: row;
  `}
`;

export const Avatar = styled(DefaultAvatar)`
  width: 100px;
  height: 100px;

  ${breakpoint.md`
    width: 160px;
    height: 160px;
  `}
`;

export const InfoCol = styled.div`
  display: flex;
  flex-direction: column;

  ${({ left }) => left && `
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;

    button {
      display: inline-flex;
      font-size: 13px;
      text-align: left;

      & > i,
      & span > i {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
        margin-right: 5px;
      }
    }
  `}

  ${({ center }) => center && `
    align-items: center;
    text-align: center;
    flex: 1;
    max-width: 600px;
    padding: 0 20px;
    margin-bottom: 20px;
  `}

  ${({ right }) => right && `
    align-items: flex-end;
    display: none;
  `}

  ${breakpoint.sm`
    ${({ left }) => left && `
      button {
        font-size: 16px;
      }
    `}
  `}

  ${breakpoint.md`
    ${({ left }) => left && `
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin-bottom: 0;

      button {
        margin: 0 0 15px;

        & > i,
        & span > i {
          margin-right: 10px;
        }

        &:last-child { margin: 0; }
      }
    `}

    ${({ right }) => right && `
      display: flex;
    `}
  `}
`;

export const UserName = styled.div`
  font-size: 30px;
  line-height: 42px;
  margin-top: -15px;
  margin-bottom: 30px;
  font-weight: normal;

  i {
    color: ${primary};
    font-size: 14px;
    margin-right: 7px;
  }

  ${breakpoint.md`
    white-space: nowrap;

    i {
      display: none;
    }
  `}

  .brash-text {
    display: inline-flex;
    align-items: center;
  }

  .brash {
    top: -8%;
    left: -5%;
    right: -5%;
    bottom: 0;
    height: 100%;
  }

  ${breakpoint.md`
    font-size: 50px;
  `}
`;

export const UserLocation = styled.div`
  margin-left: 20px;
  display: inline-flex;
  align-items: center;

  i {
    margin-right: 8px;
  }
`;

export const UserBioButton = styled.div`
  display: inline-flex;
  color: ${primary};
  font-family: ${fontLink};
  font-size: 16px;
  font-weight: normal;
  cursor: pointer;
  position: relative;
  padding-right: 20px;
  margin-bottom: 10px;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 7px;
    height: 7px;
    border-bottom: 1px solid ${primary};
    border-right: 1px solid ${primary};
    transform: rotate(45deg);
    margin-top: -6px;
  }

  ${breakpoint.md`
    display: none;
  `}
`;

export const UserBioContent = styled.div`
  display: none;
  white-space: pre-wrap;
  text-align: center;

  ${breakpoint.md`
    display: block;
  `}
`;

export const UserBio = styled.div`
  margin-top: -30px;
  margin-bottom: 20px;
  word-break: break-word;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  align-self: flex-end;
  width: 100%;

  ${breakpoint.md`
    align-self: center;
  `}

  ${({ isOpen }) => isOpen && `
    ${UserBioContent} {
      display: block;
    }
  `}

  ${breakpoint.md`
    margin-top: 20px;
  `}
`;

export const PostsList = styled.div`
  margin: -20px 0 30px;

  ${breakpoint.md`
    margin: 10px 0 30px;
  `}
`;

export const InfoContact = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ visibility }) => visibility && `
    pointer-events: none;
    cursor: auto;

    & > * {
      color: #949494;
    }
  `}
`;

export const ActionMobile = styled.div`
  min-width: 79px;
  text-align: right;

  i {
    font-size: 22px;
    margin-left: auto;
    margin-right: 0;
  }
`;

export const MobileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${({ flexEnd }) => flexEnd ? 'flex-end' : 'flex-start'};
  min-width: 100%;
  margin-bottom: 10px;
  margin-top: 25px;

  ${breakpoint.md`
    display: none;
  `}

  ${({ flexEnd }) => !flexEnd && `
    ${ActionMobile} {
      i {
        margin-top: -8px;
      }
    }
  `}
`;
