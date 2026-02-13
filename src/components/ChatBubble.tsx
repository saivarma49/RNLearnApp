import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '../types';
import { useTheme } from '../hooks/useTheme';

interface Props {
  message: ChatMessage;
}

const ChatBubble: React.FC<Props> = ({ message }) => {
  const theme = useTheme();
  const isUser = message.role === 'user';
  const isError = message.isError === true;

  if (isError) {
    return (
      <View style={[styles.container, styles.aiContainer]}>
        <Text style={styles.errorAvatar}>{'\u26A0\uFE0F'}</Text>
        <View style={[styles.bubble, styles.errorBubble, { backgroundColor: theme.error + '12', borderColor: theme.error + '40' }]}>
          <Text style={[styles.errorTitle, { color: theme.error }]}>Error</Text>
          <Text style={[styles.messageText, { color: theme.text }]}>
            {message.content}
          </Text>
          <Text style={[styles.timestamp, { color: theme.textSecondary }]}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      {!isUser && <Text style={styles.avatar}>{'\u{1F916}'}</Text>}
      <View
        style={[
          styles.bubble,
          isUser
            ? [styles.userBubble, { backgroundColor: theme.primary }]
            : [styles.aiBubble, { backgroundColor: theme.card, borderColor: theme.border }],
        ]}>
        <Text
          style={[
            styles.messageText,
            { color: isUser ? '#FFFFFF' : theme.text },
          ]}>
          {message.content}
        </Text>
        <Text
          style={[
            styles.timestamp,
            { color: isUser ? 'rgba(255,255,255,0.7)' : theme.textSecondary },
          ]}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  avatar: {
    fontSize: 24,
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  errorAvatar: {
    fontSize: 24,
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  bubble: {
    maxWidth: '78%',
    padding: 14,
    borderRadius: 18,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  errorBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  errorTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 6,
    textAlign: 'right',
  },
});

export default ChatBubble;
