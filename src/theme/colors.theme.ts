import { Uniwind } from 'uniwind';

export type ColorScheme = {
  bg: string;
  border: string;
  text: string;
};

export enum Colors {
  PRIMARY = 0,
  BLUE = 1,
  GREEN = 2,
  ORANGE = 3,
  RED = 4,
  YELLOW = 5,
}

export const colors: Record<Colors, ColorScheme> = {
  [Colors.PRIMARY]: {
    bg: 'bg-primary-200',
    border: 'border-primary-500',
    text: 'text-primary-600',
  },
  [Colors.BLUE]: {
    bg: 'bg-blue-200',
    border: 'border-blue-500',
    text: 'text-blue-600',
  },
  [Colors.GREEN]: {
    bg: 'bg-green-200',
    border: 'border-green-500',
    text: 'text-green-600',
  },
  [Colors.ORANGE]: {
    bg: 'bg-orange-200',
    border: 'border-orange-500',
    text: 'text-orange-600',
  },
  [Colors.RED]: {
    bg: 'bg-red-200',
    border: 'border-red-500',
    text: 'text-red-600',
  },
  [Colors.YELLOW]: {
    bg: 'bg-yellow-200',
    border: 'border-yellow-500',
    text: 'text-yellow-600',
  },
};

export const getRGBColor = (color: string) => {
  const colorName = color.replace(/^[a-z]+-/, '--color-');

  return Uniwind.getCSSVariable(colorName) as string;
};
