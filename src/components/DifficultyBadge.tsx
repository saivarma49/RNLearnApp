import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Difficulty } from '../types';
import { useTheme } from '../hooks/useTheme';

interface Props {
  difficulty: Difficulty;
}

const COLORS: Record<Difficulty, { bg: string; text: string }> = {
  Beginner: { bg: '#E8F5E9', text: '#2E7D32' },
  Intermediate: { bg: '#FFF3E0', text: '#E65100' },
  Advanced: { bg: '#FFEBEE', text: '#C62828' },
};

const DifficultyBadge: React.FC<Props> = ({ difficulty }) => {
  const colors = COLORS[difficulty];

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{difficulty}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default DifficultyBadge;
