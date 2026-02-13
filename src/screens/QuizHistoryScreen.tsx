import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import { reactNativeSections } from '../data/reactNativeTopics';
import { javaScriptSections } from '../data/javaScriptTopics';
import ProgressBar from '../components/ProgressBar';
import { QuizResult } from '../types';

const allTopics = [
  ...reactNativeSections.flatMap((s) => s.data),
  ...javaScriptSections.flatMap((s) => s.data),
];

const getTopicName = (topicId: string): string => {
  const topic = allTopics.find((t) => t.id === topicId);
  return topic?.title || topicId;
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const QuizHistoryScreen = () => {
  const theme = useTheme();
  const { progress, getOverallAccuracy } = useStore();

  const sortedResults = useMemo(
    () => [...progress.quizResults].sort((a, b) => b.timestamp - a.timestamp),
    [progress.quizResults],
  );

  const totalQuizzes = progress.quizResults.length;
  const overallAccuracy = getOverallAccuracy();

  if (totalQuizzes === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.background }]}>
        <Text style={styles.emptyIcon}>{'\u{1F4CA}'}</Text>
        <Text style={[styles.emptyTitle, { color: theme.text }]}>No Quizzes Taken</Text>
        <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
          Take quizzes on topics to track your performance here.
        </Text>
      </View>
    );
  }

  const renderQuizCard = ({ item }: { item: QuizResult }) => {
    const accuracyColor =
      item.accuracy >= 80 ? theme.success : item.accuracy >= 50 ? theme.warning : theme.error;

    return (
      <View style={[styles.quizCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.quizHeader}>
          <Text style={[styles.quizTopic, { color: theme.text }]} numberOfLines={1}>
            {getTopicName(item.topicId)}
          </Text>
          <Text style={[styles.quizDate, { color: theme.textSecondary }]}>
            {formatDate(item.timestamp)}
          </Text>
        </View>
        <View style={styles.quizStats}>
          <View style={styles.scoreBadge}>
            <Text style={[styles.scoreValue, { color: accuracyColor }]}>
              {item.score}/{item.totalQuestions}
            </Text>
            <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>Score</Text>
          </View>
          <View style={styles.accuracySection}>
            <Text style={[styles.accuracyValue, { color: accuracyColor }]}>
              {Math.round(item.accuracy)}%
            </Text>
            <ProgressBar progress={item.accuracy} height={6} color={accuracyColor} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={sortedResults}
        keyExtractor={(item) => item.id}
        renderItem={renderQuizCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={[styles.summaryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: theme.primary }]}>{totalQuizzes}</Text>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Total Quizzes</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: theme.border }]} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: theme.primary }]}>{overallAccuracy}%</Text>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Overall Accuracy</Text>
            </View>
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
  summaryCard: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    marginHorizontal: 8,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  quizCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quizTopic: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  quizDate: {
    fontSize: 12,
  },
  quizStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreBadge: {
    alignItems: 'center',
    marginRight: 16,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  accuracySection: {
    flex: 1,
    gap: 4,
  },
  accuracyValue: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default QuizHistoryScreen;
