import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import ChatBubble from '../components/ChatBubble';
import TypingIndicator from '../components/TypingIndicator';
import { ChatMessage } from '../types';
import { useNavigation } from '@react-navigation/native';
import * as aiService from '../services/aiService';

const QUICK_PROMPTS = [
  { label: 'Explain useEffect', icon: '\u{1F4A1}' },
  { label: 'Debug my code', icon: '\u{1F41B}' },
  { label: 'Interview prep', icon: '\u{1F4BC}' },
  { label: 'Best practices', icon: '\u2728' },
];

const AITutorScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { chatHistory, addChatMessage, clearChatHistory, incrementAIUsage, loadChatHistory, isApiKeySet } =
    useStore();

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = async (text?: string) => {
    const message = text || inputText.trim();
    if (!message) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };
    addChatMessage(userMessage);
    setInputText('');
    setIsTyping(true);
    scrollToBottom();

    // Get AI response
    const conversationHistory = chatHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await aiService.chatWithAI(message, conversationHistory);

    setIsTyping(false);

    if (response.error) {
      // Show error as a distinct error bubble, don't count as AI usage
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: response.error,
        timestamp: Date.now(),
        isError: true,
      };
      addChatMessage(errorMessage);
    } else {
      // Success - count usage and show AI response
      incrementAIUsage();
      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: response.content || 'Sorry, I could not generate a response.',
        timestamp: Date.now(),
      };
      addChatMessage(aiMessage);
    }
    scrollToBottom();
  };

  const renderHeader = () => (
    <View style={styles.chatHeader}>
      {chatHistory.length === 0 && (
        <>
          <Text style={styles.welcomeEmoji}>{'\u{1F916}'}</Text>
          <Text style={[styles.welcomeTitle, { color: theme.text }]}>AI Tutor</Text>
          <Text style={[styles.welcomeSubtitle, { color: theme.textSecondary }]}>
            Ask me anything about React Native or JavaScript. I can help with concepts, debugging,
            interview prep, and more!
          </Text>
          <View style={styles.quickPrompts}>
            {QUICK_PROMPTS.map((prompt, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickPrompt, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => sendMessage(prompt.label)}
                activeOpacity={0.7}>
                <Text style={styles.quickPromptIcon}>{prompt.icon}</Text>
                <Text style={[styles.quickPromptText, { color: theme.text }]}>{prompt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header Bar */}
      <View style={[styles.topBar, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <View style={styles.topBarContent}>
          <Text style={styles.topBarEmoji}>{'\u{1F916}'}</Text>
          <View>
            <Text style={[styles.topBarTitle, { color: theme.text }]}>AI Tutor</Text>
            <Text style={[styles.topBarStatus, { color: theme.success }]}>Online</Text>
          </View>
        </View>
        {chatHistory.length > 0 && (
          <TouchableOpacity onPress={clearChatHistory} style={styles.clearButton}>
            <Text style={[styles.clearText, { color: theme.error }]}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* API Key Warning Banner */}
      {!isApiKeySet() && (
        <TouchableOpacity
          style={[styles.apiKeyBanner, { backgroundColor: theme.warning + '15', borderColor: theme.warning + '40' }]}
          onPress={() => (navigation as any).navigate('Profile')}
          activeOpacity={0.7}>
          <Text style={styles.bannerIcon}>{'\u26A0\uFE0F'}</Text>
          <View style={styles.bannerTextContainer}>
            <Text style={[styles.bannerTitle, { color: theme.text }]}>API Key Required</Text>
            <Text style={[styles.bannerSubtitle, { color: theme.textSecondary }]}>
              Tap here to go to Profile and add your OpenAI API key
            </Text>
          </View>
          <Text style={[styles.bannerArrow, { color: theme.textSecondary }]}>{'\u203A'}</Text>
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}>
        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={chatHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
        />

        {/* Input Bar */}
        <View style={[styles.inputBar, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me anything..."
            placeholderTextColor={theme.textSecondary}
            multiline
            maxLength={2000}
            onSubmitEditing={() => sendMessage()}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim() ? theme.primary : theme.border,
              },
            ]}
            onPress={() => sendMessage()}
            disabled={!inputText.trim() || isTyping}
            activeOpacity={0.7}>
            <Text style={styles.sendIcon}>{'\u2191'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  topBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarEmoji: {
    fontSize: 28,
    marginRight: 10,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  topBarStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  clearButton: {
    padding: 8,
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
  },
  messageList: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  chatHeader: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  welcomeEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  quickPrompts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  quickPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  quickPromptIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  quickPromptText: {
    fontSize: 13,
    fontWeight: '600',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  apiKeyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  bannerIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  bannerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  bannerArrow: {
    fontSize: 24,
    fontWeight: '300',
    marginLeft: 8,
  },
});

export default AITutorScreen;
