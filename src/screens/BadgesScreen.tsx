import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import { Badge } from '../types';

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

const formatDate = (timestamp?: number): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const BadgesScreen = () => {
  const theme = useTheme();
  const { progress } = useStore();

  const earnedCount = progress.badges.filter((b) => b.earned).length;

  const renderBadge = ({ item }: { item: Badge }) => {
    const emoji = BADGE_EMOJIS[item.icon] || '\u{1F3C5}';

    return (
      <View
        style={[
          styles.badgeCard,
          {
            backgroundColor: item.earned ? theme.card : theme.surface,
            borderColor: item.earned ? theme.primary : theme.border,
            opacity: item.earned ? 1 : 0.55,
          },
        ]}>
        <Text style={styles.badgeEmoji}>{emoji}</Text>
        <View style={styles.badgeInfo}>
          <Text style={[styles.badgeTitle, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.badgeDescription, { color: theme.textSecondary }]}>
            {item.description}
          </Text>
          {item.earned ? (
            <View style={[styles.earnedTag, { backgroundColor: theme.success + '20' }]}>
              <Text style={[styles.earnedText, { color: theme.success }]}>
                Earned {formatDate(item.earnedAt)}
              </Text>
            </View>
          ) : (
            <Text style={[styles.requirementText, { color: theme.textSecondary }]}>
              {item.requirement}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={progress.badges}
        keyExtractor={(item) => item.id}
        renderItem={renderBadge}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={[styles.headerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={styles.headerEmoji}>{'\u{1F3C6}'}</Text>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              {earnedCount} of {progress.badges.length} Earned
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
              Keep learning to unlock more badges!
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
  },
  badgeCard: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  badgeEmoji: {
    fontSize: 36,
    marginRight: 14,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  badgeDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  earnedTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  earnedText: {
    fontSize: 11,
    fontWeight: '700',
  },
  requirementText: {
    fontSize: 11,
    fontStyle: 'italic',
  },
});

export default BadgesScreen;
