// @flow

export const DEFAULT_LOGGED_USER_ROUTE = '/newsfeed';
 
export const PROFILE_VISIBILITIES = [
  { value: 'semi_private', label: 'Semi-Private (default)', text: 'Only your connections and their connections can access your content.', visibleFor: 'Connections + their connections' },
  { value: 'private', label: 'Private', text: 'Only your connections can access your content.', visibleFor: 'Connections' },
  { value: 'public', label: 'Public', text: 'Everyone on WeKnow can access your content.', visibleFor: 'Everyone' }
];

export const LEVEL_FILTERS = [
  { label: 'Connections', value: '1' },
  { label: '2nd degree connections', value: '2' },
  { label: 'Extended Network', value: '0' }
];
