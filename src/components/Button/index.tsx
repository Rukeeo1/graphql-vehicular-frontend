import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { colors } from 'constants/index';

export const ButtonEl = styled(Button)`
  background-color: ${colors.purple} !important;
  color: ${colors.white} !important;
  width: 100%;
  margin: 20px 0 !important;

`;

export default ButtonEl;
