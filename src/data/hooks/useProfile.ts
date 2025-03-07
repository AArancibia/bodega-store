import React, {useEffect, useState} from 'react';
import {getProfiles} from '../rest/profiles.service';
import {Profile} from '../../domain/model/Profile';
import {AreaChartOutlined, EditOutlined, HomeOutlined, ShoppingOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import type {ItemType} from 'antd/lib/menu/hooks/useItems';
import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../../redux/user/user.selector';

const equivalents = Object.create(
  {
    'HomeOutlined': HomeOutlined, 'ShoppingOutlined': ShoppingOutlined,
    'AreaChartOutlined': AreaChartOutlined, 'EditOutlined': EditOutlined
  },
);

export const useProfile = () => {
  const [profiles, setProfiles] = useState<Array<Profile>>([]);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    getProfiles(user)
      .then((profiles: Array<Profile>) => setProfiles(profiles))
      .catch()
  }, []);

  const buildMenuItems = (): ItemType[]  => {
    if(profiles.length) {
      return profiles.map((profile, index) => ({
        key: profile.url,
        icon: React.createElement(equivalents[profile.icon!]),
        label: React.createElement(NavLink, {to: profile.url!, children: profile.description}),
      } as ItemType));
    }
    return [];
  }

  return {
    profiles,
    buildMenuItems
  };
}
