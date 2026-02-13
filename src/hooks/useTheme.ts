import { useStore } from '../store/useStore';
import { LightColors, DarkColors } from '../theme/Colors';
import { ThemeColors } from '../types';

export function useTheme(): ThemeColors {
  const isDarkMode = useStore((s) => s.isDarkMode);
  return isDarkMode ? DarkColors : LightColors;
}
