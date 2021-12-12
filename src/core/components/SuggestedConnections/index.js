import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import Avatar from 'components/Avatar';
import RoundedButton from 'components/RoundedButton';
import Preloader from 'components/Preloader';
import stores from 'core/stores';
import { getUserName, redirectToUser, getConnectionLevel } from 'helpers/methods';
import { findTheme } from 'helpers/skins';

import * as S from './styles';

type Props = {
  user: any,
  col: any
}

const SuggestedConnections = ({ user, col, ...props }: Props) => {
  const [loading, setLoading] = useState(false);
  const [suggestedConnections, setSuggestedConnections] = useState([]);
  const { connectionsStore, sessionStore: { currentUser } } = stores;
  const history = useHistory();

  const userTheme = (currentUser && currentUser.skin && currentUser.skin.id) || null;
  const currentTheme = findTheme(userTheme);

  const fetchConnectionsData = async () => {
    setLoading(true);
    const params: any = {
      sort: '-created_at',
      page: {
        offset: 0,
        limit: col ? 5 : 4
      }
    };
    const suggestedConnectionsData = await connectionsStore.getSuggestedConnections(params);
    setSuggestedConnections(suggestedConnectionsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchConnectionsData();
  }, []);

  return !!suggestedConnections.length && (
    <S.Wrap col={col} {...props} borderColor={currentTheme.borderColor}>
      <h3>People You May Know</h3>
      <S.List>
        {suggestedConnections.map(item => {
          const userDegree = getConnectionLevel(item);
          const DegreeIcon = userDegree.icon;
          return (
            <S.UserCard key={item.id} onClick={() => redirectToUser(history, item)}>
              <S.AvatarCol>
                <Avatar rounded cover user={item} />
              </S.AvatarCol>

              <S.InfoCol>
                <S.UserName>
                  {getUserName(item)}
                  <DegreeIcon />
                </S.UserName>
                <S.UserDegree>
                  <DegreeIcon />
                  {userDegree.text}
                </S.UserDegree>
              </S.InfoCol>
              <S.Tooltip>
                {item.mutualConnectionsCount} Mutual friends
              </S.Tooltip>
            </S.UserCard>
          );
        })}
        <RoundedButton sm transparent onClick={() => history.push('/me/suggested-connections')}>
          Show More
        </RoundedButton>
      </S.List>
      {loading && <Preloader backdrop size={36} />}
    </S.Wrap>
  );
};

export default observer(SuggestedConnections);
