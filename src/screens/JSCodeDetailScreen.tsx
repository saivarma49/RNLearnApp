import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import CodeBlock from '../components/CodeBlock';
import {useTheme} from '../hooks/useTheme';
import {CodeQuestion} from '../data/jsCodeQuestions';

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

const JSCodeDetailScreen = ({route}: any) => {
  const {question}: {question: CodeQuestion} = route.params;
  const theme = useTheme();
  const color = difficultyColor(question.difficulty);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `JS Code Challenge: ${question.title}\n\n${question.problem}\n\nSolution:\n${question.solution}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const copySolution = () => {
    Clipboard.setString(question.solution);
    Alert.alert('Copied!', 'Solution code copied to clipboard.');
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.titleAccent, {backgroundColor: theme.javascript}]} />
          <View style={styles.titleContainer}>
            <Text style={[styles.title, {color: theme.text}]}>
              {question.title}
            </Text>
            <View style={styles.metaRow}>
              <View style={[styles.diffBadge, {backgroundColor: color + '20'}]}>
                <Text style={[styles.diffText, {color}]}>
                  {question.difficulty}
                </Text>
              </View>
              <View
                style={[
                  styles.categoryBadge,
                  {backgroundColor: theme.primary + '15'},
                ]}>
                <Text style={[styles.categoryText, {color: theme.primary}]}>
                  {question.category}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <Text style={styles.shareIcon}>{'\u{1F4E4}'}</Text>
          </TouchableOpacity>
        </View>

        {/* Problem Statement */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>
            {'\u{1F4CB}'} Problem
          </Text>
          <Text style={[styles.bodyText, {color: theme.textSecondary}]}>
            {question.problem}
          </Text>
        </View>

        {/* Solution Code */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <Text style={[styles.sectionTitle, {color: theme.text}]}>
              {'\u{1F4BB}'} Solution
            </Text>
            <TouchableOpacity onPress={copySolution} style={styles.copyBtn}>
              <Text style={[styles.copyBtnText, {color: theme.primary}]}>
                Copy
              </Text>
            </TouchableOpacity>
          </View>
          <CodeBlock code={question.solution} />
        </View>

        {/* Console Output */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>
            {'\u{1F4FA}'} Console Output
          </Text>
          <View
            style={[
              styles.outputBlock,
              {backgroundColor: '#0D1117', borderColor: theme.border},
            ]}>
            <Text style={styles.outputText}>{question.consoleOutput}</Text>
          </View>
        </View>

        {/* Explanation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.text}]}>
            {'\u{1F4A1}'} Explanation
          </Text>
          <View
            style={[
              styles.explanationCard,
              {backgroundColor: theme.card, borderColor: theme.border},
            ]}>
            <Text style={[styles.bodyText, {color: theme.text}]}>
              {question.explanation}
            </Text>
          </View>
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleAccent: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
    marginTop: 4,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
  },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  diffText: {
    fontSize: 12,
    fontWeight: '700',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  shareButton: {
    padding: 6,
    marginLeft: 8,
  },
  shareIcon: {
    fontSize: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  copyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  copyBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
  },
  outputBlock: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  outputText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    lineHeight: 20,
    color: '#4ADE80',
  },
  explanationCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
});

export default JSCodeDetailScreen;
