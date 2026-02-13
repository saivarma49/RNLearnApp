import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Topic } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import DifficultyBadge from './DifficultyBadge';

interface Props {
  topic: Topic;
  type: 'rn' | 'js';
  onPress: () => void;
}

const TopicCard: React.FC<Props> = ({ topic, onPress, type }) => {
  const theme = useTheme();
  const isCompleted = useStore((s) => s.isTopicCompleted(topic.id));
  const isBookmarked = useStore((s) => s.isBookmarked(topic.id));
  const accentColor = type === 'rn' ? theme.reactNative : theme.javascript;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {topic.title}
          </Text>
          <View style={styles.indicators}>
            {isBookmarked && <Text style={styles.indicator}>{'\u{1F516}'}</Text>}
            {isCompleted && <Text style={styles.indicator}>{'\u2705'}</Text>}
          </View>
        </View>
        <Text style={[styles.summary, { color: theme.textSecondary }]} numberOfLines={2}>
          {topic.summary}
        </Text>
        <DifficultyBadge difficulty={topic.difficulty} />
      </View>
      <View style={styles.arrowContainer}>
        <Text style={{ color: theme.textSecondary, fontSize: 18 }}>{'\u203A'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  accentBar: {
    width: 5,
  },
  content: {
    padding: 14,
    flex: 1,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
  },
  indicators: {
    flexDirection: 'row',
    gap: 4,
    marginLeft: 8,
  },
  indicator: {
    fontSize: 14,
  },
  summary: {
    fontSize: 13,
    lineHeight: 19,
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingRight: 14,
  },
});

export default React.memo(TopicCard);
