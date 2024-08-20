import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

export const DEFAULT_ICON_SIZE = 24;

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}
