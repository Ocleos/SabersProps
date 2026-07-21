import { useFoldersStore } from '~src/modules/collection/stores/folders.store';
import type { Folder } from '~src/modules/collection/types/folder.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import FolderFormPage from './folderForm.page';

const mockBack = jest.fn();
const mockPostData = jest.fn().mockResolvedValue(undefined);
const mockPutData = jest.fn().mockResolvedValue(undefined);

const existingFolders: Folder[] = [
  { id: 'folder-1', name: 'Panel A', order: 0 },
  { id: 'folder-2', name: 'Panel B', order: 1 },
];

const mockGetData = jest.fn().mockResolvedValue(existingFolders);

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useRouter: () => ({ back: mockBack }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  FOLDERS_TABLE: 'folders',
  getData: (...args: unknown[]) => mockGetData(...args),
  postData: (...args: unknown[]) => mockPostData(...args),
  putData: (...args: unknown[]) => mockPutData(...args),
}));

const existingFolder: Folder = {
  id: 'folder-1',
  name: 'Panel A',
  order: 0,
};

beforeEach(() => {
  useFoldersStore.setState(useFoldersStore.getInitialState(), true);
});

describe('FolderFormPage', () => {
  it('renders empty fields in add mode', async () => {
    await renderWithProviders(<FolderFormPage />);

    expect(screen.getByPlaceholderText('Nom').props.value).toBe('');
  });

  it('pre-fills the fields with the selected folder in edit mode', async () => {
    useFoldersStore.getState().setSelectedFolder(existingFolder);
    await renderWithProviders(<FolderFormPage />);

    expect(screen.getByPlaceholderText('Nom').props.value).toBe('Panel A');
  });

  it('creates a new folder appended to the end and navigates back on save', async () => {
    await renderWithProviders(<FolderFormPage />);
    await waitFor(() => expect(mockGetData).toHaveBeenCalled());

    fireEvent.changeText(screen.getByPlaceholderText('Nom'), 'Panel C');
    await flushAsync();
    fireEvent.press(screen.getByText('Enregistrer'));

    await waitFor(() => expect(mockPostData).toHaveBeenCalledWith('folders', { name: 'Panel C', order: 2 }));
    await waitFor(() => expect(mockBack).toHaveBeenCalledTimes(1));
  });
});
