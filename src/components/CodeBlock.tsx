import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTheme } from '../hooks/useTheme';

interface Props {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<Props> = ({ code, language = 'JavaScript' }) => {
  const theme = useTheme();

  const copyToClipboard = () => {
    Clipboard.setString(code);
    Alert.alert('Copied!', 'Code copied to clipboard.');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.codeBackground, borderColor: theme.border }]}>
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.headerText, { color: theme.textSecondary }]}>
          {language.toUpperCase()}
        </Text>
        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
          <Text style={[styles.copyText, { color: theme.primary }]}>Copy</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal bounces={false} style={styles.codeContainer}>
        <View style={styles.codeInner}>
          <Text style={[styles.code, { color: theme.codeText }]}>{code}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  copyButton: {
    padding: 4,
  },
  copyText: {
    fontSize: 12,
    fontWeight: '700',
  },
  codeContainer: {
    minHeight: 80,
  },
  codeInner: {
    padding: 16,
  },
  code: {
    fontFamily: 'Menlo',
    fontSize: 13,
    lineHeight: 20,
  },
});

export default CodeBlock;
