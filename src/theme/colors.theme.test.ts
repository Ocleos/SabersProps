jest.mock('uniwind', () => ({
  Uniwind: {
    getCSSVariable: jest.fn((name: string) => `mocked(${name})`),
  },
}));

import { Uniwind } from 'uniwind';
import { getRGBColor } from './colors.theme';

describe('getRGBColor', () => {
  it('converts a tailwind color utility into a CSS variable name', () => {
    const result = getRGBColor('bg-primary-200');

    expect(Uniwind.getCSSVariable).toHaveBeenCalledWith('--color-primary-200');
    expect(result).toBe('mocked(--color-primary-200)');
  });

  it('replaces only the leading utility prefix, keeping the rest of the name intact', () => {
    getRGBColor('border-blue-500');

    expect(Uniwind.getCSSVariable).toHaveBeenCalledWith('--color-blue-500');
  });

  it('leaves the name untouched when there is no utility prefix to replace', () => {
    getRGBColor('primary');

    expect(Uniwind.getCSSVariable).toHaveBeenCalledWith('primary');
  });
});
