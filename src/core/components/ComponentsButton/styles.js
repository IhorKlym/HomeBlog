import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { breakpoint } from 'styles/mixins';
import { zindexs } from 'styles/variables';

const Button = styled(Link)`
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 7px;
  top: 7px;
  font-size: 22px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  color: black;
  box-shadow: 0 3px 6px -3px rgba(0,0,0,.6);
  z-index: ${zindexs.tooltip};

  ${breakpoint.lg`
    top: 15px;
    display: flex;
  `}
`;

export default Button;
