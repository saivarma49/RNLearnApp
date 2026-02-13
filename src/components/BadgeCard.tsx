import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../types';
import { useTheme } from '../hooks/useTheme';

interface Props {
  badge: Badge;
}

const BADGE_ICONS: Record<string, string> = {
  hook: 'anchor',
  ninja: 'star',
  lightning: 'bolt',
  bug: 'bug',
  fire: 'flame',
  trophy: 'trophy',
  star: 'star',
  robot: 'robot',
};

const BADGE_EMOJIS: Record<string, string> = {
  hook: '\u2693',
  ninja: '\u{1F977}',
  lightning: '\u26A1',
  bug: '\u{1F41B}',
  fire: '\u{1F525}',
  trophy: '\u{1F3C6}',
  star: '\u2B50',
  robot: '\u{1F916}',
};

const BadgeCard: React.FC<Props> = ({ badge }) => {
  const theme = useTheme();
  const emoji = BADGE_EMOJIS[badge.icon] || '\u{1F3C5}';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: badge.earned ? theme.card : theme.surface,
          borderColor: badge.earned ? theme.primary : theme.border,
          opacity: badge.earned ? 1 : 0.5,
        },
      ]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
        {badge.title}
      </Text>
      <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
        {badge.description}
      </Text>
      {badge.earned && (
        <View style={[styles.earnedBadge, { backgroundColor: theme.success }]}>
          <Text style={styles.earnedText}>Earned</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    marginRight: 12,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
  earnedBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  earnedText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default BadgeCard;
