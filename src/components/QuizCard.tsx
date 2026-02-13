import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { QuizQuestion } from '../types';
import { useTheme } from '../hooks/useTheme';

interface Props {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedAnswer: string, isCorrect: boolean) => void;
}

const QuizCard: React.FC<Props> = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (option: string) => {
    if (selectedOption) return; // Already answered
    setSelectedOption(option);
    setShowExplanation(true);
    const isCorrect = option === question.correctAnswer;
    onAnswer(option, isCorrect);
  };

  const getOptionStyle = (option: string) => {
    if (!selectedOption) {
      return { backgroundColor: theme.surface, borderColor: theme.border };
    }
    if (option === question.correctAnswer) {
      return { backgroundColor: '#E8F5E9', borderColor: '#4CAF50' };
    }
    if (option === selectedOption && option !== question.correctAnswer) {
      return { backgroundColor: '#FFEBEE', borderColor: '#F44336' };
    }
    return { backgroundColor: theme.surface, borderColor: theme.border, opacity: 0.5 };
  };

  const getOptionTextColor = (option: string) => {
    if (!selectedOption) return theme.text;
    if (option === question.correctAnswer) return '#2E7D32';
    if (option === selectedOption) return '#C62828';
    return theme.textSecondary;
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.header}>
        <Text style={[styles.counter, { color: theme.textSecondary }]}>
          Question {questionNumber}/{totalQuestions}
        </Text>
        <View style={[styles.typeBadge, { backgroundColor: theme.primary + '20' }]}>
          <Text style={[styles.typeText, { color: theme.primary }]}>
            {question.type.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={[styles.question, { color: theme.text }]}>{question.question}</Text>

      <View style={styles.options}>
        {question.options?.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.option, getOptionStyle(option)]}
            onPress={() => handleSelect(option)}
            disabled={!!selectedOption}
            activeOpacity={0.7}>
            <Text style={[styles.optionText, { color: getOptionTextColor(option) }]}>
              {option}
            </Text>
            {selectedOption && option === question.correctAnswer && (
              <Text style={styles.checkMark}>{'\u2713'}</Text>
            )}
            {selectedOption === option && option !== question.correctAnswer && (
              <Text style={styles.crossMark}>{'\u2717'}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {showExplanation && (
        <View style={[styles.explanation, { backgroundColor: theme.surface }]}>
          <Text style={[styles.explanationTitle, { color: theme.primary }]}>Explanation</Text>
          <Text style={[styles.explanationText, { color: theme.textSecondary }]}>
            {question.explanation}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  counter: {
    fontSize: 13,
    fontWeight: '600',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  question: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 20,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  optionText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  checkMark: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  crossMark: {
    fontSize: 18,
    color: '#F44336',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  explanation: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 22,
  },
});

export default QuizCard;
