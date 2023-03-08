import { ItemCollection } from '@src/models/itemCollection.model';
import { ItemType } from '@src/models/itemType.model';
import { State } from '@src/models/state.model';
import { mockApiCallTime } from '@src/utils/mock.utils';

export const getCollection = async (): Promise<ItemCollection[]> => {
  await mockApiCallTime();

  return [
    {
      id: '1',
      character: 'Obi-Wan Kenobi',
      chassisDesigner: 'Goth3Designs',
      manufacturer: "Roman's Props",
      name: 'MK1',
      state: State.DONE,
      type: ItemType.LIGHTSABER,
      apparition: 'Star Wars ANH',
      color: 'blue',
      soundboard: 'NanoBiscotte v3',
    },
    {
      id: '2',
      character: '',
      chassisDesigner: 'Goth3Designs',
      manufacturer: 'KRSabers',
      name: 'Regiis',
      state: State.DONE,
      type: ItemType.LIGHTSABER,
      color: 'all',
      soundboard: 'ProffieBoard v2',
    },
  ];
};
