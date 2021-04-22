import { useContext } from 'react';
import { AccountCircle } from '@material-ui/icons';

import AppContext from 'context/';

import {
  AppBarElement,
  ToolbarElement,
  AppBrandText,
  ExtraInfo,
  NavBarItem,
  TypographyItem,
} from './styles';

const NavBar = () => {
  const appContext = useContext(AppContext);

  const logoutUser = () => {
    localStorage.removeItem('AUTH_INFO');
    window.location.href = '/';
  };

  return (
    <AppBarElement>
      <ToolbarElement>
        <AppBrandText>Vehicular</AppBrandText>
        <ExtraInfo>
          {appContext.data?.userDetails?.isAuthenticated && <AccountCircle />}
          <NavBarItem>
            <TypographyItem>
              {appContext.data?.userDetails?.name}
            </TypographyItem>
          </NavBarItem>
          <NavBarItem onClick={logoutUser}>
            {appContext.data?.userDetails?.isAuthenticated && (
              <TypographyItem>Logout</TypographyItem>
            )}
          </NavBarItem>
        </ExtraInfo>
      </ToolbarElement>
    </AppBarElement>
  );
};

export default NavBar;
