import { Text } from 'react-native';
import { renderWithProviders, screen } from '~src/test/render.utils';
import FlashListWrapper from './flashListWrapper.component';

describe('FlashListWrapper', () => {
  it('renders each item using the given renderItem', async () => {
    await renderWithProviders(
      <FlashListWrapper data={['Graflex', 'Anakin']} renderItem={({ item }) => <Text>{item}</Text>} />,
    );

    expect(screen.getByText('Graflex')).toBeTruthy();
    expect(screen.getByText('Anakin')).toBeTruthy();
  });

  it('renders the empty state when there is no data', async () => {
    await renderWithProviders(<FlashListWrapper data={[]} renderItem={({ item }) => <Text>{item as string}</Text>} />);

    expect(screen.getByText('Aucune donnée')).toBeTruthy();
  });
});
