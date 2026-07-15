import { Star } from 'lucide-react-native';
import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import Toggle from './toggle.component';

describe('Toggle', () => {
  it('toggles from the given initial state on press', async () => {
    const onPressedChange = jest.fn();
    await renderWithProviders(<Toggle icon={Star} isPressed={false} onPressedChange={onPressedChange} />);

    fireEvent.press(screen.getByRole('button'));

    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('toggles back off on a second press', async () => {
    const onPressedChange = jest.fn();
    await renderWithProviders(<Toggle icon={Star} isPressed={true} onPressedChange={onPressedChange} />);

    fireEvent.press(screen.getByRole('button'));

    expect(onPressedChange).toHaveBeenCalledWith(false);
  });
});
