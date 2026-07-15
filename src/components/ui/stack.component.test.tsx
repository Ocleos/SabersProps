import { Text } from 'react-native';
import { renderWithProviders, screen } from '~src/test/render.utils';
import { HStack, Stack, VStack } from './stack.component';

describe('Stack', () => {
  it('applies the vertical variant by default', async () => {
    await renderWithProviders(
      <Stack testID='stack'>
        <Text>content</Text>
      </Stack>,
    );

    expect(screen.getByTestId('stack').props.className).toContain('flex-col');
  });

  it('applies the horizontal variant when requested', async () => {
    await renderWithProviders(
      <Stack testID='stack' variant='horizontal'>
        <Text>content</Text>
      </Stack>,
    );

    expect(screen.getByTestId('stack').props.className).toContain('flex-row');
  });
});

describe('HStack', () => {
  it('renders as a horizontal stack', async () => {
    await renderWithProviders(
      <HStack testID='hstack'>
        <Text>content</Text>
      </HStack>,
    );

    expect(screen.getByTestId('hstack').props.className).toContain('flex-row');
  });
});

describe('VStack', () => {
  it('renders as a vertical stack', async () => {
    await renderWithProviders(
      <VStack testID='vstack'>
        <Text>content</Text>
      </VStack>,
    );

    expect(screen.getByTestId('vstack').props.className).toContain('flex-col');
  });
});
