import styled  from 'styled-components';
import { breakpoint } from 'styles/mixins';

export const Toggler = styled.div`  
  button {
    padding: 3px 5px 0;

    ${breakpoint.md`
      padding: 3px 10px 0;
    `}
    
    i {
      margin-right: 6px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default { Toggler };
