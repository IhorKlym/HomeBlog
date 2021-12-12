import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { grayDarken, gray } from 'styles/colors';

export const Wrapper = styled.section``;

export const Nav = styled.ul`
  display: flex;
  width: 100%;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: space-between;

`;

export const Item = styled.li`
  width: 48%;
`;

export const ItemLink = styled(NavLink)`
  position: relative;
  font-size: 14px;
  background-color: ${grayDarken};
  color: white;
  transition: all .3s ease-in-out;
  white-space: nowrap;
  display: block;
  width: 100%;
  height: 50px;
  line-height: 54px;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2.1px;

  &:hover,
  &.active {
    color: black;
    background-color: ${gray};
  }
`;

