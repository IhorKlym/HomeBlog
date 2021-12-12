// @flow

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';

import RoundedButton from 'components/RoundedButton';
import CreatePostButton from 'components/CreatePostButton';
import Notificator from 'components/Notificator';
import UnreadConversationsNotificator from 'components/UnreadConversationsNotificator';
import DropDown from 'components/DropDown';
import Avatar from 'components/Avatar';
import GlobalSearchBar from 'components/GlobalSearchBar';

import stores from 'core/stores';
import { getUserName } from 'helpers/methods';
import useWindowSize from 'hooks/windowSize';

import * as S from './styles';

type Props = {
  setShowSearchBar: (boolean) => {},
}

const HeaderNavigation = ({ setShowSearchBar }: Props) => {
  const { sessionStore: { currentUser, logOutUser } } = stores;
  const windowSize = useWindowSize();
  const [isOpenNav, setOpenNav] = useState(false);

  const handleNav = async () => {
    await setShowSearchBar(false);
    await setOpenNav(!isOpenNav);
  };

  return (
    <>
      {(windowSize.width < 768) ? (
        <S.Wrap isOpen={isOpenNav} >
          <S.ButtonHumburger onClick={handleNav}>
            <span/>
            <span/>
            <span/>
          </S.ButtonHumburger>

          <S.Content>
            <GlobalSearchBar
              placeholder="Search WeKnow"
              themeSearch="nav"
            />

            <DropDown
              sm
              mobile
              label={<>
                <S.HeaderAvatar>
                  <Avatar rounded size={24} user={currentUser} />
                  {getUserName(currentUser, false, true) || 'Me'}
                </S.HeaderAvatar>
              </>}
            >
              <NavLink className="nav-item" activeClassName="active" to="/me" exact>View Profile</NavLink>
              <NavLink className="nav-item" activeClassName="active" to="/account-settings" exact>Account Settings</NavLink>
            </DropDown>

            <Notificator inDropDown />
            <UnreadConversationsNotificator />
            <S.ContentButtons>
              <CreatePostButton onOpenModal={handleNav} />
              <RoundedButton
                transparent="true"
                as={NavLink}
                to="/"
                onClick={logOutUser}>
                  Log Out
              </RoundedButton>
            </S.ContentButtons>
          </S.Content>
        </S.Wrap>
      ) : (
        <>
          <Notificator inDropDown />
          <UnreadConversationsNotificator />
          <DropDown
            sm
            nav
            label={<>
              <S.HeaderAvatar>
                <Avatar rounded size={24} user={currentUser} />
                {getUserName(currentUser, false, true) || 'Me'}
              </S.HeaderAvatar>
            </>}
          >
            <NavLink className="nav-item"  activeClassName="active" to="/me" exact>View Profile</NavLink>
            <NavLink className="nav-item" activeClassName="active" to="/account-settings" exact>Account Settings</NavLink>
            <NavLink className="nav-item" to="/" onClick={logOutUser}>Log Out</NavLink>
          </DropDown>
        </>
      )}
    </>
  );
};

export default observer(HeaderNavigation);
