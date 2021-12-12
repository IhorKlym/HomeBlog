// @flow

import { observable, action, configure } from 'mobx';
import stores from 'core/stores';

configure({ enforceActions: 'observed' });

const usersStub = [
  { firstName: 'Test', lastName: 'User', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ046xhdwjhj5udDhi_TkRiU0Hf1-7qhXWp4qPOiIn5MmSNBx0v&usqp=CAU' },
  { firstName: 'Test', lastName: 'User', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvdxlJ06bpxLaCOh7g9krCAZOqAPiT5onTXBYMgLgLc42fHwdo&usqp=CAU' },
  { firstName: 'Test', lastName: 'User', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRaptqUXk01L7oTmmIKfbPWgEHd_0Bo1NL17LmUdJ3Os60jSs71&usqp=CAU' },
  { firstName: 'Test', lastName: 'User', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1Zow2_BQGQ-HJlS6uOWJo6azPl2bazvq3HCZHs707nv5mexH2&usqp=CAU' },
  { firstName: 'Test', lastName: 'User', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFYDtSQ3El3i_z53GR0JPrtULzs5Fc7Sb4dW0b7GFeTxKeKsWx&usqp=CAU' },
  { firstName: 'Test', lastName: 'User', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3w1oNucn_9_hqQNO4tRmGtV71z04ElZ-jEaO1otEjrKVtKRb4&usqp=CAU' },
  { firstName: 'Test', lastName: 'User', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSqwZJY2ZpgCvS2cBR6iqsenOAZPKT4KJ3wTKD9TuOa4jpLGKT&usqp=CAU' },
  { firstName: 'Test', lastName: 'User', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTVQcNyhUOLaEaS6XtY4psCI-orx7DMrefaecMo9pUzfyMAZOKA&usqp=CAU' },
  { firstName: 'Test', lastName: 'User', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRa73Zw6uMh_mm210mgm6LRKNRotienwiO5771O70ej37T2qBPg&usqp=CAU' }
];

const covers = [
  'https://i.pinimg.com/474x/9d/8e/7c/9d8e7cb55c0f51558475b9d479fb5f43--wallpaper-for-iphone-s-cellphone-wallpapers.jpg',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAA1BMVEUKu7UW14h8AAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIALA8UNAAFusnLHAAAAAElFTkSuQmCC',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT6GcOxF_qrjTh5k1mPvwElHIrF6Dmnt6z39TGeS611Au_LqTOc&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrwTolMmWXFg6hi9hXllaikhbww7xiYr_L2LtLNSQHulA9VSdI&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhOxV_z5eIeqwqdGsXcgKi32n2PRVK4bO-UEdsbb6wvbquSFpF&usqp=CAU'
];

const generateRandomNetworks = (count: number, initial: ?boolean = false) => {
  const { sessionStore: { currentUser } } = stores;
  const networks = initial ? [{
    type: 'MAIN',
    cover: covers[Math.floor(Math.random() * covers.length)],
    user: currentUser
  }] : [];
  for (let i = 0; i < count; i += 1) {
    const id = `${Math.floor(Math.random() * 1000)}`;
    networks.push({
      type: 'ACTIVE',
      cover: covers[Math.floor(Math.random() * covers.length)],
      user: {
        id,
        ...usersStub[Math.floor(Math.random() * usersStub.length)]
      }
    });
  }
  return networks;
};

class NetworksStore {
  @observable networks: any[] = generateRandomNetworks(21, true);

  @action.bound
  setMainNetwork(network: any) {
    const moreNetworks = generateRandomNetworks(Math.ceil(Math.random() * 21));
    this.networks = [
      ...this.networks.map(n => ({
        ...n,
        type: n === network ? 'MAIN' : 'PAST'
      })),
      ...moreNetworks
    ];
  }
}

export default new NetworksStore();
