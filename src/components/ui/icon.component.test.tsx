import { Home } from 'lucide-react-native';
import { renderWithProviders, screen } from '~src/test/render.utils';
import { Icon } from './icon.component';

describe('Icon', () => {
  it('renders the given lucide icon as an SVG', async () => {
    await renderWithProviders(<Icon as={Home} />);

    expect(JSON.stringify(screen.toJSON())).toContain('RNSVGSvgView');
  });
});
