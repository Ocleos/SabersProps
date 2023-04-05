export enum PropType {
  NONE = 0,
  LIGHTSABER = 1,
  PROP = 2,
  COSTUME = 3,
}

export const getIconFromType = (type: PropType) => {
  switch (type) {
    case PropType.COSTUME:
      return 'deathTrooper';
    case PropType.LIGHTSABER:
      return 'lightsabers';
    case PropType.PROP:
      return 'blaster';
    case PropType.NONE:
    default:
      return '';
  }
};
