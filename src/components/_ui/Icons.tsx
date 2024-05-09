import {
  AlertOctagon,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Info,
  type LucideIcon,
  X,
} from 'lucide-react-native';
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

interopIcon(AlertOctagon);
interopIcon(Check);
interopIcon(ChevronDown);
interopIcon(ChevronRight);
interopIcon(ChevronUp);
interopIcon(Info);
interopIcon(X);

export { AlertOctagon, Check, ChevronDown, ChevronRight, ChevronUp, Info, X };
