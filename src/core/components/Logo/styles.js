import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { breakpoint } from 'styles/mixins';

const Logo = styled(Link)`
  width: 95px;
  min-width: 95px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;

  ${breakpoint.md`
    margin: 0 15px 0 0;
  `}

  ${breakpoint.lg`
    width: 148px;
  `}
`;

export default Logo;
