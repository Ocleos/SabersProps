import { Text } from 'react-native';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import AccordionWrapper from './accordionWrapper.component';

describe('AccordionWrapper', () => {
  it('renders the title and hides the content when closed by default', async () => {
    await renderWithProviders(
      <AccordionWrapper itemValue='item-1' title='Prices'>
        <Text>Content</Text>
      </AccordionWrapper>,
    );

    expect(screen.getByText('Prices')).toBeTruthy();
    expect(screen.queryByText('Content')).toBeNull();
  });

  it('shows the content when isOpen is true', async () => {
    await renderWithProviders(
      <AccordionWrapper isOpen itemValue='item-1' title='Prices'>
        <Text>Content</Text>
      </AccordionWrapper>,
    );

    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('reveals the content when the trigger is pressed', async () => {
    await renderWithProviders(
      <AccordionWrapper itemValue='item-1' title='Prices'>
        <Text>Content</Text>
      </AccordionWrapper>,
    );

    fireEvent.press(screen.getByText('Prices'));

    await waitFor(() => expect(screen.getByText('Content')).toBeTruthy());
  });
});
