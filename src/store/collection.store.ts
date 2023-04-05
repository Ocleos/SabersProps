import { Prop } from '@src/models/prop.model';
import { getProps, postProps } from '@src/services/props.api';
import { Status } from '@src/utils/status.utils';
import { sortBy } from 'lodash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ICollectionState {
  props: Prop[];
  status: Status;
  submitStatus: Status;
  fetchProps: () => void;
  submitProp: (prop: Prop, onSuccessCallback: Function) => void;
}

export const useCollectionStore = create<ICollectionState>()(
  devtools((set) => ({
    props: [],
    status: Status.IDLE,
    submitStatus: Status.RESOLVED,

    fetchProps: async () => {
      set((state) => ({ ...state, status: Status.PENDING }));

      try {
        const props: Prop[] = await getProps();
        set((state) => ({ ...state, props: sortBy(props, ['name']), status: Status.RESOLVED }));
      } catch (error) {
        console.error(error);
        set((state) => ({ ...state, props: [], status: Status.REFUSED }));
      }
    },

    submitProp: async (prop: Prop, onSuccessCallback: Function) => {
      set((state) => ({ ...state, submitStatus: Status.PENDING }));

      try {
        await postProps(prop);

        if (onSuccessCallback) {
          onSuccessCallback();
        }

        set((state) => ({ ...state, submitStatus: Status.RESOLVED }));
      } catch (error) {
        console.error(error);
        set((state) => ({ ...state, submitStatus: Status.REFUSED }));
      }
    },
  })),
);
