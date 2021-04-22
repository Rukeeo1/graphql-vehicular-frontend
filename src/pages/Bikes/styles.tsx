import styled from 'styled-components';
import { tableContainerHeight } from 'constants/index';

export const PageContainter = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const TableContainer = styled.div`
  width: 1130px;
  height: ${tableContainerHeight};
  margin-top: 50px;
`;
