import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const AboutScreen = () => {
  const theme = useTheme();

  const resources = [
    {
      title: 'React Native Docs',
      url: 'https://reactnative.dev/docs/getting-started',
      icon: '\u{1F4F1}',
    },
    {
      title: 'JavaScript MDN',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      icon: '\u{1F4DC}',
    },
    {
      title: 'React Docs',
      url: 'https://react.dev',
      icon: '\u269B\uFE0F',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}>
      {/* App Info */}
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={styles.appIcon}>{'\u{1F4DA}'}</Text>
        <Text style={[styles.appName, { color: theme.text }]}>RN Learning Hub</Text>
        <Text style={[styles.version, { color: theme.primary }]}>Version 0.0.1</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          An AI-powered learning companion for React Native and JavaScript. Master mobile
          development with interactive topics, quizzes, and an AI tutor.
        </Text>
      </View>

      {/* Built With */}
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Built With</Text>
        <View style={styles.techRow}>
          <Text style={styles.techIcon}>{'\u269B\uFE0F'}</Text>
          <Text style={[styles.techText, { color: theme.text }]}>React Native 0.84</Text>
        </View>
        <View style={styles.techRow}>
          <Text style={styles.techIcon}>{'\u{1F4E6}'}</Text>
          <Text style={[styles.techText, { color: theme.text }]}>Zustand State Management</Text>
        </View>
        <View style={styles.techRow}>
          <Text style={styles.techIcon}>{'\u{1F916}'}</Text>
          <Text style={[styles.techText, { color: theme.text }]}>OpenAI GPT-4o Mini</Text>
        </View>
        <View style={styles.techRow}>
          <Text style={styles.techIcon}>{'\u{1F9ED}'}</Text>
          <Text style={[styles.techText, { color: theme.text }]}>React Navigation 7</Text>
        </View>
      </View>

      {/* Learning Resources */}
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Learning Resources</Text>
        {resources.map((resource) => (
          <TouchableOpacity
            key={resource.url}
            style={[styles.linkRow, { borderColor: theme.border }]}
            onPress={() => Linking.openURL(resource.url)}
            activeOpacity={0.7}>
            <Text style={styles.linkIcon}>{resource.icon}</Text>
            <Text style={[styles.linkText, { color: theme.primary }]}>{resource.title}</Text>
            <Text style={{ color: theme.textSecondary }}>{'\u203A'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  appIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  techRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 8,
  },
  techIcon: {
    fontSize: 18,
    width: 30,
  },
  techText: {
    fontSize: 15,
    fontWeight: '500',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  linkIcon: {
    fontSize: 18,
    width: 30,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
});

export default AboutScreen;
