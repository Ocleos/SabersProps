import { Select } from 'heroui-native/select';
import { useForm } from 'react-hook-form';
import { renderWithProviders, screen } from '~src/test/render.utils';
import SelectWrapper from './selectWrapper.component';

type FormValues = { type: string };

const Harness: React.FC<{ initialSelectedValue?: { label: string; value: string } }> = ({ initialSelectedValue }) => {
  const { control } = useForm<FormValues>({ defaultValues: { type: '' } });

  return (
    <SelectWrapper control={control} initialSelectedValue={initialSelectedValue} name='type' placeholder='Type'>
      <Select.Item label='Lightsaber' value='1' />
      <Select.Item label='Prop' value='2' />
    </SelectWrapper>
  );
};

// The dropdown itself opens via a `ref.measure()` callback (native layout API) that the
// `test-renderer` powering RNTL doesn't implement, so the trigger can't actually be opened here —
// same limitation as ActionsMenu's dropdown. Only the closed-state rendering can be exercised.
describe('SelectWrapper', () => {
  it('renders the placeholder as the field label and trigger text', async () => {
    await renderWithProviders(<Harness />);

    expect(screen.getAllByText('Type').length).toBeGreaterThan(0);
  });

  it('renders the initially selected value in the trigger', async () => {
    await renderWithProviders(<Harness initialSelectedValue={{ label: 'Lightsaber', value: '1' }} />);

    expect(screen.getByText('Lightsaber')).toBeTruthy();
  });
});
