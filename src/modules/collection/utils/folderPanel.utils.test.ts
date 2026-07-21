import type { Prop } from '../types/prop.type';
import { PropColumnPlacement } from '../types/propColumnPlacement.type';
import { computeFolderLayout } from './folderPanel.utils';

const makeProp = (id: string, order: number, columnPlacement: PropColumnPlacement): Prop => ({
  columnPlacement,
  id,
  manufacturer: 'KRSabers',
  name: id,
  order,
  state: 1,
  type: 1,
});

describe('computeFolderLayout', () => {
  it('pairs up all-left/right props in order', () => {
    const props = [
      makeProp('a', 0, PropColumnPlacement.LEFT),
      makeProp('b', 1, PropColumnPlacement.RIGHT),
      makeProp('c', 2, PropColumnPlacement.LEFT),
      makeProp('d', 3, PropColumnPlacement.RIGHT),
    ];

    expect(computeFolderLayout(props)).toEqual([
      { left: props[0], right: props[1], type: 'pair' },
      { left: props[2], right: props[3], type: 'pair' },
    ]);
  });

  it('breaks a pair mid-sequence when a middle prop appears', () => {
    const props = [
      makeProp('a', 0, PropColumnPlacement.LEFT),
      makeProp('b', 1, PropColumnPlacement.MIDDLE),
      makeProp('c', 2, PropColumnPlacement.LEFT),
      makeProp('d', 3, PropColumnPlacement.RIGHT),
    ];

    expect(computeFolderLayout(props)).toEqual([
      { left: props[0], type: 'pair' },
      { prop: props[1], type: 'full' },
      { left: props[2], right: props[3], type: 'pair' },
    ]);
  });

  it('flushes a trailing unpaired left', () => {
    const props = [makeProp('a', 0, PropColumnPlacement.LEFT), makeProp('b', 1, PropColumnPlacement.LEFT)];

    expect(computeFolderLayout(props)).toEqual([
      { left: props[0], type: 'pair' },
      { left: props[1], type: 'pair' },
    ]);
  });

  it('handles a folder starting on MIDDLE', () => {
    const props = [makeProp('a', 0, PropColumnPlacement.MIDDLE), makeProp('b', 1, PropColumnPlacement.LEFT)];

    expect(computeFolderLayout(props)).toEqual([
      { prop: props[0], type: 'full' },
      { left: props[1], type: 'pair' },
    ]);
  });

  it('returns an empty array for an empty folder', () => {
    expect(computeFolderLayout([])).toEqual([]);
  });

  it('renders a right-only row when there is no preceding left', () => {
    const props = [makeProp('a', 0, PropColumnPlacement.RIGHT)];

    expect(computeFolderLayout(props)).toEqual([{ right: props[0], type: 'pair' }]);
  });

  it('sorts props by order before laying them out, regardless of input order', () => {
    const props = [makeProp('b', 1, PropColumnPlacement.RIGHT), makeProp('a', 0, PropColumnPlacement.LEFT)];

    expect(computeFolderLayout(props)).toEqual([{ left: props[1], right: props[0], type: 'pair' }]);
  });
});
