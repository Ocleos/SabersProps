import type { Prop } from '~src/modules/collection/types/prop.type';
import { PropColumnPlacement } from '~src/modules/collection/types/propColumnPlacement.type';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import FolderPanelPreview from './folderPanelPreview.component';

const makeProp = (id: string, order: number, columnPlacement: PropColumnPlacement): Prop => ({
  columnPlacement,
  id,
  manufacturer: 'KRSabers',
  name: id,
  order,
  state: 1,
  type: 1,
});

describe('FolderPanelPreview', () => {
  it('renders the accordion title and hides the props until expanded', async () => {
    const props = [makeProp('Graflex', 0, PropColumnPlacement.LEFT)];
    await renderWithProviders(<FolderPanelPreview props={props} />);

    expect(screen.getByText('Rendu')).toBeTruthy();
    expect(screen.queryByText('Graflex')).toBeNull();
  });

  it('reveals paired left/right props on the same row once expanded', async () => {
    const props = [makeProp('Graflex', 0, PropColumnPlacement.LEFT), makeProp('Kylo', 1, PropColumnPlacement.RIGHT)];
    await renderWithProviders(<FolderPanelPreview props={props} />);

    fireEvent.press(screen.getByText('Rendu'));

    await waitFor(() => expect(screen.getByText('Graflex')).toBeTruthy());
    expect(screen.getByText('Kylo')).toBeTruthy();
  });

  it('reveals a middle prop and a trailing unpaired left once expanded', async () => {
    const props = [makeProp('Graflex', 0, PropColumnPlacement.MIDDLE), makeProp('Kylo', 1, PropColumnPlacement.LEFT)];
    await renderWithProviders(<FolderPanelPreview props={props} />);

    fireEvent.press(screen.getByText('Rendu'));

    await waitFor(() => expect(screen.getByText('Graflex')).toBeTruthy());
    expect(screen.getByText('Kylo')).toBeTruthy();
  });

  it('expands to an empty content section when the folder has no props', async () => {
    await renderWithProviders(<FolderPanelPreview props={[]} />);

    fireEvent.press(screen.getByText('Rendu'));

    await waitFor(() => expect(screen.queryByText('Rendu')).toBeTruthy());
  });
});
