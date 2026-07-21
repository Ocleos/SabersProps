import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import type { Prop } from '~src/modules/collection/types/prop.type';
import { PropColumnPlacement } from '~src/modules/collection/types/propColumnPlacement.type';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import FolderPropRow from './folderPropRow.component';

const mockPutData = jest.fn().mockResolvedValue(undefined);
const mockRemovePropFromFolder = jest.fn().mockResolvedValue(undefined);

jest.mock('~src/utils/supabase.utils', () => ({
  PROPS_TABLE: 'props',
  putData: (...args: unknown[]) => mockPutData(...args),
}));

jest.mock('../../services/folders.api', () => ({
  removePropFromFolder: (...args: unknown[]) => mockRemovePropFromFolder(...args),
}));

const prop: Prop = {
  columnPlacement: PropColumnPlacement.LEFT,
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 1,
  type: 1,
};

describe('FolderPropRow', () => {
  it('renders the prop name', async () => {
    await renderWithProviders(<FolderPropRow folderId='folder-1' prop={prop} />);

    expect(screen.getByText('Graflex')).toBeTruthy();
  });

  it('persists the new column placement when a column tab is pressed', async () => {
    await renderWithProviders(<FolderPropRow folderId='folder-1' prop={prop} />);

    fireEvent.press(screen.getByLabelText('Milieu'));

    await waitFor(() =>
      expect(mockPutData).toHaveBeenCalledWith('props', { columnPlacement: PropColumnPlacement.MIDDLE, id: 'prop-1' }),
    );
  });

  it('removes the prop from the folder when the remove action is pressed', async () => {
    await renderWithProviders(<FolderPropRow folderId='folder-1' prop={prop} />);

    fireEvent.press(screen.getByLabelText('Retirer du dossier'));

    await waitFor(() => expect(mockRemovePropFromFolder).toHaveBeenCalledWith('prop-1'));
  });

  it('wraps the reorder handle in a gesture detector when a drag gesture is provided', async () => {
    // RNTL's fireEvent can't drive a real gesture-handler touch sequence (see
    // FOLDERS_FEATURE.md Phase 6) — this only confirms the handle renders without crashing once
    // a real Gesture is attached, same as the pre-existing "renders without crashing while
    // active" case below.
    const drag = Gesture.Simultaneous(Gesture.Pan());
    await renderWithProviders(
      <GestureHandlerRootView>
        <FolderPropRow drag={drag} folderId='folder-1' prop={prop} />
      </GestureHandlerRootView>,
    );

    expect(screen.getByLabelText('Réordonner')).toBeTruthy();
  });

  it('renders without crashing while active', async () => {
    await renderWithProviders(<FolderPropRow folderId='folder-1' isActive prop={prop} />);

    expect(screen.getByText('Graflex')).toBeTruthy();
  });
});
