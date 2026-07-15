import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';
import type { Prop } from '~src/modules/collection/types/prop.type';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import PropListPage from './propList.page';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useIsFocused: () => true,
  useRouter: () => ({ push: mockPush }),
}));

const props: Prop[] = [
  { id: 'prop-1', manufacturer: 'KRSabers', name: 'Graflex', state: 1, type: 1 },
  { id: 'prop-2', manufacturer: 'KRSabers', name: 'Anakin', state: 6, type: 1 },
];

const mockGetData = jest.fn().mockResolvedValue(props);

jest.mock('~src/utils/supabase.utils', () => ({
  deleteData: jest.fn(),
  getData: (...args: unknown[]) => mockGetData(...args),
  PROPS_TABLE: 'props',
}));

// The filters bottom sheet (`PropFilters`) only mounts once `.present()` is called imperatively
// via ref — same limitation as BottomSheetWrapper's own test — so it's out of scope here.
const renderPage = () =>
  renderWithProviders(
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <PropListPage />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>,
  );

beforeEach(() => {
  useCollectionStore.setState(useCollectionStore.getInitialState(), true);
});

describe('PropListPage', () => {
  it('renders every prop once loaded', async () => {
    await renderPage();

    await waitFor(() => expect(screen.getByText('Graflex')).toBeTruthy());
    expect(screen.getByText('Anakin')).toBeTruthy();
  });

  it('filters the props as the user searches', async () => {
    await renderPage();
    await waitFor(() => expect(screen.getByText('Graflex')).toBeTruthy());

    fireEvent.changeText(screen.getByPlaceholderText('Rechercher'), 'Graflex');

    await waitFor(() => expect(screen.queryByText('Anakin')).toBeNull());
    expect(screen.getByText('Graflex')).toBeTruthy();
  });

  it('clears the selected prop and navigates to the form when the FAB is pressed', async () => {
    useCollectionStore.getState().setSelectedProp(props[0]);
    await renderPage();
    await waitFor(() => expect(mockGetData).toHaveBeenCalled());

    // Each prop card also renders an ActionsMenu trigger button — the FAB is the last button in
    // the tree.
    const buttons = screen.getAllByRole('button');
    fireEvent.press(buttons[buttons.length - 1]);

    expect(useCollectionStore.getState().selectedProp).toBeUndefined();
    expect(mockPush).toHaveBeenCalledWith('/(root)/collection/formProp');
  });
});
