import { Package } from 'lucide-react-native';
import { renderWithProviders, screen } from '~src/test/render.utils';
import StatTile from './statTile.component';

describe('StatTile', () => {
  it('renders the value and label', async () => {
    await renderWithProviders(<StatTile icon={Package} label='Props' value={12} />);

    expect(screen.getByText('12')).toBeTruthy();
    expect(screen.getByText('Props')).toBeTruthy();
  });

  it('defaults the value to 0 when not provided', async () => {
    await renderWithProviders(<StatTile icon={Package} label='Props' />);

    expect(screen.getByText('0')).toBeTruthy();
  });

  it('renders a skeleton instead of the value while loading', async () => {
    await renderWithProviders(<StatTile icon={Package} isLoading label='Props' value={12} />);

    expect(screen.queryByText('12')).toBeNull();
  });
});
