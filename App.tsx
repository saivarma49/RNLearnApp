import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { useStore } from './src/store/useStore';

const AppContent = () => {
  const isDarkMode = useStore((s) => s.isDarkMode);
  const loadTheme = useStore((s) => s.loadTheme);
  const loadProgress = useStore((s) => s.loadProgress);
  const loadChatHistory = useStore((s) => s.loadChatHistory);
  const loadApiKey = useStore((s) => s.loadApiKey);
  const updateStreak = useStore((s) => s.updateStreak);

  useEffect(() => {
    const init = async () => {
      await loadTheme();
      await loadProgress();
      await loadChatHistory();
      await loadApiKey();
      updateStreak();
    };
    init();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#0F0F1A' : '#F5F7FA'}
      />
      <AppNavigator />
    </>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContent />
    </GestureHandlerRootView>
  );
};

export default App;
