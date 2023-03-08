import { ItemCollection } from '@src/models/itemCollection.model';
import { getCollection } from '@src/services/collection.api';
import { Status } from '@src/utils/status.utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ICollectionState {
  collection: ItemCollection[];
  status: Status;
  fetchCollection: () => void;
}

export const useCollectionStore = create<ICollectionState>()(
  devtools((set) => ({
    collection: [],
    status: Status.IDLE,

    fetchCollection: async () => {
      set((state) => ({ ...state, status: Status.PENDING }));

      try {
        const collection = await getCollection();
        set(() => ({ collection: collection, status: Status.RESOLVED }));
      } catch (error) {
        console.error(error);
        set(() => ({ collection: [], status: Status.REFUSED }));
      }
    },
  })),
);
