import { Check, ChevronDown, ChevronRight, ChevronUp, type LucideIcon, X } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

function interopIcon(icon: LucideIcon) {
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

interopIcon(Check);
interopIcon(ChevronDown);
interopIcon(ChevronRight);
interopIcon(ChevronUp);
interopIcon(X);

export { Check, ChevronDown, ChevronRight, ChevronUp, X };
