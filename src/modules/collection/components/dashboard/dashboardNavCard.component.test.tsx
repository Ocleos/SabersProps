import { Package } from 'lucide-react-native';
import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import DashboardNavCard from './dashboardNavCard.component';

describe('DashboardNavCard', () => {
  it('renders the title and description', async () => {
    await renderWithProviders(
      <DashboardNavCard description='Manage your props' icon={Package} onPress={jest.fn()} title='Collection' />,
    );

    expect(screen.getByText('Collection')).toBeTruthy();
    expect(screen.getByText('Manage your props')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await renderWithProviders(
      <DashboardNavCard description='Manage your props' icon={Package} onPress={onPress} title='Collection' />,
    );

    fireEvent.press(screen.getByText('Collection'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
