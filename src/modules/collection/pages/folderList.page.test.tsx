import type { FolderWithPropsCount } from '~src/modules/collection/services/folders.api';
import { useFoldersStore } from '~src/modules/collection/stores/folders.store';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import FolderListPage from './folderList.page';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useIsFocused: () => true,
  useRouter: () => ({ push: mockPush }),
}));

const folders: FolderWithPropsCount[] = [
  { id: 'folder-1', name: 'Panel A', order: 0, propsCount: 1 },
  { id: 'folder-2', name: 'Panel B', order: 1, propsCount: 0 },
];

const mockGetFoldersWithPropsCount = jest.fn().mockResolvedValue(folders);
const mockReorderFolders = jest.fn().mockResolvedValue(undefined);

jest.mock('../services/folders.api', () => ({
  getFoldersWithPropsCount: () => mockGetFoldersWithPropsCount(),
  reorderFolders: (...args: unknown[]) => mockReorderFolders(...args),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  deleteData: jest.fn(),
  FOLDERS_TABLE: 'folders',
}));

// DraggableFlatListWrapper has its own dedicated test (rendering/empty-state; the drag gesture
// itself is a documented manual-verification gap, see FOLDERS_FEATURE.md Phase 6) — stub it here
// so this test only covers FolderListPage's own fetching/composition, same convention as the
// other child components this page composes.
type MockDraggableFlatListItem = { drag: undefined; index: number; isActive: boolean; item: unknown };
type MockDraggableFlatListProps = {
  data: unknown[];
  keyExtractor: (item: unknown, index: number) => string;
  onDragEnd: (params: { data: unknown[] }) => void;
  renderItem: (params: MockDraggableFlatListItem) => React.ReactNode;
} & Record<string, unknown>;

// Captured so tests can simulate a completed drag without a real gesture-handler runtime.
let mockCapturedOnDragEnd: MockDraggableFlatListProps['onDragEnd'] | undefined;

jest.mock('~src/components/list/draggableFlatListWrapper.component', () => ({
  __esModule: true,
  default: ({ data, keyExtractor, renderItem, onDragEnd }: MockDraggableFlatListProps) => {
    mockCapturedOnDragEnd = onDragEnd;
    const { Fragment } = require('react');
    return (
      <Fragment>
        {data.map((item, index) => (
          <Fragment key={keyExtractor(item, index)}>
            {renderItem({ drag: undefined, index, isActive: false, item })}
          </Fragment>
        ))}
      </Fragment>
    );
  },
}));

beforeEach(() => {
  useFoldersStore.setState(useFoldersStore.getInitialState(), true);
});

describe('FolderListPage', () => {
  it('renders every folder once loaded, with its prop count', async () => {
    await renderWithProviders(<FolderListPage />);

    await waitFor(() => expect(screen.getByText('Panel A')).toBeTruthy());
    expect(screen.getByText('Panel B')).toBeTruthy();
    expect(screen.getByText('1 prop')).toBeTruthy();
    expect(screen.getByText('0 prop')).toBeTruthy();
  });

  it('clears the selected folder and navigates to the form when the FAB is pressed', async () => {
    useFoldersStore.getState().setSelectedFolder(folders[0]);
    await renderWithProviders(<FolderListPage />);
    await waitFor(() => expect(mockGetFoldersWithPropsCount).toHaveBeenCalled());

    // Each folder card also renders an ActionsMenu trigger button — the FAB is the last button in
    // the tree.
    const buttons = screen.getAllByRole('button');
    fireEvent.press(buttons[buttons.length - 1]);

    expect(useFoldersStore.getState().selectedFolder).toBeUndefined();
    expect(mockPush).toHaveBeenCalledWith('/collection/folders/form');
  });

  it('shows an error state and retries the query when the fetch fails', async () => {
    mockGetFoldersWithPropsCount.mockRejectedValueOnce(new Error('network error'));
    await renderWithProviders(<FolderListPage />);

    await waitFor(() => expect(screen.getByText('Une erreur inconnue est survenue.')).toBeTruthy());

    mockGetFoldersWithPropsCount.mockResolvedValueOnce(folders);
    fireEvent.press(screen.getByText('Réessayer'));

    await waitFor(() => expect(screen.getByText('Panel A')).toBeTruthy());
  });

  it('persists the new order when a drag ends', async () => {
    await renderWithProviders(<FolderListPage />);
    await waitFor(() => expect(screen.getByText('Panel A')).toBeTruthy());

    const reordered = [folders[1], folders[0]];
    mockCapturedOnDragEnd?.({ data: reordered });

    await waitFor(() => expect(mockReorderFolders).toHaveBeenCalledWith(reordered));
  });
});
