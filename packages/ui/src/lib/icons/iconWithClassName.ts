import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
      target: 'style',
    },
  });
}
