import styled from 'styled-components';
import { navigationHeightDesktop, navigationHeightMobile, topBarHeight, searchBarHeightDesktop, searchBarHeightMobile } from 'styles/variables';
import { breakpoint, pseudo, marbleBg, baseTransition } from 'styles/mixins';
import { secondaryL, whitePrimary } from 'styles/colors';

export const PageWrap = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: ${({ withHeader, withTopBar, withSearch }) => {
    let offset = 0;
    if (withHeader) offset += navigationHeightMobile;
    if (withTopBar) offset += topBarHeight;
    if (withSearch) offset += searchBarHeightMobile;
    return offset;
  }}px;
  position: relative;
  background: ${({ theme }) => (theme && theme.bgColor) || whitePrimary};
  ${baseTransition()}

  ${breakpoint.lg` padding-top: ${({ withHeader, withTopBar, withSearch }) => {
    let offset = 0;
    if (withHeader) offset += navigationHeightDesktop;
    if (withTopBar) offset += topBarHeight;
    if (withSearch) offset += searchBarHeightDesktop;
    return offset;
  }}px; `}
  overflow: hidden;
`;

export const AppBar = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1031;
`;

export const ProgressBar = styled.div`
  width: 100%;
  display: flex;
  height: ${topBarHeight}px;
  background: ${({ theme }) => theme ? theme.patternBg : secondaryL};

  ${pseudo()}
  &:before {
    width: ${({ progress }) => progress || 0}%;
    height: 100%;
    ${({ theme }) => marbleBg(theme ? theme.id : null)}
    ${baseTransition()}
  }
`;
