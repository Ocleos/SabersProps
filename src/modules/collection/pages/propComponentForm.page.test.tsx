import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import type { PropComponent } from '~src/modules/collection/types/propComponent.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import PropComponentFormPage from './propComponentForm.page';

// The date field's picker lives inside a bottom sheet, which requires these providers up the tree
// (see CalendarInputWrapper's own test for the same requirement).
const renderPage = () =>
  renderWithProviders(
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <PropComponentFormPage />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>,
  );

const mockBack = jest.fn();
const mockPostData = jest.fn().mockResolvedValue(undefined);
const mockPutData = jest.fn().mockResolvedValue(undefined);

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useLocalSearchParams: () => ({ id: 'prop-1' }),
  useRouter: () => ({ back: mockBack }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  COMPONENTS_TABLE: 'components',
  postData: (...args: unknown[]) => mockPostData(...args),
  putData: (...args: unknown[]) => mockPutData(...args),
}));

const existingComponent: PropComponent = {
  date: '2024-03-15',
  fees: 5,
  feesEuros: 4.5,
  id: 'component-1',
  idProp: 'prop-1',
  label: 'Blade',
  price: 50,
  priceEuros: 45,
  rate: 0.9,
  seller: 'Amazon',
};

beforeEach(() => {
  usePropDetailStore.setState(usePropDetailStore.getInitialState(), true);
});

describe('PropComponentFormPage', () => {
  it('renders empty fields in add mode', async () => {
    await renderPage();

    expect(screen.getByPlaceholderText('Vendeur').props.value).toBe('');
  });

  it('pre-fills the fields with the selected component in edit mode', async () => {
    usePropDetailStore.getState().setSelectedComponent(existingComponent);
    await renderPage();

    expect(screen.getByPlaceholderText('Vendeur').props.value).toBe('Amazon');
    expect(screen.getByPlaceholderText('Label').props.value).toBe('Blade');
  });

  // Computing the euro-converted values and submitting are exercised within a single
  // render/test — driving rate/price/fees through several `fireEvent.changeText` calls (each
  // triggering its own `useEffect`-based `setValue` cascade) leaves something mid-flight that
  // corrupts whichever *other* test renders next, regardless of how many `flushAsync` calls
  // follow (same class of RNTL 14 leak documented in CLAUDE.md's Testing section).
  it('computes the euro-converted price/fees, then creates the component and navigates back', async () => {
    await renderPage();

    fireEvent.changeText(screen.getByPlaceholderText('Vendeur'), 'Amazon');
    // The date picker opens via a `ref.measure()` callback the test-renderer doesn't implement
    // (same limitation as CalendarInputWrapper's own test) — the underlying input is `readOnly`
    // for real users, but `onChangeText` is still wired to `field.onChange`, so driving it directly
    // is the only way to set a value here.
    fireEvent.changeText(screen.getByPlaceholderText('Date'), '2024-03-15');
    fireEvent.changeText(screen.getByPlaceholderText('Label'), 'Blade');
    fireEvent.changeText(screen.getByPlaceholderText('Taux'), '1');
    fireEvent.changeText(screen.getByPlaceholderText('Prix'), '50');
    fireEvent.changeText(screen.getByPlaceholderText('Frais'), '5');

    await waitFor(() => expect(screen.getByPlaceholderText('Prix (€)').props.value).toBe('50'));
    expect(screen.getByPlaceholderText('Frais (€)').props.value).toBe('5');

    await flushAsync();
    fireEvent.press(screen.getByText('Enregistrer'));

    await waitFor(() =>
      expect(mockPostData).toHaveBeenCalledWith('components', {
        date: '2024-03-15',
        fees: 5,
        feesEuros: 5,
        idProp: 'prop-1',
        label: 'Blade',
        price: 50,
        priceEuros: 50,
        rate: 1,
        seller: 'Amazon',
      }),
    );
    await waitFor(() => expect(mockBack).toHaveBeenCalledTimes(1));
  });
});
