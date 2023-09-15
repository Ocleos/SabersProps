import i18n from '~src/i18n.config';

export enum PropState {
  NONE = 0,
  PRODUCTION = 1,
  DESIGN = 2,
  MISSING_PIECES = 3,
  READY = 4,
  IN_PROGRESS = 5,
  DONE = 6,
  ON_SALE = 7,
  SOLD = 8,
}

export type IPropState = {
  colorScheme: string;
  label: string;
};

export const propStates: Record<PropState, IPropState> = {
  [PropState.NONE]: { colorScheme: 'primary', label: '' },
  [PropState.PRODUCTION]: { colorScheme: 'error', label: i18n.t('collection:STATE.PRODUCTION') },
  [PropState.DESIGN]: { colorScheme: 'error', label: i18n.t('collection:STATE.DESIGN') },
  [PropState.MISSING_PIECES]: { colorScheme: 'warning', label: i18n.t('collection:STATE.MISSING_PIECES') },
  [PropState.READY]: { colorScheme: 'warning', label: i18n.t('collection:STATE.READY') },
  [PropState.IN_PROGRESS]: { colorScheme: 'warning', label: i18n.t('collection:STATE.IN_PROGRESS') },
  [PropState.DONE]: { colorScheme: 'success', label: i18n.t('collection:STATE.DONE') },
  [PropState.ON_SALE]: { colorScheme: 'info', label: i18n.t('collection:STATE.ON_SALE') },
  [PropState.SOLD]: { colorScheme: 'info', label: i18n.t('collection:STATE.SOLD') },
};
