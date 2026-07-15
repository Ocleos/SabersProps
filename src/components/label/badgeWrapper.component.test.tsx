import { Star } from 'lucide-react-native';
import { renderWithProviders, screen } from '~src/test/render.utils';
import { Colors, colors } from '~src/theme/colors.theme';
import BadgeWrapper from './badgeWrapper.component';

describe('BadgeWrapper', () => {
  it('renders the label', async () => {
    await renderWithProviders(<BadgeWrapper label='Ready' />);

    expect(screen.getByText('Ready')).toBeTruthy();
  });

  it('renders the given icon alongside the label', async () => {
    await renderWithProviders(<BadgeWrapper icon={Star} label='Ready' />);

    expect(screen.getByText('Ready')).toBeTruthy();
    expect(JSON.stringify(screen.toJSON())).toContain('RNSVGSvgView');
  });

  it('applies the given color scheme classes', async () => {
    await renderWithProviders(<BadgeWrapper colorScheme={colors[Colors.GREEN]} label='Done' />);

    expect(screen.getByText('Done').props.className).toContain(colors[Colors.GREEN].text);
  });
});
