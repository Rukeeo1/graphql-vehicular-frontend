import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';

import { colors } from 'constants/index';

export const AppBarElement = styled(AppBar)`
  height: 70px;
  background: ${colors.white};
  padding: 0 1rem;
`;
export const ToolbarElement = styled(Toolbar)``;
export const TypographyItem = styled(Typography)`
  margin-left: 1rem;
  color: ${colors.white};
`;
export const IconButtonItem = styled(IconButton)`
  margin-left: auto;
`;
export const AppBrandText = styled.h1`
  font-family: 'Dancing Script', cursive;
  cursor: pointer;
`;

export const ExtraInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items:center;
  width: 100%;
`;

export const NavBarItem = styled(Box)`
  margin-left: 1rem;
  cursor: pointer;
`;
export const Text = styled.p``;

export const Logout = styled(Box)``;
