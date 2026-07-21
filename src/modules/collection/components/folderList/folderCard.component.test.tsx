import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import type { Folder } from '~src/modules/collection/types/folder.type';
import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import FolderCard from './folderCard.component';

const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ navigate: mockNavigate }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  deleteData: jest.fn(),
}));

const folder: Folder = {
  id: 'folder-1',
  name: 'Panel A',
  order: 0,
};

describe('FolderCard', () => {
  it('renders the folder name and prop count', async () => {
    await renderWithProviders(<FolderCard count={3} folder={folder} />);

    expect(screen.getByText('Panel A')).toBeTruthy();
    expect(screen.getByText('3 props')).toBeTruthy();
  });

  it('shows a zero count when none is provided', async () => {
    await renderWithProviders(<FolderCard folder={folder} />);

    expect(screen.getByText('0 prop')).toBeTruthy();
  });

  it('navigates to the folder detail page when pressed', async () => {
    await renderWithProviders(<FolderCard folder={folder} />);

    fireEvent.press(screen.getByText('Panel A'));

    expect(mockNavigate).toHaveBeenCalledWith('/collection/folders/folder-1');
  });

  it('wraps the reorder handle in a gesture detector when a drag gesture is provided', async () => {
    // RNTL's fireEvent can't drive a real gesture-handler touch sequence (see
    // FOLDERS_FEATURE.md Phase 6) — this only confirms the handle renders without crashing once
    // a real Gesture is attached, same as the pre-existing "renders without crashing while
    // active" case below.
    const drag = Gesture.Simultaneous(Gesture.Pan());
    await renderWithProviders(
      <GestureHandlerRootView>
        <FolderCard drag={drag} folder={folder} />
      </GestureHandlerRootView>,
    );

    expect(screen.getByLabelText('Réordonner')).toBeTruthy();
  });

  it('renders without crashing while active', async () => {
    await renderWithProviders(<FolderCard folder={folder} isActive />);

    expect(screen.getByText('Panel A')).toBeTruthy();
  });
});
