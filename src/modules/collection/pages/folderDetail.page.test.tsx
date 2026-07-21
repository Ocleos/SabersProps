import type { FolderDetail } from '~src/modules/collection/types/folderDetail.type';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import FolderDetailPage from './folderDetail.page';

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useLocalSearchParams: () => ({ id: 'folder-1' }),
}));

const mockGetFolderWithProps = jest.fn();
const mockReorderFolderProps = jest.fn().mockResolvedValue(undefined);

jest.mock('../services/folders.api', () => ({
  getFolderWithProps: (...args: unknown[]) => mockGetFolderWithProps(...args),
  reorderFolderProps: (...args: unknown[]) => mockReorderFolderProps(...args),
}));

// FolderPropRow has its own dedicated test (column placement / remove actions) — stub it here so
// this test only covers FolderDetailPage's own fetching/composition.
jest.mock('../components/folderDetail/folderPropRow.component', () => (props: { prop: { name: string } }) => {
  const { Text } = require('react-native');
  return <Text>{props.prop.name}</Text>;
});

// AddPropsToFolderSheet has its own dedicated test (it owns its FAB trigger + bottom-sheet
// presentation), stub it here so this test doesn't need the Gesture/BottomSheet providers.
jest.mock('../components/folderDetail/addPropsToFolderSheet.component', () => () => {
  const { Text } = require('react-native');
  return <Text>AddPropsToFolderSheet</Text>;
});

// FolderPanelPreview has its own dedicated test (layout algorithm / rendering) — stub it here so
// this test only covers the count of props it's threaded, not its internals again.
jest.mock(
  '../components/folderDetail/folderPanelPreview.component',
  () =>
    ({ props }: { props: { name: string }[] }) => {
      const { Text } = require('react-native');
      return <Text>{`Preview:${props.length}`}</Text>;
    },
);

// DraggableFlatListWrapper has its own dedicated test (rendering/empty-state; the drag gesture
// itself is a documented manual-verification gap, see FOLDERS_FEATURE.md Phase 6) — stub it here
// so this test only covers FolderDetailPage's own fetching/composition, same convention as the
// other child components this page composes.
type MockDraggableFlatListItem = { drag: undefined; index: number; isActive: boolean; item: unknown };
type MockDraggableFlatListProps = {
  data: unknown[];
  keyExtractor: (item: unknown, index: number) => string;
  ListHeaderComponent?: React.ReactElement | null;
  onDragEnd: (params: { data: unknown[] }) => void;
  renderItem: (params: MockDraggableFlatListItem) => React.ReactNode;
} & Record<string, unknown>;

// Captured so tests can simulate a completed drag without a real gesture-handler runtime.
let mockCapturedOnDragEnd: MockDraggableFlatListProps['onDragEnd'] | undefined;

jest.mock('~src/components/list/draggableFlatListWrapper.component', () => ({
  __esModule: true,
  default: ({ data, keyExtractor, ListHeaderComponent, renderItem, onDragEnd }: MockDraggableFlatListProps) => {
    mockCapturedOnDragEnd = onDragEnd;
    const { Fragment } = require('react');

    if (data.length === 0) {
      const EmptyComponent = require('~src/components/empty/empty.component').default;
      return (
        <Fragment>
          {ListHeaderComponent}
          <EmptyComponent />
        </Fragment>
      );
    }

    return (
      <Fragment>
        {ListHeaderComponent}
        {data.map((item, index) => (
          <Fragment key={keyExtractor(item, index)}>
            {renderItem({ drag: undefined, index, isActive: false, item })}
          </Fragment>
        ))}
      </Fragment>
    );
  },
}));

const folderDetail: FolderDetail = {
  id: 'folder-1',
  name: 'Panel A',
  order: 0,
  props: [
    { id: 'prop-1', manufacturer: 'KRSabers', name: 'Graflex', order: 0, state: 1, type: 1 },
    { id: 'prop-2', manufacturer: 'KRSabers', name: 'Anakin', order: 1, state: 1, type: 1 },
  ],
};

const renderPage = () => renderWithProviders(<FolderDetailPage />);

describe('FolderDetailPage', () => {
  it('renders every prop the folder contains', async () => {
    mockGetFolderWithProps.mockResolvedValueOnce(folderDetail);
    await renderPage();

    await waitFor(() => expect(screen.getByText('Graflex')).toBeTruthy());
    expect(screen.getByText('Anakin')).toBeTruthy();
  });

  it('renders the add-props sheet', async () => {
    mockGetFolderWithProps.mockResolvedValueOnce(folderDetail);
    await renderPage();

    await waitFor(() => expect(screen.getByText('AddPropsToFolderSheet')).toBeTruthy());
  });

  it('shows an error state and retries the query when the fetch fails', async () => {
    mockGetFolderWithProps.mockRejectedValueOnce(new Error('network error'));
    await renderPage();

    await waitFor(() => expect(screen.getByText('Une erreur inconnue est survenue.')).toBeTruthy());

    mockGetFolderWithProps.mockResolvedValueOnce(folderDetail);
    fireEvent.press(screen.getByText('Réessayer'));

    await waitFor(() => expect(screen.getByText('Graflex')).toBeTruthy());
  });

  it('shows the default empty state when the folder no longer exists', async () => {
    mockGetFolderWithProps.mockResolvedValueOnce(null);
    await renderPage();

    await waitFor(() => expect(screen.getByText('Aucune donnée')).toBeTruthy());
  });

  it('renders the panel preview with the folder props', async () => {
    mockGetFolderWithProps.mockResolvedValueOnce(folderDetail);
    await renderPage();

    await waitFor(() => expect(screen.getByText('Preview:2')).toBeTruthy());
  });

  it('persists the new order when a drag ends', async () => {
    mockGetFolderWithProps.mockResolvedValueOnce(folderDetail);
    await renderPage();
    await waitFor(() => expect(screen.getByText('Graflex')).toBeTruthy());

    const reordered = [folderDetail.props[1], folderDetail.props[0]];
    mockCapturedOnDragEnd?.({ data: reordered });

    await waitFor(() => expect(mockReorderFolderProps).toHaveBeenCalledWith(reordered));
  });
});
