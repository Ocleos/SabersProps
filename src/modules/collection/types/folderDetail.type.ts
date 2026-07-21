import type { Folder } from './folder.type';
import type { Prop } from './prop.type';

export type FolderDetail = Folder & {
  props: Prop[];
};
