
// @flow

import marble1 from 'static/img/marbles/marble_1.png';
import marble2 from 'static/img/marbles/marble_2.png';
import marble3 from 'static/img/marbles/marble_3.png';
import marble4 from 'static/img/marbles/marble_4.png';
import marble5 from 'static/img/marbles/marble_5.png';
import marble6 from 'static/img/marbles/marble_6.png';
import marble7 from 'static/img/marbles/marble_7.png';
import marble8 from 'static/img/marbles/marble_8.png';
import marble9 from 'static/img/marbles/marble_9.png';

export const SKINS = [
  { id: '1', name: 'Claret', patternBg: '#eec5b2', pattern: marble7, bgColor: '#F9E9E2', borderColor: '#491928' }, // Burgundy
  { id: '2', name: 'Dark Green Olive', patternBg: '#cfe2d5', pattern: marble3, bgColor: '#EFF5F1', borderColor: '#56624E' }, // Dark Green
  { id: '3', name: 'Desert', patternBg: '#ffead2', pattern: marble1, bgColor: '#FFF3E4', borderColor: '#DFC798' }, // Yellow
  { id: '4', name: 'Black Shadows', patternBg: '#f2f2f2', pattern: marble6, bgColor: '#f2ebec', borderColor: '#D9CCCD' }, // Taupe
  { id: '5', name: 'Antique Brass', patternBg: '#F9E9E2', pattern: marble4, bgColor: '#F9F1EE', borderColor: '#EEC5B2' }, // Peach
  { id: '6', name: 'Baby Blue Eyes', patternBg: '#E1E5EF', pattern: marble5, bgColor: '#E1E5EF', borderColor: '#BEC7E0' }, // Light Blue
  { id: '7', name: 'Forest green', patternBg: '#EFF5F1', pattern: marble8, bgColor: '#EFF5F1', borderColor: '#CFE2D5' } // Mint Green
];
export const SYSTEM_SKIN = { id: '8', name: 'SYSTEM', patternBg: '#bec7e0', pattern: marble2, bgColor: '#E1E5EF', borderColor: '#264697' };
export const ANONYMOUS_SKIN = { id: '9', name: 'ANONYMOUS', patternBg: '#F2F2F2', pattern: marble9, bgColor: '#F9F9F9', borderColor: '#272727' };

export const findTheme = (type: any) => {
  let theme = ANONYMOUS_SKIN;
  if (type === 'anonymous') theme = ANONYMOUS_SKIN;
  else if (type === 'system') theme = SYSTEM_SKIN;
  else {
    const allSkins = [...SKINS, SYSTEM_SKIN, ANONYMOUS_SKIN];
    const skin = allSkins.find(s => (s.id === type || s.name === type));
    if (skin) theme = skin;
  }
  return theme;
};
