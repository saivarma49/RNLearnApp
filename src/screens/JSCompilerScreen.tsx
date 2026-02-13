import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface OutputLine {
  type: 'log' | 'error' | 'warn' | 'result';
  text: string;
}

const SAMPLE_SNIPPETS = [
  {
    label: 'Hello World',
    code: 'console.log("Hello, World!");',
  },
  {
    label: 'Array Methods',
    code: `const nums = [1, 2, 3, 4, 5];

const doubled = nums.map(n => n * 2);
console.log("Doubled:", doubled);

const evens = nums.filter(n => n % 2 === 0);
console.log("Evens:", evens);

const sum = nums.reduce((a, b) => a + b, 0);
console.log("Sum:", sum);`,
  },
  {
    label: 'Closures',
    code: `function counter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const c = counter();
c.increment();
c.increment();
c.increment();
c.decrement();
console.log("Count:", c.getCount());`,
  },
  {
    label: 'Promises',
    code: `// Simulating async with Promises
const fetchData = (name) =>
  new Promise((resolve) => resolve({ user: name, id: 42 }));

fetchData("Alice").then(data => {
  console.log("User:", data.user);
  console.log("ID:", data.id);
});

console.log("This runs first (sync)");`,
  },
  {
    label: 'Classes',
    code: `class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  speak() {
    return this.name + " says " + this.sound + "!";
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof");
  }
  fetch(item) {
    return this.name + " fetches the " + item;
  }
}

const dog = new Dog("Buddy");
console.log(dog.speak());
console.log(dog.fetch("ball"));`,
  },
];

const JSCompilerScreen = () => {
  const theme = useTheme();
  const [code, setCode] = useState('// Write your JavaScript here\nconsole.log("Hello, World!");\n');
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const outputScrollRef = useRef<ScrollView>(null);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);

    const lines: OutputLine[] = [];

    // Capture console methods
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    const stringify = (args: any[]) =>
      args
        .map((a) => {
          if (a === undefined) return 'undefined';
          if (a === null) return 'null';
          if (typeof a === 'object') {
            try {
              return JSON.stringify(a, null, 2);
            } catch {
              return String(a);
            }
          }
          return String(a);
        })
        .join(' ');

    console.log = (...args: any[]) => {
      lines.push({ type: 'log', text: stringify(args) });
    };
    console.warn = (...args: any[]) => {
      lines.push({ type: 'warn', text: stringify(args) });
    };
    console.error = (...args: any[]) => {
      lines.push({ type: 'error', text: stringify(args) });
    };

    try {
      // Use Function constructor for slightly safer eval
      const fn = new Function(code);
      const result = fn();
      if (result !== undefined) {
        lines.push({ type: 'result', text: `\u21B3 ${stringify([result])}` });
      }
    } catch (e: any) {
      lines.push({ type: 'error', text: e.message || String(e) });
    }

    // Restore console
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;

    setOutput(lines);
    setIsRunning(false);

    setTimeout(() => {
      outputScrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [code]);

  const clearOutput = () => setOutput([]);

  const clearAll = () => {
    setCode('');
    setOutput([]);
  };

  const loadSnippet = (snippetCode: string) => {
    setCode(snippetCode);
    setOutput([]);
    setShowSnippets(false);
  };

  const getOutputColor = (type: OutputLine['type']) => {
    switch (type) {
      case 'error':
        return theme.error;
      case 'warn':
        return theme.warning;
      case 'result':
        return theme.success;
      default:
        return theme.codeText;
    }
  };

  const getOutputPrefix = (type: OutputLine['type']) => {
    switch (type) {
      case 'error':
        return '\u2718 ';
      case 'warn':
        return '\u26A0 ';
      case 'result':
        return '';
      default:
        return '\u203A ';
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}>
      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.toolBtn, { backgroundColor: theme.primary }]}
          onPress={runCode}
          activeOpacity={0.7}>
          <Text style={styles.toolBtnText}>{'\u25B6'} Run</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolBtn, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}
          onPress={clearOutput}
          activeOpacity={0.7}>
          <Text style={[styles.toolBtnTextAlt, { color: theme.text }]}>Clear Output</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolBtn, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}
          onPress={clearAll}
          activeOpacity={0.7}>
          <Text style={[styles.toolBtnTextAlt, { color: theme.text }]}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolBtn, { backgroundColor: theme.javascript + '30', borderColor: theme.javascript, borderWidth: 1 }]}
          onPress={() => setShowSnippets(!showSnippets)}
          activeOpacity={0.7}>
          <Text style={[styles.toolBtnTextAlt, { color: theme.javascript }]}>
            {showSnippets ? '\u2715' : '\u{1F4CB}'} Snippets
          </Text>
        </TouchableOpacity>
      </View>

      {/* Snippets Dropdown */}
      {showSnippets && (
        <View style={[styles.snippetsPanel, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.snippetsScroll}>
            {SAMPLE_SNIPPETS.map((s) => (
              <TouchableOpacity
                key={s.label}
                style={[styles.snippetChip, { backgroundColor: theme.surface, borderColor: theme.border }]}
                onPress={() => loadSnippet(s.code)}
                activeOpacity={0.7}>
                <Text style={[styles.snippetLabel, { color: theme.primary }]}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Code Editor */}
      <View style={[styles.editorContainer, { backgroundColor: theme.codeBackground, borderColor: theme.border }]}>
        <View style={[styles.editorHeader, { borderColor: theme.border }]}>
          <Text style={[styles.editorTitle, { color: theme.textSecondary }]}>
            {'\u{1F4DD}'} JavaScript Editor
          </Text>
          <Text style={[styles.lineCount, { color: theme.textSecondary }]}>
            {code.split('\n').length} lines
          </Text>
        </View>
        <ScrollView style={styles.editorScroll} keyboardDismissMode="interactive">
          <TextInput
            ref={inputRef}
            style={[styles.codeInput, { color: theme.codeText }]}
            value={code}
            onChangeText={setCode}
            multiline
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            textAlignVertical="top"
            placeholder="// Type your JavaScript code here..."
            placeholderTextColor={theme.textSecondary + '80'}
            keyboardType="ascii-capable"
          />
        </ScrollView>
      </View>

      {/* Output Console */}
      <View style={[styles.outputContainer, { backgroundColor: theme.codeBackground, borderColor: theme.border }]}>
        <View style={[styles.outputHeader, { borderColor: theme.border }]}>
          <Text style={[styles.outputTitle, { color: theme.textSecondary }]}>
            {'\u{1F4BB}'} Console Output
          </Text>
          {output.length > 0 && (
            <Text style={[styles.outputCount, { color: theme.textSecondary }]}>
              {output.length} {output.length === 1 ? 'line' : 'lines'}
            </Text>
          )}
        </View>
        <ScrollView
          ref={outputScrollRef}
          style={styles.outputScroll}
          contentContainerStyle={styles.outputContent}>
          {output.length === 0 ? (
            <Text style={[styles.outputPlaceholder, { color: theme.textSecondary + '60' }]}>
              {isRunning ? 'Running...' : 'Press Run to execute your code'}
            </Text>
          ) : (
            output.map((line, i) => (
              <View
                key={i}
                style={[
                  styles.outputLine,
                  line.type === 'error' && { backgroundColor: theme.error + '10' },
                  line.type === 'warn' && { backgroundColor: theme.warning + '10' },
                ]}>
                <Text
                  style={[styles.outputText, { color: getOutputColor(line.type) }]}
                  selectable>
                  {getOutputPrefix(line.type)}{line.text}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    gap: 6,
  },
  toolBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toolBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },
  toolBtnTextAlt: {
    fontWeight: '600',
    fontSize: 12,
  },
  snippetsPanel: {
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  snippetsScroll: {
    paddingHorizontal: 10,
    gap: 8,
  },
  snippetChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
  },
  snippetLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  editorContainer: {
    flex: 3,
    borderBottomWidth: 1,
    margin: 8,
    marginBottom: 4,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  editorTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  lineCount: {
    fontSize: 11,
  },
  editorScroll: {
    flex: 1,
  },
  codeInput: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    lineHeight: 22,
    padding: 12,
    minHeight: 120,
  },
  outputContainer: {
    flex: 2,
    margin: 8,
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  outputTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  outputCount: {
    fontSize: 11,
  },
  outputScroll: {
    flex: 1,
  },
  outputContent: {
    padding: 10,
  },
  outputPlaceholder: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    fontStyle: 'italic',
    paddingVertical: 8,
  },
  outputLine: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginBottom: 2,
  },
  outputText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    lineHeight: 20,
  },
});

export default JSCompilerScreen;
