import styled from 'styled-components';
import { black } from 'styles/colors';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 45px 30px;
  border: 1px solid ${({ color }) => color || black};
  border-radius: 60px;
  min-height: 180px;
  margin-bottom: 20px;
  
  h2 {
    color: black;
    font-weight: 400;
    font-size: 20px;
    text-align: center;
  }
`;

export default Wrap;
