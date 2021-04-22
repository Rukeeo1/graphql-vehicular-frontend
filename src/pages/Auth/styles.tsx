import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core/';

import { colors } from 'constants/index';

export const AuthFormBody = styled.form`
  padding: 1rem 3rem;
  overflow-y: scroll;
`;
export const AuthContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const AuthFormContainer = styled.div`
  width: 500px;
  max-height: 80%;
  max-width: 90%;
  margin: auto 0;
  overflow-y: scroll;
  border: 1px solid ${colors.purple};
  height: 500px;
`;

export const AuthFormHeader = styled.div`
  display: flex;
  height: 3rem;
`;

export const AuthFormHeaderTabItem = styled.div<{ isActive?: boolean }>`
  background: ${({ isActive }) => (isActive ? colors.purple : colors.white)};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AuthFormHeaderTabItemText = styled.h4<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? colors.white : colors.purple)};
  cursor: pointer;
`;

export const CircularLoader = styled(CircularProgress)`
  background: ${colors.purple};
`;
