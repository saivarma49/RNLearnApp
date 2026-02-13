import React, { useState, useMemo } from 'react';
import { View, SectionList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopicCard from '../components/TopicCard';
import SearchBar from '../components/SearchBar';
import { reactNativeSections } from '../data/reactNativeTopics';
import { javaScriptSections } from '../data/javaScriptTopics';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import { TopicSection } from '../types';

const TopicListScreen = ({ route, navigation }: any) => {
  const { type } = route.params;
  const theme = useTheme();
  const toggleTheme = useStore((s) => s.toggleTheme);
  const isDarkMode = useStore((s) => s.isDarkMode);
  const completedTopics = useStore((s) => s.progress.completedTopics);
  const [searchQuery, setSearchQuery] = useState('');

  const rawSections: TopicSection[] = type === 'rn' ? reactNativeSections : javaScriptSections;

  const sections = useMemo(() => {
    if (!searchQuery) return rawSections;
    return rawSections
      .map((section) => ({
        ...section,
        data: section.data.filter(
          (topic) =>
            topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.summary.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [searchQuery, rawSections]);

  const totalTopics = rawSections.reduce((sum, s) => sum + s.data.length, 0);
  const completedInCategory = rawSections
    .flatMap((s) => s.data)
    .filter((t) => completedTopics.includes(t.id)).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {type === 'rn' ? 'React Native' : 'JavaScript'}
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {completedInCategory}/{totalTopics} topics completed
          </Text>
        </View>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Text style={{ fontSize: 22 }}>{isDarkMode ? '\u2600\uFE0F' : '\u{1F319}'}</Text>
        </TouchableOpacity>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={`Search ${type === 'rn' ? 'React Native' : 'JavaScript'} topics...`}
      />

      <SectionList
        sections={sections}
        renderItem={({ item }) => (
          <TopicCard
            topic={item}
            type={type}
            onPress={() => navigation.navigate('TopicDetail', { topic: item, type })}
          />
        )}
        renderSectionHeader={({ section: { title, category } }) => (
          <View style={[styles.sectionHeader, { backgroundColor: theme.background }]}>
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>{title}</Text>
            <Text style={[styles.sectionCount, { color: theme.textSecondary }]}>
              {sections.find((s) => s.title === title)?.data.length || 0} topics
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>{'\u{1F50D}'}</Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No topics found for "{searchQuery}"
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  themeToggle: {
    padding: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
  },
});

export default TopicListScreen;
