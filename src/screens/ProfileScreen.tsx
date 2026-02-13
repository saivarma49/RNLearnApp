import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import BadgeCard from '../components/BadgeCard';
import { reactNativeSections } from '../data/reactNativeTopics';
import { javaScriptSections } from '../data/javaScriptTopics';

const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const {
    progress,
    isDarkMode,
    toggleTheme,
    getOverallAccuracy,
    getTotalQuizzesTaken,
    getWeakTopics,
    apiKey,
    setApiKey,
  } = useStore();

  const [keyInput, setKeyInput] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  // Sync input when apiKey loads from storage/default
  useEffect(() => {
    if (apiKey && !keyInput) {
      setKeyInput(apiKey);
    }
  }, [apiKey]);

  const handleSaveApiKey = async () => {
    const trimmed = keyInput.trim();
    if (!trimmed) {
      Alert.alert('Error', 'Please enter a valid API key.');
      return;
    }
    if (!trimmed.startsWith('sk-')) {
      Alert.alert('Invalid Key', 'OpenAI API keys start with "sk-". Please check your key.');
      return;
    }
    await setApiKey(trimmed);
    Alert.alert('Saved', 'API key saved successfully. AI Tutor is ready to use!');
  };

  const handleClearApiKey = () => {
    Alert.alert('Clear API Key', 'Are you sure you want to remove your API key?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          setKeyInput('');
          await setApiKey('');
        },
      },
    ]);
  };

  const totalRNTopics = reactNativeSections.reduce((sum, s) => sum + s.data.length, 0);
  const totalJSTopics = javaScriptSections.reduce((sum, s) => sum + s.data.length, 0);
  const totalTopics = totalRNTopics + totalJSTopics;
  const completedCount = progress.completedTopics.length;

  const rnCompleted = progress.completedTopics.filter((id) =>
    reactNativeSections.some((s) => s.data.some((t) => t.id === id)),
  ).length;
  const jsCompleted = progress.completedTopics.filter((id) =>
    javaScriptSections.some((s) => s.data.some((t) => t.id === id)),
  ).length;

  const weakTopics = getWeakTopics();
  const quizzesTaken = getTotalQuizzesTaken();
  const overallAccuracy = getOverallAccuracy();

  // Recent quiz performance (last 5)
  const recentQuizzes = progress.quizResults.slice(-5).reverse();

  const earnedBadges = progress.badges.filter((b) => b.earned);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <Text style={styles.avatarText}>
              {'\u{1F393}'}
            </Text>
          </View>
          <Text style={[styles.name, { color: theme.text }]}>Learner</Text>
          <Text style={[styles.level, { color: theme.primary }]}>
            Level {progress.level} \u2022 {progress.xp} XP
          </Text>
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={toggleTheme}>
            <Text style={styles.themeIcon}>
              {isDarkMode ? '\u2600\uFE0F' : '\u{1F319}'}
            </Text>
            <Text style={[styles.themeText, { color: theme.text }]}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* API Key Settings */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>AI Settings</Text>
        <View style={[styles.apiKeyCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.apiKeyHeader}>
            <Text style={[styles.apiKeyLabel, { color: theme.text }]}>OpenAI API Key</Text>
            <View style={[
              styles.apiKeyStatus,
              { backgroundColor: apiKey ? theme.success + '20' : theme.error + '20' },
            ]}>
              <Text style={{ color: apiKey ? theme.success : theme.error, fontSize: 12, fontWeight: '600' }}>
                {apiKey ? 'Connected' : 'Not Set'}
              </Text>
            </View>
          </View>
          <View style={styles.apiKeyInputRow}>
            <TextInput
              style={[styles.apiKeyInput, {
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
              }]}
              value={keyInput}
              onChangeText={setKeyInput}
              placeholder="sk-proj-..."
              placeholderTextColor={theme.textSecondary}
              secureTextEntry={!showKey}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={[styles.eyeButton, { backgroundColor: theme.surface }]}
              onPress={() => setShowKey(!showKey)}>
              <Text style={{ fontSize: 16 }}>{showKey ? '\u{1F441}\uFE0F' : '\u{1F512}'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.apiKeyActions}>
            <TouchableOpacity
              style={[styles.saveKeyButton, { backgroundColor: theme.primary }]}
              onPress={handleSaveApiKey}>
              <Text style={styles.saveKeyText}>Save Key</Text>
            </TouchableOpacity>
            {apiKey ? (
              <TouchableOpacity
                style={[styles.clearKeyButton, { borderColor: theme.error }]}
                onPress={handleClearApiKey}>
                <Text style={[styles.clearKeyText, { color: theme.error }]}>Clear</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <Text style={[styles.apiKeyHint, { color: theme.textSecondary }]}>
            Get your key from platform.openai.com/api-keys
          </Text>
        </View>

        {/* Stats Overview */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <StatCard
              icon={'\u{1F525}'}
              label="Streak"
              value={`${progress.streak}d`}
              color={theme.warning}
            />
            <StatCard
              icon={'\u{1F4DA}'}
              label="Topics"
              value={`${completedCount}/${totalTopics}`}
              color={theme.success}
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard
              icon={'\u{1F4DD}'}
              label="Quizzes"
              value={quizzesTaken}
              color={theme.primary}
            />
            <StatCard
              icon={'\u{1F3AF}'}
              label="Accuracy"
              value={`${overallAccuracy}%`}
              color={theme.secondary}
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard
              icon={'\u{1F916}'}
              label="AI Chats"
              value={progress.aiUsageCount}
              color={theme.accent}
            />
            <StatCard
              icon={'\u{1F516}'}
              label="Bookmarks"
              value={progress.bookmarkedTopics.length}
              color={theme.javascript}
            />
          </View>
        </View>

        {/* Progress Breakdown */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Progress Breakdown</Text>
        <View style={[styles.progressCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.progressRow}>
            <View style={styles.progressInfo}>
              <Text style={[styles.progressLabel, { color: theme.text }]}>React Native</Text>
              <Text style={[styles.progressCount, { color: theme.textSecondary }]}>
                {rnCompleted}/{totalRNTopics}
              </Text>
            </View>
            <ProgressBar
              progress={totalRNTopics > 0 ? (rnCompleted / totalRNTopics) * 100 : 0}
              height={10}
              color={theme.reactNative}
            />
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.progressRow}>
            <View style={styles.progressInfo}>
              <Text style={[styles.progressLabel, { color: theme.text }]}>JavaScript</Text>
              <Text style={[styles.progressCount, { color: theme.textSecondary }]}>
                {jsCompleted}/{totalJSTopics}
              </Text>
            </View>
            <ProgressBar
              progress={totalJSTopics > 0 ? (jsCompleted / totalJSTopics) * 100 : 0}
              height={10}
              color={theme.javascript}
            />
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <View style={styles.progressRow}>
            <View style={styles.progressInfo}>
              <Text style={[styles.progressLabel, { color: theme.text }]}>Overall</Text>
              <Text style={[styles.progressCount, { color: theme.textSecondary }]}>
                {completedCount}/{totalTopics}
              </Text>
            </View>
            <ProgressBar
              progress={totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0}
              height={10}
              color={theme.primary}
            />
          </View>
        </View>

        {/* Recent Quiz Performance */}
        {recentQuizzes.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Quizzes</Text>
            <View style={[styles.quizHistoryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              {recentQuizzes.map((quiz, index) => (
                <View key={quiz.id}>
                  <View style={styles.quizRow}>
                    <View style={styles.quizInfo}>
                      <Text style={[styles.quizTopic, { color: theme.text }]}>{quiz.topicId}</Text>
                      <Text style={[styles.quizDate, { color: theme.textSecondary }]}>
                        {new Date(quiz.timestamp).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.quizScore}>
                      <Text
                        style={[
                          styles.quizAccuracy,
                          { color: quiz.accuracy >= 70 ? theme.success : theme.error },
                        ]}>
                        {quiz.accuracy}%
                      </Text>
                      <Text style={[styles.quizScoreDetail, { color: theme.textSecondary }]}>
                        {quiz.score}/{quiz.totalQuestions}
                      </Text>
                    </View>
                  </View>
                  {index < recentQuizzes.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                  )}
                </View>
              ))}
            </View>
          </>
        )}

        {/* Weak Topics */}
        {weakTopics.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Needs Improvement</Text>
            <View style={[styles.weakCard, { backgroundColor: theme.error + '10', borderColor: theme.error + '30' }]}>
              {weakTopics.map((topic) => (
                <View key={topic} style={styles.weakItem}>
                  <Text style={styles.weakIcon}>{'\u26A0\uFE0F'}</Text>
                  <Text style={[styles.weakText, { color: theme.text }]}>{topic}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Badges */}
        <View style={styles.badgeSection}>
          <View style={styles.badgeHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 0 }]}>
              Badges
            </Text>
            <Text style={[styles.badgeCount, { color: theme.textSecondary }]}>
              {earnedBadges.length}/{progress.badges.length} earned
            </Text>
          </View>
          <FlatList
            horizontal
            data={progress.badges}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BadgeCard badge={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgeList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  level: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 16,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  themeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  themeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  statsGrid: {
    gap: 8,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  progressCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  progressRow: {
    gap: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  progressCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  quizHistoryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  quizRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizInfo: {
    flex: 1,
  },
  quizTopic: {
    fontSize: 15,
    fontWeight: '600',
  },
  quizDate: {
    fontSize: 12,
    marginTop: 2,
  },
  quizScore: {
    alignItems: 'flex-end',
  },
  quizAccuracy: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizScoreDetail: {
    fontSize: 12,
    marginTop: 2,
  },
  weakCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  weakItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  weakIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  weakText: {
    fontSize: 14,
    fontWeight: '500',
  },
  badgeSection: {
    marginBottom: 16,
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeCount: {
    fontSize: 13,
    fontWeight: '600',
  },
  badgeList: {
    paddingRight: 16,
  },
  apiKeyCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  apiKeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  apiKeyLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  apiKeyStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  apiKeyInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  apiKeyInput: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    borderWidth: 1,
  },
  eyeButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiKeyActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  saveKeyButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveKeyText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  clearKeyButton: {
    paddingHorizontal: 20,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearKeyText: {
    fontSize: 15,
    fontWeight: '600',
  },
  apiKeyHint: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default ProfileScreen;
