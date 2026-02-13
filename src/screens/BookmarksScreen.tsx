import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import { reactNativeSections } from '../data/reactNativeTopics';
import { javaScriptSections } from '../data/javaScriptTopics';
import TopicCard from '../components/TopicCard';
import { Topic } from '../types';

interface BookmarkedTopic {
  topic: Topic;
  type: 'rn' | 'js';
}

const BookmarksScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { progress } = useStore();

  const bookmarkedTopics = useMemo(() => {
    const result: BookmarkedTopic[] = [];
    const bookmarkSet = new Set(progress.bookmarkedTopics);

    for (const section of reactNativeSections) {
      for (const topic of section.data) {
        if (bookmarkSet.has(topic.id)) {
          result.push({ topic, type: 'rn' });
        }
      }
    }
    for (const section of javaScriptSections) {
      for (const topic of section.data) {
        if (bookmarkSet.has(topic.id)) {
          result.push({ topic, type: 'js' });
        }
      }
    }
    return result;
  }, [progress.bookmarkedTopics]);

  if (bookmarkedTopics.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.background }]}>
        <Text style={styles.emptyIcon}>{'\u{1F516}'}</Text>
        <Text style={[styles.emptyTitle, { color: theme.text }]}>No Bookmarks Yet</Text>
        <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
          Bookmark topics while learning to access them quickly here.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={bookmarkedTopics}
        keyExtractor={(item) => item.topic.id}
        renderItem={({ item }) => (
          <TopicCard
            topic={item.topic}
            type={item.type}
            onPress={() =>
              navigation.navigate('DrawerHome', {
                screen: 'TopicDetail',
                params: { topic: item.topic, type: item.type },
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 12,
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

export default BookmarksScreen;
