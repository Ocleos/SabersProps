import { Text } from 'react-native';
import { renderWithProviders, screen } from '~src/test/render.utils';
import PageLayout from './pageLayout.component';

// `Stack.Screen` only registers header options with the enclosing navigator (via `useRoute`), which
// doesn't exist when rendering PageLayout in isolation outside a real router tree.
jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
}));

describe('PageLayout', () => {
  it('renders its children', async () => {
    await renderWithProviders(
      <PageLayout title='Collection'>
        <Text>Page content</Text>
      </PageLayout>,
    );

    expect(screen.getByText('Page content')).toBeTruthy();
  });

  it('renders its children when not scrollable', async () => {
    await renderWithProviders(
      <PageLayout isScrollable={false} title='Collection'>
        <Text>Page content</Text>
      </PageLayout>,
    );

    expect(screen.getByText('Page content')).toBeTruthy();
  });
});
