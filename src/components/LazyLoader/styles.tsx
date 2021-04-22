import styled from 'styled-components';

import { colors } from 'constants/index';

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  background: ${colors.greyBackground};
`;
