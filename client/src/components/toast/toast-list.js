import styled from 'styled-components';
import { respondTo } from '../../utils/_variable';

export const ToastList = styled.ul`
  list-style: none;
  padding: 0;
  position: fixed;
  bottom: 0;
  z-index: 99999999999;
  left: 50%;
  ${respondTo.mobile`
    width: 90%;
    font-size: 12px;
  `}
  ${respondTo.desktop`
    max-width: 50%;
  `}
  transform: translate(-50%);
  li {
    margin: 0;
    padding-bottom: 8px;
  }
`;
