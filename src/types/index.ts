// ============================================================
// RN Smart AI Learning Hub - Type Definitions
// ============================================================

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type TopicCategory =
  | 'Core Components'
  | 'Hooks'
  | 'APIs'
  | 'Performance'
  | 'Architecture'
  | 'Basics'
  | 'Advanced Concepts'
  | 'Async'
  | 'Functional Programming'
  | 'Error Handling & Patterns'
  | 'Styling & Layout'
  | 'Lists & Scrolling';

export interface Topic {
  id: string;
  title: string;
  summary: string;
  definition: string;
  difficulty: Difficulty;
  syntax?: string;
  example?: string;
  outputExplanation?: string;
  realWorldAnalogy?: string;
  interviewQuestions?: string[];
  commonMistakes?: string[];
  performanceTips?: string[];
  completed?: boolean;
}

export interface TopicSection {
  title: string;
  category: TopicCategory;
  data: Topic[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isError?: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'coding' | 'output' | 'scenario';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  topicId: string;
  difficulty: Difficulty;
}

export interface QuizResult {
  id: string;
  topicId: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timestamp: number;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  earned: boolean;
  earnedAt?: number;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedTopics: string[];
  quizResults: QuizResult[];
  totalTimeSpent: number;
  badges: Badge[];
  bookmarkedTopics: string[];
  chatHistory: ChatMessage[];
  aiUsageCount: number;
}

export interface LearningRecommendation {
  type: 'next' | 'revision' | 'advanced';
  topicId: string;
  reason: string;
}

// Navigation types
export type RootStackParamList = {
  MainTabs: undefined;
  TopicDetail: { topic: Topic; type: 'rn' | 'js' };
  JSCodeDetail: { question: any };
  Quiz: { topicId: string; topicTitle: string };
};

export type DrawerParamList = {
  DrawerHome: undefined;
  Bookmarks: undefined;
  QuizHistory: undefined;
  BadgesScreen: undefined;
  JSCompiler: undefined;
  AITutor: undefined;
  Profile: undefined;
  About: undefined;
};

export type BottomTabParamList = {
  Dashboard: undefined;
  ReactNative: undefined;
  JavaScript: undefined;
  JSCode: undefined;
};

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  codeBackground: string;
  codeText: string;
  reactNative: string;
  javascript: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  gradient1: string;
  gradient2: string;
}

// AI Service types
export interface AIResponse {
  content: string;
  error?: string;
}

export interface AIServiceConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
}
