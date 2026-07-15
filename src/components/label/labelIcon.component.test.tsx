import { Star } from 'lucide-react-native';
import { renderWithProviders, screen } from '~src/test/render.utils';
import LabelIcon from './labelIcon.component';

describe('LabelIcon', () => {
  it('renders the label text and the given icon', async () => {
    await renderWithProviders(<LabelIcon icon={Star} label='Manufacturer' />);

    expect(screen.getByText('Manufacturer')).toBeTruthy();
    expect(JSON.stringify(screen.toJSON())).toContain('RNSVGSvgView');
  });
});
