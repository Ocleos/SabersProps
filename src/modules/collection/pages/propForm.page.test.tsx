import { useCollectionStore } from '~src/modules/collection/stores/collection.store';
import type { Prop } from '~src/modules/collection/types/prop.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import PropFormPage from './propForm.page';

const mockBack = jest.fn();
const mockPostData = jest.fn().mockResolvedValue(undefined);
const mockPutData = jest.fn().mockResolvedValue(undefined);

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useRouter: () => ({ back: mockBack }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  PROPS_TABLE: 'props',
  postData: (...args: unknown[]) => mockPostData(...args),
  putData: (...args: unknown[]) => mockPutData(...args),
}));

const existingProp: Prop = {
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 1,
  type: 1,
};

beforeEach(() => {
  useCollectionStore.setState(useCollectionStore.getInitialState(), true);
});

describe('PropFormPage', () => {
  it('renders empty fields in add mode', async () => {
    await renderWithProviders(<PropFormPage />);

    expect(screen.getByPlaceholderText('Nom').props.value).toBe('');
  });

  it('pre-fills the fields with the selected prop in edit mode', async () => {
    useCollectionStore.getState().setSelectedProp(existingProp);
    await renderWithProviders(<PropFormPage />);

    expect(screen.getByPlaceholderText('Nom').props.value).toBe('Graflex');
    expect(screen.getByPlaceholderText('Créateur').props.value).toBe('KRSabers');
  });

  it('creates a new prop with the default type/state and navigates back on save', async () => {
    await renderWithProviders(<PropFormPage />);

    fireEvent.changeText(screen.getByPlaceholderText('Nom'), 'New saber');
    fireEvent.changeText(screen.getByPlaceholderText('Créateur'), 'KRSabers');
    await flushAsync();
    fireEvent.press(screen.getByText('Enregistrer'));

    await waitFor(() =>
      expect(mockPostData).toHaveBeenCalledWith('props', {
        character: '',
        chassisDesigner: '',
        manufacturer: 'KRSabers',
        name: 'New saber',
        soundboard: '',
        state: 1,
        type: 1,
      }),
    );
    await waitFor(() => expect(mockBack).toHaveBeenCalledTimes(1));
  });
});
