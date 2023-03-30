import glyphMap from '@assets/fonts/StarWarsGlyphicons.map.json';
import { createIconSet } from '@expo/vector-icons';

export const StarWarsGlyphicons = require('@assets/fonts/StarWarsGlyphicons.ttf');

export const SabersPropsIcon = createIconSet(glyphMap, 'StarWarsGlyphicons', 'StarWarsGlyphicons.ttf');
