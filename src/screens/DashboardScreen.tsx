import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import BadgeCard from '../components/BadgeCard';
import { reactNativeSections } from '../data/reactNativeTopics';
import { javaScriptSections } from '../data/javaScriptTopics';

const DashboardScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const drawerNavigation = useNavigation();
  const { progress, updateStreak, getOverallAccuracy, getCurrentLevelXP, getXPForNextLevel } =
    useStore();

  useEffect(() => {
    updateStreak();
  }, []);

  const totalRNTopics = reactNativeSections.reduce((sum, s) => sum + s.data.length, 0);
  const totalJSTopics = javaScriptSections.reduce((sum, s) => sum + s.data.length, 0);
  const totalTopics = totalRNTopics + totalJSTopics;
  const completedCount = progress.completedTopics.length;
  const completionPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  const currentLevelXP = getCurrentLevelXP();
  const xpForNext = getXPForNextLevel();
  const levelProgress = xpForNext > 0 ? (currentLevelXP / xpForNext) * 100 : 0;

  const earnedBadges = progress.badges.filter((b) => b.earned);

  // Get recommended topics
  const allTopics = [
    ...reactNativeSections.flatMap((s) => s.data.map((t) => ({ ...t, type: 'rn' as const }))),
    ...javaScriptSections.flatMap((s) => s.data.map((t) => ({ ...t, type: 'js' as const }))),
  ];
  const incompleteTopics = allTopics.filter(
    (t) => !progress.completedTopics.includes(t.id),
  );
  const suggestedTopics = incompleteTopics.slice(0, 3);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={[styles.hamburger, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => drawerNavigation.dispatch(DrawerActions.openDrawer())}
              activeOpacity={0.7}>
              <Text style={[styles.hamburgerText, { color: theme.text }]}>{'\u2630'}</Text>
            </TouchableOpacity>
            <View>
              <Text style={[styles.greeting, { color: theme.textSecondary }]}>Welcome back</Text>
              <Text style={[styles.title, { color: theme.text }]}>Your Learning Hub</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.streakBadge, { backgroundColor: theme.warning + '20' }]}
            activeOpacity={0.8}>
            <Text style={styles.streakIcon}>{'\u{1F525}'}</Text>
            <Text style={[styles.streakText, { color: theme.warning }]}>
              {progress.streak}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Level Card */}
        <View style={[styles.levelCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.levelHeader}>
            <View>
              <Text style={[styles.levelTitle, { color: theme.text }]}>
                Level {progress.level}
              </Text>
              <Text style={[styles.xpText, { color: theme.textSecondary }]}>
                {progress.xp} XP total
              </Text>
            </View>
            <View style={[styles.levelBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.levelNumber}>{progress.level}</Text>
            </View>
          </View>
          <View style={styles.levelProgressContainer}>
            <ProgressBar progress={levelProgress} height={10} color={theme.primary} />
            <Text style={[styles.xpNeeded, { color: theme.textSecondary }]}>
              {Math.round(currentLevelXP)}/{xpForNext} XP to next level
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsRow}>
          <StatCard
            icon={'\u{1F4DA}'}
            label="Completed"
            value={`${completedCount}/${totalTopics}`}
            color={theme.success}
          />
          <StatCard
            icon={'\u{1F3AF}'}
            label="Accuracy"
            value={`${getOverallAccuracy()}%`}
            color={theme.primary}
          />
          <StatCard
            icon={'\u{1F916}'}
            label="AI Chats"
            value={progress.aiUsageCount}
            color={theme.secondary}
          />
        </View>

        {/* Progress Overview */}
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Learning Progress</Text>
          <View style={styles.progressItem}>
            <View style={styles.progressLabel}>
              <Text style={[styles.progressText, { color: theme.text }]}>React Native</Text>
              <Text style={[styles.progressPercent, { color: theme.reactNative }]}>
                {totalRNTopics > 0
                  ? Math.round(
                      (progress.completedTopics.filter((id) =>
                        reactNativeSections.some((s) => s.data.some((t) => t.id === id)),
                      ).length /
                        totalRNTopics) *
                        100,
                    )
                  : 0}
                %
              </Text>
            </View>
            <ProgressBar
              progress={
                totalRNTopics > 0
                  ? (progress.completedTopics.filter((id) =>
                      reactNativeSections.some((s) => s.data.some((t) => t.id === id)),
                    ).length /
                      totalRNTopics) *
                    100
                  : 0
              }
              height={8}
              color={theme.reactNative}
            />
          </View>
          <View style={styles.progressItem}>
            <View style={styles.progressLabel}>
              <Text style={[styles.progressText, { color: theme.text }]}>JavaScript</Text>
              <Text style={[styles.progressPercent, { color: theme.javascript }]}>
                {totalJSTopics > 0
                  ? Math.round(
                      (progress.completedTopics.filter((id) =>
                        javaScriptSections.some((s) => s.data.some((t) => t.id === id)),
                      ).length /
                        totalJSTopics) *
                        100,
                    )
                  : 0}
                %
              </Text>
            </View>
            <ProgressBar
              progress={
                totalJSTopics > 0
                  ? (progress.completedTopics.filter((id) =>
                      javaScriptSections.some((s) => s.data.some((t) => t.id === id)),
                    ).length /
                      totalJSTopics) *
                    100
                  : 0
              }
              height={8}
              color={theme.javascript}
            />
          </View>
        </View>

        {/* Suggested Topics */}
        {suggestedTopics.length > 0 && (
          <View style={styles.suggestedSection}>
            <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 12 }]}>
              Suggested Next
            </Text>
            {suggestedTopics.map((topic) => (
              <TouchableOpacity
                key={topic.id}
                style={[styles.suggestedCard, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() =>
                  navigation.navigate('TopicDetail', { topic, type: topic.type })
                }
                activeOpacity={0.7}>
                <View
                  style={[
                    styles.suggestedAccent,
                    {
                      backgroundColor:
                        topic.type === 'rn' ? theme.reactNative : theme.javascript,
                    },
                  ]}
                />
                <View style={styles.suggestedContent}>
                  <Text style={[styles.suggestedTitle, { color: theme.text }]}>
                    {topic.title}
                  </Text>
                  <Text style={[styles.suggestedSummary, { color: theme.textSecondary }]} numberOfLines={1}>
                    {topic.summary}
                  </Text>
                </View>
                <Text style={{ color: theme.textSecondary }}>{'\u203A'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Badges */}
        <View style={styles.badgeSection}>
          <View style={styles.badgeHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Badges</Text>
            <Text style={[styles.badgeCount, { color: theme.textSecondary }]}>
              {earnedBadges.length}/{progress.badges.length}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hamburger: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerText: {
    fontSize: 20,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  xpText: {
    fontSize: 13,
    marginTop: 2,
  },
  levelBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelProgressContainer: {
    gap: 6,
  },
  xpNeeded: {
    fontSize: 12,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  section: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  progressItem: {
    marginBottom: 14,
  },
  progressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '700',
  },
  suggestedSection: {
    marginBottom: 16,
  },
  suggestedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 8,
  },
  suggestedAccent: {
    width: 4,
    alignSelf: 'stretch',
  },
  suggestedContent: {
    flex: 1,
    padding: 14,
  },
  suggestedTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  suggestedSummary: {
    fontSize: 12,
    marginTop: 2,
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
    fontSize: 14,
    fontWeight: '600',
  },
  badgeList: {
    paddingRight: 16,
  },
});

export default DashboardScreen;
