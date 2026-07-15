import { renderWithProviders, screen } from '~src/test/render.utils';
import ActionsMenu from './actionsMenu.component';

jest.mock('expo-router', () => ({
  useRouter: () => ({ navigate: jest.fn() }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  deleteData: jest.fn().mockResolvedValue(undefined),
}));

const defaultProps = {
  idSelected: 'prop-1',
  invalidateQueryKey: ['props'],
  nameSelected: 'Graflex',
  onActionSelected: jest.fn(),
  resetSelected: jest.fn(),
  routeEdit: '/(root)/collection/formProp' as const,
  tableName: 'props',
};

// The dropdown menu itself opens via a `ref.measure()` callback (native layout API), which the
// `test-renderer` powering RNTL doesn't implement, so it never fires under Jest. Only the trigger
// button's rendering can be exercised here; the menu-open/edit/delete flows need an E2E-level test.
describe('ActionsMenu', () => {
  it('renders the actions trigger button', async () => {
    await renderWithProviders(<ActionsMenu {...defaultProps} />);

    expect(screen.getByRole('button')).toBeTruthy();
  });
});
