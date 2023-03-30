export enum ItemType {
  NONE = 0,
  LIGHTSABER = 1,
  PROP = 2,
  COSTUME = 3,
}

export const getIconFromType = (type: ItemType) => {
  switch (type) {
    case ItemType.COSTUME:
      return 'deathTrooper';
    case ItemType.LIGHTSABER:
      return 'lightsabers';
    case ItemType.PROP:
      return 'blaster';
    case ItemType.NONE:
    default:
      return '';
  }
};
