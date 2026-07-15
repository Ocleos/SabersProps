import { renderWithProviders, screen } from '~src/test/render.utils';
import type { TodoAccessories } from '../../types/todoAccessories.type';
import TodosOverviewCard from './todosOverviewCard.component';

const data: TodoAccessories[] = [
  { bag: true, displayPlaque: true, id: 'prop-1', keyring: true, name: 'Graflex', prop: true },
  { bag: false, displayPlaque: false, id: 'prop-2', keyring: true, name: 'Anakin', prop: true },
];

describe('TodosOverviewCard', () => {
  it('renders the overall completion percentage', async () => {
    await renderWithProviders(<TodosOverviewCard data={data} />);

    expect(screen.getByText('75 %')).toBeTruthy();
  });

  it('renders the completed/total count for every accessory type', async () => {
    await renderWithProviders(<TodosOverviewCard data={data} />);

    expect(screen.getAllByText('2 / 2 (100 %)')).toHaveLength(2);
    expect(screen.getAllByText('1 / 2 (50 %)')).toHaveLength(2);
  });
});
