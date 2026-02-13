import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import {jsCodeSections, CodeQuestion} from '../data/jsCodeQuestions';
import {useTheme} from '../hooks/useTheme';
import {useStore} from '../store/useStore';

const difficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return '#10B981';
    case 'Medium':
      return '#F59E0B';
    case 'Hard':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};

const CodeQuestionCard = ({
  item,
  onPress,
}: {
  item: CodeQuestion;
  onPress: () => void;
}) => {
  const theme = useTheme();
  const color = difficultyColor(item.difficulty);

  return (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: theme.card, borderColor: theme.border}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={[styles.accentBar, {backgroundColor: theme.javascript}]} />
      <View style={styles.content}>
        <Text style={[styles.title, {color: theme.text}]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text
          style={[styles.problemPreview, {color: theme.textSecondary}]}
          numberOfLines={2}>
          {item.problem}
        </Text>
        <View style={[styles.difficultyBadge, {backgroundColor: color + '20'}]}>
          <Text style={[styles.difficultyText, {color}]}>{item.difficulty}</Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={{color: theme.textSecondary, fontSize: 18}}>{'\u203A'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const JSCodeScreen = ({navigation}: any) => {
  const theme = useTheme();
  const toggleTheme = useStore(s => s.toggleTheme);
  const isDarkMode = useStore(s => s.isDarkMode);
  const [searchQuery, setSearchQuery] = useState('');

  const sections = useMemo(() => {
    if (!searchQuery) return jsCodeSections;
    return jsCodeSections
      .map(section => ({
        ...section,
        data: section.data.filter(
          q =>
            q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.category.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter(section => section.data.length > 0);
  }, [searchQuery]);

  const totalQuestions = jsCodeSections.reduce(
    (sum, s) => sum + s.data.length,
    0,
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, {color: theme.text}]}>
            JS Code
          </Text>
          <Text style={[styles.headerSubtitle, {color: theme.textSecondary}]}>
            {totalQuestions} coding questions
          </Text>
        </View>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Text style={{fontSize: 22}}>
            {isDarkMode ? '\u2600\uFE0F' : '\u{1F319}'}
          </Text>
        </TouchableOpacity>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search coding questions..."
      />

      <SectionList
        sections={sections}
        renderItem={({item}) => (
          <CodeQuestionCard
            item={item}
            onPress={() => navigation.navigate('JSCodeDetail', {question: item})}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <View
            style={[
              styles.sectionHeader,
              {backgroundColor: theme.background},
            ]}>
            <Text style={[styles.sectionTitle, {color: theme.primary}]}>
              {title}
            </Text>
            <Text
              style={[styles.sectionCount, {color: theme.textSecondary}]}>
              {sections.find(s => s.title === title)?.data.length || 0}{' '}
              questions
            </Text>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>{'\u{1F50D}'}</Text>
            <Text style={[styles.emptyText, {color: theme.textSecondary}]}>
              No questions found for "{searchQuery}"
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
  card: {
    borderRadius: 14,
    marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  problemPreview: {
    fontSize: 13,
    lineHeight: 19,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingRight: 14,
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

export default JSCodeScreen;
