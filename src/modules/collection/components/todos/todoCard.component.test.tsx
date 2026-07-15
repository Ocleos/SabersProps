import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import type { TodoAccessories } from '../../types/todoAccessories.type';
import { TodoType } from '../../types/todoType.type';
import TodoCard from './todoCard.component';

const data: TodoAccessories[] = [
  { bag: true, id: 'prop-1', name: 'Graflex' },
  { bag: false, id: 'prop-2', name: 'Anakin' },
];

describe('TodoCard', () => {
  it('renders the type label with the pending/total count', async () => {
    await renderWithProviders(<TodoCard data={data} type={TodoType.BAG} />);

    expect(screen.getByText('Pochette (1 / 2)')).toBeTruthy();
  });

  it('lists every item once the accordion is opened', async () => {
    await renderWithProviders(<TodoCard data={data} type={TodoType.BAG} />);

    fireEvent.press(screen.getByText('Pochette (1 / 2)'));

    await waitFor(() => expect(screen.getByText('Graflex')).toBeTruthy());
    expect(screen.getByText('Anakin')).toBeTruthy();
  });
});
