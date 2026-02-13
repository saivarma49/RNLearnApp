import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CodeBlock from '../components/CodeBlock';
import ExpandableSection from '../components/ExpandableSection';
import AIButton from '../components/AIButton';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import * as aiService from '../services/aiService';

const TopicDetailScreen = ({ route, navigation }: any) => {
  const { topic, type } = route.params;
  const theme = useTheme();
  const { toggleBookmark, isBookmarked, completeTopic, isTopicCompleted, incrementAIUsage } =
    useStore();

  const bookmarked = isBookmarked(topic.id);
  const completed = isTopicCompleted(topic.id);

  // AI State
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAIAction = async (action: string) => {
    setAiLoading(action);
    setAiError(null);
    setAiContent(null);
    incrementAIUsage();

    let response;
    switch (action) {
      case 'ask':
        response = await aiService.generateDefinition(topic.title);
        break;
      case 'quiz':
        navigation.navigate('Quiz', { topicId: topic.id, topicTitle: topic.title });
        setAiLoading(null);
        return;
      case 'eli5':
        response = await aiService.explainLikeFive(topic.title);
        break;
      case 'advanced':
        response = await aiService.generateAdvancedVersion(topic.title);
        break;
      case 'interview':
        response = await aiService.generateInterviewQuestions(topic.title);
        break;
      case 'example':
        response = await aiService.generateExample(topic.title);
        break;
      default:
        setAiLoading(null);
        return;
    }

    setAiLoading(null);
    if (response?.error) {
      setAiError(response.error);
    } else if (response?.content) {
      setAiContent(response.content);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Learning about ${topic.title} in RN Smart AI Learning Hub!\n\n${topic.definition}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const accentColor = type === 'rn' ? theme.reactNative : theme.javascript;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.titleAccent, { backgroundColor: accentColor }]} />
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.text }]}>{topic.title}</Text>
            <View style={[styles.diffBadge, { backgroundColor: accentColor + '20' }]}>
              <Text style={[styles.diffText, { color: accentColor }]}>{topic.difficulty}</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => toggleBookmark(topic.id)} style={styles.iconButton}>
              <Text style={styles.iconText}>{bookmarked ? '\u{1F516}' : '\u{1F517}'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
              <Text style={styles.iconText}>{'\u{1F4E4}'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mark Complete */}
        <TouchableOpacity
          style={[
            styles.completeButton,
            {
              backgroundColor: completed ? theme.success + '15' : theme.primary + '15',
              borderColor: completed ? theme.success : theme.primary,
            },
          ]}
          onPress={() => !completed && completeTopic(topic.id)}
          disabled={completed}
          activeOpacity={0.7}>
          <Text style={styles.completeIcon}>{completed ? '\u2705' : '\u{1F4CB}'}</Text>
          <Text
            style={[
              styles.completeText,
              { color: completed ? theme.success : theme.primary },
            ]}>
            {completed ? 'Completed!' : 'Mark as Complete (+25 XP)'}
          </Text>
        </TouchableOpacity>

        {/* Definition */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Definition</Text>
          <Text style={[styles.bodyText, { color: theme.textSecondary }]}>{topic.definition}</Text>
        </View>

        {/* Real-world Analogy */}
        {topic.realWorldAnalogy && (
          <View style={[styles.analogyCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={styles.analogyIcon}>{'\u{1F4A1}'}</Text>
            <View style={styles.analogyContent}>
              <Text style={[styles.analogyTitle, { color: theme.primary }]}>Real-world Analogy</Text>
              <Text style={[styles.bodyText, { color: theme.textSecondary }]}>
                {topic.realWorldAnalogy}
              </Text>
            </View>
          </View>
        )}

        {/* Syntax */}
        {topic.syntax && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Syntax</Text>
            <View
              style={[
                styles.syntaxContainer,
                { backgroundColor: theme.codeBackground, borderLeftColor: accentColor },
              ]}>
              <Text style={[styles.syntaxText, { color: theme.codeText }]}>{topic.syntax}</Text>
            </View>
          </View>
        )}

        {/* Code Example */}
        {topic.example && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Code Example</Text>
            <CodeBlock code={topic.example} />
          </View>
        )}

        {/* Output Explanation */}
        {topic.outputExplanation && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Output Explanation</Text>
            <Text style={[styles.bodyText, { color: theme.textSecondary }]}>
              {topic.outputExplanation}
            </Text>
          </View>
        )}

        {/* Interview Questions */}
        {topic.interviewQuestions && topic.interviewQuestions.length > 0 && (
          <ExpandableSection title={`Interview Questions (${topic.interviewQuestions.length})`}>
            {topic.interviewQuestions.map((q: string, i: number) => (
              <View key={i} style={styles.listItem}>
                <Text style={[styles.listNumber, { color: theme.primary }]}>{i + 1}.</Text>
                <Text style={[styles.bodyText, { color: theme.textSecondary, flex: 1 }]}>{q}</Text>
              </View>
            ))}
          </ExpandableSection>
        )}

        {/* Common Mistakes */}
        {topic.commonMistakes && topic.commonMistakes.length > 0 && (
          <ExpandableSection title="Common Mistakes">
            {topic.commonMistakes.map((m: string, i: number) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>{'\u26A0\uFE0F'}</Text>
                <Text style={[styles.bodyText, { color: theme.textSecondary, flex: 1 }]}>{m}</Text>
              </View>
            ))}
          </ExpandableSection>
        )}

        {/* Performance Tips */}
        {topic.performanceTips && topic.performanceTips.length > 0 && (
          <ExpandableSection title="Performance Tips">
            {topic.performanceTips.map((tip: string, i: number) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>{'\u26A1'}</Text>
                <Text style={[styles.bodyText, { color: theme.textSecondary, flex: 1 }]}>{tip}</Text>
              </View>
            ))}
          </ExpandableSection>
        )}

        {/* AI Action Buttons */}
        <View style={styles.aiSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>AI Actions</Text>
          <View style={styles.aiButtonsGrid}>
            <AIButton
              title="Ask AI"
              icon={'\u{1F916}'}
              onPress={() => handleAIAction('ask')}
              loading={aiLoading === 'ask'}
              variant="primary"
            />
            <AIButton
              title="Generate Quiz"
              icon={'\u{1F4DD}'}
              onPress={() => handleAIAction('quiz')}
              loading={aiLoading === 'quiz'}
            />
            <AIButton
              title="Explain Like I'm 5"
              icon={'\u{1F476}'}
              onPress={() => handleAIAction('eli5')}
              loading={aiLoading === 'eli5'}
            />
            <AIButton
              title="Advanced Version"
              icon={'\u{1F680}'}
              onPress={() => handleAIAction('advanced')}
              loading={aiLoading === 'advanced'}
            />
            <AIButton
              title="Interview Q's"
              icon={'\u{1F4BC}'}
              onPress={() => handleAIAction('interview')}
              loading={aiLoading === 'interview'}
            />
            <AIButton
              title="More Examples"
              icon={'\u{1F4BB}'}
              onPress={() => handleAIAction('example')}
              loading={aiLoading === 'example'}
            />
          </View>
        </View>

        {/* AI Response */}
        {aiLoading && (
          <View style={styles.aiResponseContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
              AI is thinking...
            </Text>
          </View>
        )}

        {aiError && (
          <View style={[styles.aiResponseContainer, { backgroundColor: theme.error + '10' }]}>
            <Text style={[styles.aiErrorText, { color: theme.error }]}>{aiError}</Text>
          </View>
        )}

        {aiContent && !aiLoading && (
          <View style={[styles.aiResponseContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.aiResponseHeader}>
              <Text style={styles.aiResponseIcon}>{'\u{1F916}'}</Text>
              <Text style={[styles.aiResponseTitle, { color: theme.primary }]}>AI Response</Text>
            </View>
            <Text style={[styles.bodyText, { color: theme.text }]}>{aiContent}</Text>
          </View>
        )}
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
    marginBottom: 16,
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  diffBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  diffText: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  iconButton: {
    padding: 6,
    marginLeft: 4,
  },
  iconText: {
    fontSize: 22,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 24,
  },
  completeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  completeText: {
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
  },
  analogyCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 24,
  },
  analogyIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  analogyContent: {
    flex: 1,
  },
  analogyTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  syntaxContainer: {
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 4,
  },
  syntaxText: {
    fontFamily: 'Menlo',
    fontSize: 14,
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8,
  },
  listNumber: {
    fontSize: 15,
    fontWeight: '700',
    width: 24,
  },
  listBullet: {
    fontSize: 14,
  },
  aiSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  aiButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  aiResponseContainer: {
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 16,
    alignItems: 'center',
  },
  aiResponseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  aiResponseIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  aiResponseTitle: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  aiErrorText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default TopicDetailScreen;
