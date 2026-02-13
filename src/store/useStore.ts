// ============================================================
// Zustand Global Store
// ============================================================
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserProgress,
  ChatMessage,
  QuizResult,
  Badge,
  LearningRecommendation,
  Topic,
} from '../types';
import { setApiKey as setServiceApiKey, getApiKey as getServiceApiKey } from '../services/aiService';

const STORAGE_KEY = '@rn_smart_learning_hub';
const THEME_KEY = '@theme_preference';
const CHAT_KEY = '@chat_history';
const API_KEY_STORAGE = '@openai_api_key';

// ---- Badge Definitions ----
const DEFAULT_BADGES: Badge[] = [
  {
    id: 'hooks_master',
    title: 'Hooks Master',
    description: 'Complete all Hooks topics',
    icon: 'hook',
    requirement: 'Complete 5 Hooks topics',
    earned: false,
  },
  {
    id: 'js_ninja',
    title: 'JS Ninja',
    description: 'Score 90%+ on 5 JavaScript quizzes',
    icon: 'ninja',
    requirement: '90%+ accuracy on 5 JS quizzes',
    earned: false,
  },
  {
    id: 'async_pro',
    title: 'Async Pro',
    description: 'Master all async topics',
    icon: 'lightning',
    requirement: 'Complete all Async topics',
    earned: false,
  },
  {
    id: 'debug_king',
    title: 'Debug King',
    description: 'Use AI debugger 10 times',
    icon: 'bug',
    requirement: 'Use AI debug feature 10 times',
    earned: false,
  },
  {
    id: 'streak_warrior',
    title: 'Streak Warrior',
    description: 'Maintain a 7-day streak',
    icon: 'fire',
    requirement: '7 consecutive days of learning',
    earned: false,
  },
  {
    id: 'quiz_champion',
    title: 'Quiz Champion',
    description: 'Score 100% on any quiz',
    icon: 'trophy',
    requirement: 'Perfect score on a quiz',
    earned: false,
  },
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Complete your first topic',
    icon: 'star',
    requirement: 'Complete 1 topic',
    earned: false,
  },
  {
    id: 'ai_explorer',
    title: 'AI Explorer',
    description: 'Ask AI 20 questions',
    icon: 'robot',
    requirement: 'Use AI Tutor 20 times',
    earned: false,
  },
];

// ---- XP / Level Calculations ----
function getXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

function getLevelFromXP(xp: number): number {
  let level = 1;
  let xpNeeded = 100;
  while (xp >= xpNeeded) {
    level++;
    xpNeeded += Math.floor(100 * Math.pow(1.5, level - 1));
  }
  return level;
}

// ---- Store Interface ----
interface AppStore {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => Promise<void>;
  loadTheme: () => Promise<void>;

  // User Progress
  progress: UserProgress;
  loadProgress: () => Promise<void>;
  saveProgress: () => Promise<void>;

  // Topic Progress
  completeTopic: (topicId: string) => void;
  isTopicCompleted: (topicId: string) => boolean;

  // Bookmarks
  toggleBookmark: (topicId: string) => void;
  isBookmarked: (topicId: string) => boolean;

  // Quiz
  addQuizResult: (result: QuizResult) => void;
  getTopicQuizResults: (topicId: string) => QuizResult[];
  getOverallAccuracy: () => number;

  // XP & Gamification
  addXP: (amount: number) => void;
  getXPForNextLevel: () => number;
  getCurrentLevelXP: () => number;
  checkAndAwardBadges: () => void;
  updateStreak: () => void;

  // Chat
  chatHistory: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChatHistory: () => void;
  loadChatHistory: () => Promise<void>;

  // AI Usage
  incrementAIUsage: () => void;

  // API Key
  apiKey: string;
  setApiKey: (key: string) => Promise<void>;
  loadApiKey: () => Promise<void>;
  isApiKeySet: () => boolean;

  // Learning Recommendations
  getRecommendations: (
    rnTopicIds: string[],
    jsTopicIds: string[],
  ) => LearningRecommendation[];

  // Stats
  getWeakTopics: () => string[];
  getTotalQuizzesTaken: () => number;
}

export const useStore = create<AppStore>((set, get) => ({
  // ---- Theme ----
  isDarkMode: false,

  toggleTheme: async () => {
    const newMode = !get().isDarkMode;
    set({ isDarkMode: newMode });
    await AsyncStorage.setItem(THEME_KEY, newMode ? 'dark' : 'light');
  },

  loadTheme: async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved !== null) {
        set({ isDarkMode: saved === 'dark' });
      }
    } catch (e) {
      console.error('Failed to load theme', e);
    }
  },

  // ---- Progress ----
  progress: {
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: '',
    completedTopics: [],
    quizResults: [],
    totalTimeSpent: 0,
    badges: DEFAULT_BADGES,
    bookmarkedTopics: [],
    chatHistory: [],
    aiUsageCount: 0,
  },

  loadProgress: async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as UserProgress;
        // Merge with default badges to ensure new badges are included
        const mergedBadges = DEFAULT_BADGES.map((defaultBadge) => {
          const saved = parsed.badges?.find((b) => b.id === defaultBadge.id);
          return saved || defaultBadge;
        });
        set({ progress: { ...parsed, badges: mergedBadges } });
      }
    } catch (e) {
      console.error('Failed to load progress', e);
    }
  },

  saveProgress: async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(get().progress));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  },

  // ---- Topics ----
  completeTopic: (topicId: string) => {
    const { progress } = get();
    if (!progress.completedTopics.includes(topicId)) {
      const updated = {
        ...progress,
        completedTopics: [...progress.completedTopics, topicId],
      };
      set({ progress: updated });
      get().addXP(25);
      get().saveProgress();
      get().checkAndAwardBadges();
    }
  },

  isTopicCompleted: (topicId: string) => {
    return get().progress.completedTopics.includes(topicId);
  },

  // ---- Bookmarks ----
  toggleBookmark: (topicId: string) => {
    const { progress } = get();
    const bookmarks = progress.bookmarkedTopics.includes(topicId)
      ? progress.bookmarkedTopics.filter((id) => id !== topicId)
      : [...progress.bookmarkedTopics, topicId];
    set({ progress: { ...progress, bookmarkedTopics: bookmarks } });
    get().saveProgress();
  },

  isBookmarked: (topicId: string) => {
    return get().progress.bookmarkedTopics.includes(topicId);
  },

  // ---- Quiz ----
  addQuizResult: (result: QuizResult) => {
    const { progress } = get();
    const updated = {
      ...progress,
      quizResults: [...progress.quizResults, result],
    };
    set({ progress: updated });
    // Award XP based on score
    const xpEarned = Math.round(result.accuracy * 50);
    get().addXP(xpEarned);
    get().saveProgress();
    get().checkAndAwardBadges();
  },

  getTopicQuizResults: (topicId: string) => {
    return get().progress.quizResults.filter((r) => r.topicId === topicId);
  },

  getOverallAccuracy: () => {
    const results = get().progress.quizResults;
    if (results.length === 0) return 0;
    const total = results.reduce((sum, r) => sum + r.accuracy, 0);
    return Math.round(total / results.length);
  },

  // ---- XP & Gamification ----
  addXP: (amount: number) => {
    const { progress } = get();
    const newXP = progress.xp + amount;
    const newLevel = getLevelFromXP(newXP);
    set({
      progress: { ...progress, xp: newXP, level: newLevel },
    });
  },

  getXPForNextLevel: () => {
    const { progress } = get();
    return getXPForLevel(progress.level + 1);
  },

  getCurrentLevelXP: () => {
    const { progress } = get();
    let totalXPForCurrentLevel = 0;
    for (let i = 1; i < progress.level; i++) {
      totalXPForCurrentLevel += getXPForLevel(i);
    }
    return progress.xp - totalXPForCurrentLevel;
  },

  checkAndAwardBadges: () => {
    const { progress } = get();
    const updatedBadges = progress.badges.map((badge) => {
      if (badge.earned) return badge;

      switch (badge.id) {
        case 'first_step':
          if (progress.completedTopics.length >= 1) {
            return { ...badge, earned: true, earnedAt: Date.now() };
          }
          break;
        case 'streak_warrior':
          if (progress.streak >= 7) {
            return { ...badge, earned: true, earnedAt: Date.now() };
          }
          break;
        case 'quiz_champion':
          if (progress.quizResults.some((r) => r.accuracy === 100)) {
            return { ...badge, earned: true, earnedAt: Date.now() };
          }
          break;
        case 'ai_explorer':
          if (progress.aiUsageCount >= 20) {
            return { ...badge, earned: true, earnedAt: Date.now() };
          }
          break;
        case 'hooks_master':
          if (
            ['usestate', 'useeffect', 'useref', 'usememo', 'usecallback'].every(
              (id) => progress.completedTopics.includes(id),
            )
          ) {
            return { ...badge, earned: true, earnedAt: Date.now() };
          }
          break;
        case 'js_ninja': {
          const jsQuizzes = progress.quizResults.filter(
            (r) => r.accuracy >= 90,
          );
          if (jsQuizzes.length >= 5) {
            return { ...badge, earned: true, earnedAt: Date.now() };
          }
          break;
        }
        case 'debug_king':
          if (progress.aiUsageCount >= 10) {
            return { ...badge, earned: true, earnedAt: Date.now() };
          }
          break;
        case 'async_pro':
          if (
            ['promises', 'async-await'].every((id) =>
              progress.completedTopics.includes(id),
            )
          ) {
            return { ...badge, earned: true, earnedAt: Date.now() };
          }
          break;
      }
      return badge;
    });

    set({ progress: { ...progress, badges: updatedBadges } });
  },

  updateStreak: () => {
    const { progress } = get();
    const today = new Date().toISOString().split('T')[0];

    if (progress.lastActiveDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newStreak = progress.lastActiveDate === yesterday ? progress.streak + 1 : 1;

    set({
      progress: {
        ...progress,
        streak: newStreak,
        lastActiveDate: today,
      },
    });
    get().saveProgress();
    get().checkAndAwardBadges();
  },

  // ---- Chat ----
  chatHistory: [],

  addChatMessage: (message: ChatMessage) => {
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    }));
    // Save async
    const history = get().chatHistory;
    AsyncStorage.setItem(CHAT_KEY, JSON.stringify(history.slice(-100))).catch(
      console.error,
    );
  },

  clearChatHistory: () => {
    set({ chatHistory: [] });
    AsyncStorage.removeItem(CHAT_KEY).catch(console.error);
  },

  loadChatHistory: async () => {
    try {
      const saved = await AsyncStorage.getItem(CHAT_KEY);
      if (saved) {
        set({ chatHistory: JSON.parse(saved) });
      }
    } catch (e) {
      console.error('Failed to load chat history', e);
    }
  },

  // ---- AI Usage ----
  incrementAIUsage: () => {
    const { progress } = get();
    set({
      progress: { ...progress, aiUsageCount: progress.aiUsageCount + 1 },
    });
    get().saveProgress();
    get().checkAndAwardBadges();
  },

  // ---- API Key ----
  apiKey: '',

  setApiKey: async (key: string) => {
    const trimmed = key.trim();
    set({ apiKey: trimmed });
    setServiceApiKey(trimmed);
    try {
      await AsyncStorage.setItem(API_KEY_STORAGE, trimmed);
    } catch (e) {
      console.error('Failed to save API key', e);
    }
  },

  loadApiKey: async () => {
    try {
      const saved = await AsyncStorage.getItem(API_KEY_STORAGE);
      if (saved) {
        set({ apiKey: saved });
        setServiceApiKey(saved);
      } else {
        // Sync store with the service's default key (if one exists)
        const defaultKey = getServiceApiKey();
        if (defaultKey) {
          set({ apiKey: defaultKey });
        }
      }
    } catch (e) {
      console.error('Failed to load API key', e);
    }
  },

  isApiKeySet: () => {
    return get().apiKey.trim().length > 0;
  },

  // ---- Learning Recommendations ----
  getRecommendations: (rnTopicIds: string[], jsTopicIds: string[]) => {
    const { progress } = get();
    const completed = new Set(progress.completedTopics);
    const recommendations: LearningRecommendation[] = [];

    // Find incomplete topics as next recommendations
    const allTopicIds = [...rnTopicIds, ...jsTopicIds];
    const incomplete = allTopicIds.filter((id) => !completed.has(id));

    if (incomplete.length > 0) {
      recommendations.push({
        type: 'next',
        topicId: incomplete[0],
        reason: 'Continue your learning journey',
      });
    }

    // Weak topics from quiz results
    const weakTopics = get().getWeakTopics();
    weakTopics.slice(0, 2).forEach((topicId) => {
      recommendations.push({
        type: 'revision',
        topicId,
        reason: 'Low quiz scores - needs revision',
      });
    });

    return recommendations;
  },

  // ---- Stats ----
  getWeakTopics: () => {
    const { progress } = get();
    const topicScores: Record<string, number[]> = {};

    progress.quizResults.forEach((result) => {
      if (!topicScores[result.topicId]) {
        topicScores[result.topicId] = [];
      }
      topicScores[result.topicId].push(result.accuracy);
    });

    return Object.entries(topicScores)
      .filter(([, scores]) => {
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        return avg < 70;
      })
      .map(([topicId]) => topicId);
  },

  getTotalQuizzesTaken: () => {
    return get().progress.quizResults.length;
  },
}));
