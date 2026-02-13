import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import QuizCard from '../components/QuizCard';
import ProgressBar from '../components/ProgressBar';
import { QuizQuestion, QuizResult, QuizAnswer } from '../types';
import * as aiService from '../services/aiService';

const QuizScreen = ({ route, navigation }: any) => {
  const { topicId, topicTitle } = route.params;
  const theme = useTheme();
  const { addQuizResult, incrementAIUsage } = useStore();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    setLoading(true);
    setError(null);
    incrementAIUsage();

    const result = await aiService.generateQuiz(topicTitle);

    if (result.length === 0) {
      // Fallback quiz if AI fails
      setQuestions(getFallbackQuestions());
    } else {
      setQuestions(result);
    }
    setLoading(false);
  };

  const getFallbackQuestions = (): QuizQuestion[] => [
    {
      id: 'fallback_1',
      type: 'mcq',
      question: `What is the primary purpose of ${topicTitle}?`,
      options: [
        'A) To handle UI rendering',
        'B) To manage application state',
        'C) To optimize performance',
        'D) All of the above',
      ],
      correctAnswer: 'D) All of the above',
      explanation: `${topicTitle} serves multiple purposes in React Native development.`,
      topicId,
      difficulty: 'Beginner',
    },
    {
      id: 'fallback_2',
      type: 'mcq',
      question: `Which best describes ${topicTitle}?`,
      options: [
        'A) A built-in React Native component',
        'B) A JavaScript design pattern',
        'C) A development tool',
        'D) Depends on the context',
      ],
      correctAnswer: 'D) Depends on the context',
      explanation: 'Understanding context is key to mastering programming concepts.',
      topicId,
      difficulty: 'Beginner',
    },
    {
      id: 'fallback_3',
      type: 'mcq',
      question: `When should you use ${topicTitle}?`,
      options: [
        'A) Always in every component',
        'B) Only when specifically needed',
        'C) Never in production',
        'D) Only in class components',
      ],
      correctAnswer: 'B) Only when specifically needed',
      explanation: 'Best practice is to use tools and patterns only when they solve a specific problem.',
      topicId,
      difficulty: 'Intermediate',
    },
    {
      id: 'fallback_4',
      type: 'mcq',
      question: `What is a common potential drawback or side effect of misusing ${topicTitle}?`,
      options: [
        'A) Improved application speed',
        'B) Reduced bundle size',
        'C) Unnecessary re-renders or complexity',
        'D) Easier code maintenance',
      ],
      correctAnswer: 'C) Unnecessary re-renders or complexity',
      explanation: 'Using advanced features without a clear need can overcomplicate the codebase and impact performance.',
      topicId,
      difficulty: 'Intermediate',
    },
  ];

  const handleAnswer = (selectedAnswer: string, isCorrect: boolean) => {
    const newAnswer: QuizAnswer = {
      questionId: questions[currentQuestionIndex].id,
      selectedAnswer,
      isCorrect,
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // Check if quiz is complete
    if (updatedAnswers.length === questions.length) {
      const correctCount = updatedAnswers.filter((a) => a.isCorrect).length;
      const accuracy = Math.round((correctCount / questions.length) * 100);

      const result: QuizResult = {
        id: `quiz_${Date.now()}`,
        topicId,
        score: correctCount,
        totalQuestions: questions.length,
        accuracy,
        timestamp: Date.now(),
        answers: updatedAnswers,
      };
      addQuizResult(result);
      setQuizCompleted(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            AI is generating your quiz...
          </Text>
          <Text style={[styles.loadingSubtext, { color: theme.textSecondary }]}>
            Topic: {topicTitle}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorIcon}>{'\u26A0\uFE0F'}</Text>
          <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.primary }]}
            onPress={loadQuiz}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Quiz completed view
  if (quizCompleted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView contentContainerStyle={styles.resultsContainer}>
          <Text style={styles.resultEmoji}>
            {accuracy >= 80 ? '\u{1F3C6}' : accuracy >= 50 ? '\u{1F44D}' : '\u{1F4AA}'}
          </Text>
          <Text style={[styles.resultTitle, { color: theme.text }]}>Quiz Complete!</Text>
          <Text style={[styles.resultTopic, { color: theme.textSecondary }]}>{topicTitle}</Text>

          <View style={[styles.scoreCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.scoreRow}>
              <View style={styles.scoreItem}>
                <Text style={[styles.scoreValue, { color: theme.primary }]}>
                  {correctCount}/{questions.length}
                </Text>
                <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>Score</Text>
              </View>
              <View style={[styles.scoreDivider, { backgroundColor: theme.border }]} />
              <View style={styles.scoreItem}>
                <Text
                  style={[
                    styles.scoreValue,
                    { color: accuracy >= 70 ? theme.success : theme.error },
                  ]}>
                  {accuracy}%
                </Text>
                <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>Accuracy</Text>
              </View>
              <View style={[styles.scoreDivider, { backgroundColor: theme.border }]} />
              <View style={styles.scoreItem}>
                <Text style={[styles.scoreValue, { color: theme.warning }]}>
                  +{Math.round(accuracy * 0.5)}
                </Text>
                <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>XP Earned</Text>
              </View>
            </View>
          </View>

          <View style={styles.resultButtons}>
            <TouchableOpacity
              style={[styles.resultButton, { backgroundColor: theme.primary }]}
              onPress={() => {
                setQuestions([]);
                setAnswers([]);
                setCurrentQuestionIndex(0);
                setQuizCompleted(false);
                loadQuiz();
              }}>
              <Text style={styles.resultButtonText}>Retake Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.resultButton, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}
              onPress={() => navigation.goBack()}>
              <Text style={[styles.resultButtonText, { color: theme.text }]}>Back to Topic</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Progress Header */}
      <View style={[styles.quizHeader, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <View style={styles.quizHeaderTop}>
          <Text style={[styles.quizTitle, { color: theme.text }]}>{topicTitle}</Text>
          <Text style={[styles.quizScore, { color: theme.primary }]}>
            {correctCount}/{answers.length} correct
          </Text>
        </View>
        <ProgressBar
          progress={((currentQuestionIndex + 1) / questions.length) * 100}
          height={6}
          color={theme.primary}
        />
      </View>

      <ScrollView contentContainerStyle={styles.quizContent} showsVerticalScrollIndicator={false}>
        {questions[currentQuestionIndex] && (
          <QuizCard
            key={questions[currentQuestionIndex].id}
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        )}

        {answers.length > currentQuestionIndex && currentQuestionIndex < questions.length - 1 && (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: theme.primary }]}
            onPress={handleNext}
            activeOpacity={0.7}>
            <Text style={styles.nextButtonText}>Next Question</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  loadingSubtext: {
    fontSize: 14,
    marginTop: 6,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  retryText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  quizHeader: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 10,
  },
  quizHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  quizScore: {
    fontSize: 14,
    fontWeight: '600',
  },
  quizContent: {
    padding: 16,
    paddingBottom: 32,
  },
  nextButton: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Results
  resultsContainer: {
    alignItems: 'center',
    padding: 32,
    paddingTop: 48,
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  resultTopic: {
    fontSize: 16,
    marginBottom: 32,
  },
  scoreCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    marginBottom: 32,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scoreDivider: {
    width: 1,
    height: 40,
  },
  resultButtons: {
    width: '100%',
    gap: 12,
  },
  resultButton: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  resultButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default QuizScreen;
