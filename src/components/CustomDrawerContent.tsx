import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import { reactNativeSections } from '../data/reactNativeTopics';
import { javaScriptSections } from '../data/javaScriptTopics';
import ProgressBar from './ProgressBar';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const theme = useTheme();
  const { progress, isDarkMode, toggleTheme, getCurrentLevelXP, getXPForNextLevel } = useStore();

  const totalTopics =
    reactNativeSections.reduce((sum, s) => sum + s.data.length, 0) +
    javaScriptSections.reduce((sum, s) => sum + s.data.length, 0);
  const completedCount = progress.completedTopics.length;
  const completionPercent = totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0;

  const earnedBadges = progress.badges.filter((b) => b.earned);
  const currentLevelXP = getCurrentLevelXP();
  const xpForNext = getXPForNextLevel();
  const levelProgress = xpForNext > 0 ? (currentLevelXP / xpForNext) * 100 : 0;

  const menuItems = [
    {
      icon: '\u{1F3E0}',
      label: 'Home',
      onPress: () => navigation.navigate('DrawerHome'),
    },
    {
      icon: '\u{1F516}',
      label: 'Bookmarks',
      badge: progress.bookmarkedTopics.length > 0 ? `${progress.bookmarkedTopics.length}` : undefined,
      onPress: () => navigation.navigate('Bookmarks'),
    },
    {
      icon: '\u{1F4CA}',
      label: 'Quiz History',
      badge: progress.quizResults.length > 0 ? `${progress.quizResults.length}` : undefined,
      onPress: () => navigation.navigate('QuizHistory'),
    },
    {
      icon: '\u{1F3C5}',
      label: 'Badges',
      badge: `${earnedBadges.length}/${progress.badges.length}`,
      onPress: () => navigation.navigate('BadgesScreen'),
    },
    {
      icon: '\u{1F4BB}',
      label: 'JS Compiler',
      onPress: () => navigation.navigate('JSCompiler'),
    },
    {
      icon: '\u{1F916}',
      label: 'AI Tutor',
      onPress: () => navigation.navigate('AITutor'),
    },
    {
      icon: '\u{1F464}',
      label: 'Profile',
      onPress: () => navigation.navigate('Profile'),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={[styles.userCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.avatarRow}>
            <View style={[styles.avatar, { backgroundColor: theme.primary + '20' }]}>
              <Text style={styles.avatarEmoji}>{'\u{1F9D1}\u200D\u{1F4BB}'}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: theme.text }]}>Learner</Text>
              <Text style={[styles.userLevel, { color: theme.primary }]}>
                Level {progress.level} · {progress.xp} XP
              </Text>
            </View>
            <View style={[styles.streakBadge, { backgroundColor: theme.warning + '20' }]}>
              <Text style={styles.streakIcon}>{'\u{1F525}'}</Text>
              <Text style={[styles.streakText, { color: theme.warning }]}>{progress.streak}</Text>
            </View>
          </View>
          <View style={styles.progressSection}>
            <View style={styles.progressLabelRow}>
              <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>
                Level Progress
              </Text>
              <Text style={[styles.progressValue, { color: theme.primary }]}>
                {Math.round(levelProgress)}%
              </Text>
            </View>
            <ProgressBar progress={levelProgress} height={6} color={theme.primary} />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, { borderColor: theme.border }]}
              onPress={item.onPress}
              activeOpacity={0.7}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
              {item.badge && (
                <View style={[styles.badge, { backgroundColor: theme.primary + '20' }]}>
                  <Text style={[styles.badgeText, { color: theme.primary }]}>{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Separator */}
        <View style={[styles.separator, { backgroundColor: theme.border }]} />

        {/* About */}
        <TouchableOpacity
          style={[styles.menuItem, { borderColor: theme.border }]}
          onPress={() => navigation.navigate('About')}
          activeOpacity={0.7}>
          <Text style={styles.menuIcon}>{'\u2139\uFE0F'}</Text>
          <Text style={[styles.menuLabel, { color: theme.text }]}>About</Text>
        </TouchableOpacity>

        {/* Separator */}
        <View style={[styles.separator, { backgroundColor: theme.border }]} />

        {/* Dark Mode Toggle */}
        <View style={styles.themeRow}>
          <Text style={styles.themeIcon}>{isDarkMode ? '\u{1F31C}' : '\u{1F31E}'}</Text>
          <Text style={[styles.themeLabel, { color: theme.text }]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.border, true: theme.primary + '60' }}
            thumbColor={isDarkMode ? theme.primary : '#f4f3f4'}
          />
        </View>
      </ScrollView>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: theme.textSecondary }]}>
          RN Learning Hub v0.0.1
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  userCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
  },
  userLevel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  streakIcon: {
    fontSize: 14,
    marginRight: 3,
  },
  streakText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressSection: {
    gap: 4,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  progressValue: {
    fontSize: 11,
    fontWeight: '700',
  },
  menuSection: {
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 1,
  },
  menuIcon: {
    fontSize: 20,
    width: 32,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  separator: {
    height: 1,
    marginHorizontal: 24,
    marginVertical: 8,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  themeIcon: {
    fontSize: 20,
    width: 32,
  },
  themeLabel: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  versionContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 11,
  },
});

export default CustomDrawerContent;
