import { renderWithProviders, screen } from '~src/test/render.utils';
import TodoItem from './todoItem.component';

describe('TodoItem', () => {
  it('renders the name without a strikethrough when pending', async () => {
    await renderWithProviders(<TodoItem name='Bag' value={false} />);

    expect(screen.getByText('Bag').props.className).not.toContain('line-through');
  });

  it('renders the name with a strikethrough when done', async () => {
    await renderWithProviders(<TodoItem name='Bag' value={true} />);

    expect(screen.getByText('Bag').props.className).toContain('line-through');
  });
});
