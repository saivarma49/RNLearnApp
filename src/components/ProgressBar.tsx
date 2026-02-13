import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Props {
  progress: number; // 0-100
  height?: number;
  showLabel?: boolean;
  color?: string;
}

const ProgressBar: React.FC<Props> = ({ progress, height = 8, showLabel = false, color }) => {
  const theme = useTheme();
  const barColor = color || theme.primary;
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={styles.container}>
      {showLabel && (
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          {Math.round(clampedProgress)}%
        </Text>
      )}
      <View style={[styles.track, { height, backgroundColor: theme.border }]}>
        <View
          style={[
            styles.fill,
            {
              height,
              width: `${clampedProgress}%`,
              backgroundColor: barColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'right',
  },
  track: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 100,
  },
});

export default ProgressBar;
