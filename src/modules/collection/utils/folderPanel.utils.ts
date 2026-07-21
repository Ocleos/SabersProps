import type { Prop } from '../types/prop.type';
import { PropColumnPlacement } from '../types/propColumnPlacement.type';

export type FolderRow = { type: 'pair'; left?: Prop; right?: Prop } | { type: 'full'; prop: Prop };

export const computeFolderLayout = (props: Prop[]): FolderRow[] => {
  const sorted = [...props].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const rows: FolderRow[] = [];
  let pendingLeft: Prop | undefined;

  for (const prop of sorted) {
    if (prop.columnPlacement === PropColumnPlacement.LEFT) {
      if (pendingLeft) {
        rows.push({ left: pendingLeft, type: 'pair' });
      }
      pendingLeft = prop;
    } else if (prop.columnPlacement === PropColumnPlacement.RIGHT) {
      if (pendingLeft) {
        rows.push({ left: pendingLeft, right: prop, type: 'pair' });
        pendingLeft = undefined;
      } else {
        rows.push({ right: prop, type: 'pair' });
      }
    } else if (prop.columnPlacement === PropColumnPlacement.MIDDLE) {
      if (pendingLeft) {
        rows.push({ left: pendingLeft, type: 'pair' });
        pendingLeft = undefined;
      }
      rows.push({ prop, type: 'full' });
    }
  }

  if (pendingLeft) {
    rows.push({ left: pendingLeft, type: 'pair' });
  }

  return rows;
};
