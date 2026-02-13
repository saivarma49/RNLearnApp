import { TopicSection } from '../types';

export const reactNativeSections: TopicSection[] = [
  {
    title: 'Core Components',
    category: 'Core Components',
    data: [
      {
        id: 'rn_view',
        title: 'View',
        summary: 'The fundamental building block for UI layout',
        difficulty: 'Beginner',
        definition:
          'View is the most fundamental component for building a UI. It is a container that supports layout with flexbox, style, touch handling, and accessibility controls. View maps directly to the native view equivalent on each platform.',
        realWorldAnalogy:
          'Think of View like a cardboard box. You can put things inside it, stack boxes together, and arrange them however you want. Each box can have its own size, color, and position.',
        syntax: '<View style={styles.container}>\n  {/* children */}\n</View>',
        example: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewExample = () => (
  <View style={styles.container}>
    <View style={styles.row}>
      <View style={[styles.box, { backgroundColor: '#3498db' }]} />
      <View style={[styles.box, { backgroundColor: '#e74c3c' }]} />
      <View style={[styles.box, { backgroundColor: '#2ecc71' }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-around' },
  box: { width: 80, height: 80, borderRadius: 12 },
});

export default ViewExample;`,
        outputExplanation:
          'Renders three colored boxes in a horizontal row, evenly spaced. The parent View centers everything vertically.',
        interviewQuestions: [
          'What is the difference between View and SafeAreaView?',
          'How does flexbox work differently in React Native vs CSS?',
          'Can View handle touch events directly?',
        ],
        commonMistakes: [
          'Forgetting to set flex: 1 on the root View causing nothing to render',
          'Using percentage-based width without a parent having a defined size',
          'Not wrapping text in a <Text> component inside View',
        ],
        performanceTips: [
          'Use removeClippedSubviews for Views with many off-screen children',
          'Avoid unnecessary nesting of Views',
          'Use collapsable={false} only when needed for native view hierarchy',
        ],
      },
      {
        id: 'rn_text',
        title: 'Text',
        summary: 'Display and style text content',
        difficulty: 'Beginner',
        definition:
          'Text is a React component for displaying text. It supports nesting, styling, and touch handling. All text must be wrapped in a <Text> component — you cannot place raw strings inside <View>.',
        realWorldAnalogy:
          'Text is like a label maker. You type your text, pick a font and size, and stick it wherever you need it. You can even put labels inside labels for different styling.',
        syntax: '<Text style={styles.text}>Hello World</Text>',
        example: `import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextExample = () => (
  <Text style={styles.paragraph}>
    Learn <Text style={styles.bold}>React Native</Text> with{' '}
    <Text style={styles.highlight}>AI-powered</Text> tutorials.
  </Text>
);

const styles = StyleSheet.create({
  paragraph: { fontSize: 18, lineHeight: 28, color: '#333' },
  bold: { fontWeight: 'bold' },
  highlight: { color: '#6C63FF', fontWeight: '600' },
});

export default TextExample;`,
        outputExplanation:
          'Renders a paragraph with mixed styling — "React Native" appears bold and "AI-powered" appears in purple.',
        interviewQuestions: [
          'How does text nesting work in React Native?',
          'What happens if you put text directly in a View without a Text component?',
          'How do you handle text truncation and numberOfLines?',
        ],
        commonMistakes: [
          'Placing raw strings inside View instead of Text',
          'Using web CSS properties like text-decoration instead of textDecorationLine',
          'Not handling dynamic font scaling for accessibility',
        ],
        performanceTips: [
          'Use allowFontScaling={false} only when absolutely necessary',
          'Prefer numberOfLines with ellipsizeMode for long text',
          'Avoid re-rendering Text with frequently changing content',
        ],
      },
      {
        id: 'rn_flatlist',
        title: 'FlatList',
        summary: 'Performant scrollable list component',
        difficulty: 'Intermediate',
        definition:
          'FlatList is a performant interface for rendering large lists. Unlike ScrollView which renders all children at once, FlatList only renders items visible on screen using a windowing technique, making it memory efficient.',
        realWorldAnalogy:
          'Imagine a conveyor belt at a sushi restaurant. You only see a few plates at a time, but more appear as others pass by. FlatList works the same way — it only "prepares" the items you can currently see.',
        syntax: `<FlatList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  keyExtractor={(item) => item.id}
/>`,
        example: `import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

interface User { id: string; name: string; role: string; }

const USERS: User[] = [
  { id: '1', name: 'Alice', role: 'Developer' },
  { id: '2', name: 'Bob', role: 'Designer' },
  { id: '3', name: 'Charlie', role: 'PM' },
];

const UserList = () => (
  <FlatList
    data={USERS}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
    )}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
);

const styles = StyleSheet.create({
  card: { padding: 16 },
  name: { fontSize: 18, fontWeight: 'bold' },
  role: { fontSize: 14, color: '#666', marginTop: 4 },
  separator: { height: 1, backgroundColor: '#E5E7EB' },
});

export default UserList;`,
        outputExplanation:
          'Renders a scrollable list of user cards with name and role, separated by thin lines.',
        interviewQuestions: [
          'What is the difference between FlatList and ScrollView?',
          'How would you optimize FlatList for 10,000+ items?',
          'Explain getItemLayout and when to use it.',
        ],
        commonMistakes: [
          'Not providing a unique keyExtractor causing rendering bugs',
          'Creating new function references in renderItem on each render',
          'Wrapping FlatList in a ScrollView causing gesture conflicts',
        ],
        performanceTips: [
          'Use getItemLayout when items have fixed heights',
          'Set windowSize to a smaller value for memory optimization',
          'Use React.memo on renderItem components',
          'Set maxToRenderPerBatch and updateCellsBatchingPeriod for smooth scrolling',
        ],
      },
      {
        id: 'rn_image',
        title: 'Image',
        summary: 'Display images from various sources',
        difficulty: 'Beginner',
        definition:
          'Image is a React Native component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk (camera roll).',
        syntax: `<Image source={{ uri: 'https://...' }} style={{ width: 200, height: 200 }} />
<Image source={require('./local-image.png')} />`,
        example: `import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const ImageExample = () => (
  <View style={styles.container}>
    <Image
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
      style={styles.image}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 200, height: 200, borderRadius: 16 },
});

export default ImageExample;`,
        outputExplanation: 'Displays a centered image loaded from a URL with rounded corners.',
        interviewQuestions: [
          'What are the different resizeMode options?',
          'How do you handle image caching in React Native?',
          'What is the difference between static and network images?',
        ],
        commonMistakes: [
          'Not specifying width and height for network images',
          'Using large unoptimized images causing memory issues',
          'Forgetting to add NSAppTransportSecurity for HTTP images on iOS',
        ],
        performanceTips: [
          'Use libraries like react-native-fast-image for better caching',
          'Resize images server-side to the exact dimensions needed',
          'Use progressive loading for large images',
        ],
      },
      {
        id: 'rn_textinput',
        title: 'TextInput',
        summary: 'Input field for user text entry',
        difficulty: 'Beginner',
        definition:
          'TextInput is a core component that allows the user to enter text. It has an onChangeText event for reading input and supports features like auto-correction, auto-capitalization, placeholder text, and different keyboard types.',
        syntax: `<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Type here..."
/>`,
        example: `import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const SearchInput = () => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search topics..."
        placeholderTextColor="#999"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      {query.length > 0 && (
        <Text style={styles.result}>Searching for: {query}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    height: 48, borderWidth: 1, borderColor: '#DDD',
    borderRadius: 12, paddingHorizontal: 16, fontSize: 16,
  },
  result: { marginTop: 12, fontSize: 14, color: '#666' },
});

export default SearchInput;`,
        outputExplanation:
          'Renders a styled text input that shows the current search query below as the user types.',
        interviewQuestions: [
          'How do you handle form validation with TextInput?',
          'What is the difference between controlled and uncontrolled TextInput?',
          'How do you dismiss the keyboard programmatically?',
        ],
        commonMistakes: [
          'Not using controlled components (missing value prop)',
          'Keyboard covering the input - not using KeyboardAvoidingView',
          'Not setting proper keyboardType for numeric/email inputs',
        ],
        performanceTips: [
          'Debounce onChangeText for search inputs',
          'Use defaultValue instead of value for uncontrolled inputs',
          'Avoid re-rendering parent on every keystroke',
        ],
      },
    ],
  },
  {
    title: 'Hooks',
    category: 'Hooks',
    data: [
      {
        id: 'rn_usestate',
        title: 'useState',
        summary: 'Add local state to functional components',
        difficulty: 'Beginner',
        definition:
          'useState is a Hook that lets you add React state to function components. It returns a stateful value and a function to update it. During re-renders, the state value persists.',
        realWorldAnalogy:
          'Think of useState like a whiteboard in a meeting room. You write something on it (set state), and it stays there until someone erases and writes something new (next setState call).',
        syntax: 'const [state, setState] = useState<Type>(initialValue);',
        example: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(prev => prev - 1)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(prev => prev + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 40 },
  count: { fontSize: 48, fontWeight: 'bold', marginBottom: 20 },
  buttons: { flexDirection: 'row', gap: 20 },
  button: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#6C63FF', justifyContent: 'center', alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
});

export default Counter;`,
        outputExplanation:
          'Renders a counter display with + and - buttons. Tapping buttons updates the count using functional updater pattern.',
        interviewQuestions: [
          'Why should you use the functional updater form of setState?',
          'What happens if you call setState multiple times in the same function?',
          'How does useState differ from useReducer?',
        ],
        commonMistakes: [
          'Mutating state directly instead of creating a new reference',
          'Not using functional updates when new state depends on previous state',
          'Putting complex objects in state without considering referential equality',
        ],
        performanceTips: [
          'Use lazy initialization for expensive initial values: useState(() => compute())',
          'Split state into multiple useState calls rather than one large object',
          'Consider useReducer for complex state logic',
        ],
      },
      {
        id: 'rn_useeffect',
        title: 'useEffect',
        summary: 'Handle side effects in components',
        difficulty: 'Intermediate',
        definition:
          'useEffect lets you synchronize a component with an external system. It runs after render and can optionally clean up. Common uses include API calls, subscriptions, timers, and DOM manipulation.',
        realWorldAnalogy:
          'useEffect is like a personal assistant who watches for specific events. "When I arrive at work (mount), start the coffee machine. When I leave (unmount), turn it off. When my schedule changes (dependency update), adjust the thermostat."',
        syntax: `useEffect(() => {
  // effect logic
  return () => { /* cleanup */ };
}, [dependencies]);`,
        example: `import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const DataFetcher = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const json = await response.json();
        if (!cancelled) {
          setData(json.title);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { fontSize: 18 },
});

export default DataFetcher;`,
        outputExplanation:
          'Shows a loading spinner while fetching data, then displays the result. The cleanup function prevents setting state on an unmounted component.',
        interviewQuestions: [
          'What is the cleanup function in useEffect and when does it run?',
          'What is the difference between an empty dependency array and no array?',
          'How do you prevent race conditions in useEffect with async calls?',
        ],
        commonMistakes: [
          'Missing dependencies in the dependency array causing stale closures',
          'Creating infinite loops by updating state that is in the dependency array',
          'Not cleaning up subscriptions and timers causing memory leaks',
        ],
        performanceTips: [
          'Keep effects focused — one effect per concern',
          'Use AbortController for cancellable fetch requests',
          'Move functions inside useEffect if they are only used there',
        ],
      },
      {
        id: 'rn_usememo',
        title: 'useMemo',
        summary: 'Memoize expensive computations',
        difficulty: 'Advanced',
        definition:
          'useMemo returns a memoized value. It only recalculates the value when one of its dependencies changes. This is useful for optimizing expensive calculations that don\'t need to run on every render.',
        syntax: 'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);',
        example: `import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';

interface Item { id: string; name: string; category: string; }

const items: Item[] = Array.from({ length: 1000 }, (_, i) => ({
  id: String(i),
  name: \`Item \${i}\`,
  category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C',
}));

const FilteredList = () => {
  const [filter, setFilter] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={filter}
        onChangeText={setFilter}
        placeholder="Filter items..."
      />
      <Text style={styles.count}>{filteredItems.length} items</Text>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { height: 44, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, paddingHorizontal: 12, marginBottom: 8 },
  count: { fontSize: 14, color: '#666', marginBottom: 8 },
  item: { padding: 12, fontSize: 16 },
});

export default FilteredList;`,
        outputExplanation:
          'Renders a searchable list of 1000 items. useMemo ensures the filter operation only re-runs when the filter text changes, not on every render.',
        interviewQuestions: [
          'When should you NOT use useMemo?',
          'What is the difference between useMemo and useCallback?',
          'How does React decide to recalculate a memoized value?',
        ],
        commonMistakes: [
          'Overusing useMemo for trivial calculations where the overhead is not worth it',
          'Forgetting that useMemo runs during rendering, not before it',
          'Not including all dependencies in the array',
        ],
        performanceTips: [
          'Profile before optimizing — don\'t add useMemo everywhere',
          'Use it for filtering/sorting large arrays or complex calculations',
          'Combine with React.memo on child components for full optimization',
        ],
      },
      {
        id: 'rn_usecallback',
        title: 'useCallback',
        summary: 'Memoize callback functions',
        difficulty: 'Advanced',
        definition:
          'useCallback returns a memoized version of the callback that only changes if one of its dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality.',
        syntax: 'const memoizedFn = useCallback(() => { doSomething(a, b); }, [a, b]);',
        example: `import React, { useState, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExpensiveChild = memo(({ onPress, label }: { onPress: () => void; label: string }) => {
  console.log(\`Rendering: \${label}\`);
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
});

const ParentComponent = () => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const incrementA = useCallback(() => setCountA(prev => prev + 1), []);
  const incrementB = useCallback(() => setCountB(prev => prev + 1), []);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>A: {countA} | B: {countB}</Text>
      <ExpensiveChild onPress={incrementA} label="Increment A" />
      <ExpensiveChild onPress={incrementB} label="Increment B" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  count: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#6C63FF', padding: 16, borderRadius: 12, marginVertical: 8, width: 200, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

export default ParentComponent;`,
        outputExplanation:
          'Only the child whose callback dependency changed re-renders. Clicking "Increment A" only re-renders that button, not "Increment B".',
        interviewQuestions: [
          'When is useCallback actually necessary?',
          'How does useCallback work together with React.memo?',
          'Can useCallback cause harm if misused?',
        ],
        commonMistakes: [
          'Using useCallback without React.memo on the child — no benefit',
          'Adding too many dependencies, causing it to regenerate frequently',
          'Using it for inline event handlers that don\'t get passed to children',
        ],
        performanceTips: [
          'Only use with memoized children (React.memo or PureComponent)',
          'Prefer useCallback when callbacks are passed as props to lists',
          'Profile to confirm the optimization actually helps',
        ],
      },
      {
        id: 'rn_useref',
        title: 'useRef',
        summary: 'Access DOM nodes and persist values',
        difficulty: 'Intermediate',
        definition:
          'useRef returns a mutable ref object whose .current property is initialized to the passed argument. The ref persists across renders without causing re-renders when updated. Commonly used for accessing native components and storing mutable values.',
        syntax: 'const ref = useRef<Type>(initialValue);',
        example: `import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FocusExample = () => {
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Tap the button to focus me"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => inputRef.current?.focus()}>
        <Text style={styles.buttonText}>Focus Input</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { height: 48, borderWidth: 1, borderColor: '#DDD', borderRadius: 12, paddingHorizontal: 16, fontSize: 16, marginBottom: 16 },
  button: { backgroundColor: '#6C63FF', padding: 14, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

export default FocusExample;`,
        outputExplanation:
          'Renders an input and a button. Pressing the button programmatically focuses the text input using the ref.',
        interviewQuestions: [
          'What is the difference between useRef and useState for storing values?',
          'When would you use useRef instead of creating a variable outside the component?',
          'How do you type useRef with TypeScript for different element types?',
        ],
        commonMistakes: [
          'Expecting a re-render when updating ref.current — it won\'t trigger one',
          'Using refs to store values that should be in state',
          'Not checking if ref.current is null before accessing it',
        ],
        performanceTips: [
          'Use refs for values that change frequently but don\'t need re-renders (scroll position, timers)',
          'Use callback refs for dynamic ref attachment',
          'Prefer useRef over global variables for component-scoped values',
        ],
      },
      {
        id: 'rn_usecontext',
        title: 'useContext',
        summary: 'Consume context values without nesting',
        difficulty: 'Intermediate',
        definition:
          'useContext accepts a context object and returns the current context value. It replaces the Context.Consumer pattern, providing a cleaner way to access shared data like themes, authentication, and localization across the component tree without prop drilling.',
        realWorldAnalogy:
          'Context is like a radio broadcast. The Provider is the radio station that broadcasts a signal (data). useContext is the radio receiver in each room (component) — any room can tune in without running cables (prop drilling).',
        syntax: `const ThemeContext = createContext('light');
// In a child component:
const theme = useContext(ThemeContext);`,
        example: `import React, { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ThemeContext = createContext({ dark: false, toggle: () => {} });

const ThemedButton = () => {
  const { dark, toggle } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: dark ? '#333' : '#6C63FF' }]}
      onPress={toggle}
    >
      <Text style={styles.btnText}>
        Current: {dark ? 'Dark' : 'Light'} — Tap to toggle
      </Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [dark, setDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      <View style={[styles.container, { backgroundColor: dark ? '#111' : '#FFF' }]}>
        <ThemedButton />
      </View>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  btn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});

export default App;`,
        outputExplanation:
          'ThemedButton reads the theme context directly using useContext. Tapping the button toggles dark/light mode without prop drilling.',
        interviewQuestions: [
          'What problem does Context solve?',
          'When should you use Context vs a state management library?',
          'What causes re-renders with useContext?',
        ],
        commonMistakes: [
          'Putting too much state in a single context, causing all consumers to re-render',
          'Not wrapping the component tree with the Provider',
          'Using Context for frequently changing values like scroll position or input text',
        ],
        performanceTips: [
          'Split contexts: separate static config (theme) from dynamic data (user)',
          'Memoize the context value to prevent unnecessary re-renders',
          'Use Zustand/Jotai for frequently changing global state instead of Context',
        ],
      },
      {
        id: 'rn_usereducer',
        title: 'useReducer',
        summary: 'Manage complex state with a reducer',
        difficulty: 'Intermediate',
        definition:
          'useReducer is an alternative to useState for managing complex state logic. It uses a reducer function that receives the current state and an action, and returns the new state. It is similar to Redux but built into React.',
        realWorldAnalogy:
          'useReducer is like a vending machine. You put in a coin and press a button (dispatch an action). The machine\'s internal mechanism (reducer) processes your selection and drops the right item (new state). You never reach inside the machine directly.',
        syntax: `const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    default: return state;
  }
}`,
        example: `import React, { useReducer } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type State = { count: number; step: number };
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; payload: number };

const initialState: State = { count: 0, step: 1 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step };
    case 'decrement': return { ...state, count: state.count - state.step };
    case 'reset': return initialState;
    case 'setStep': return { ...state, step: action.payload };
    default: return state;
  }
}

const CounterReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{state.count}</Text>
      <Text style={styles.step}>Step: {state.step}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => dispatch({ type: 'decrement' })}>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => dispatch({ type: 'reset' })}>
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => dispatch({ type: 'increment' })}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 40 },
  count: { fontSize: 48, fontWeight: 'bold', marginBottom: 8 },
  step: { fontSize: 14, color: '#666', marginBottom: 20 },
  row: { flexDirection: 'row', gap: 12 },
  btn: { backgroundColor: '#6C63FF', padding: 16, borderRadius: 12, minWidth: 60, alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default CounterReducer;`,
        outputExplanation:
          'A counter with increment, decrement, and reset actions managed by a reducer. The step value controls how much the count changes.',
        interviewQuestions: [
          'When should you use useReducer instead of useState?',
          'How does useReducer compare to Redux?',
          'Can you combine useReducer with useContext for global state?',
        ],
        commonMistakes: [
          'Mutating state inside the reducer instead of returning a new object',
          'Forgetting to handle the default case in the switch statement',
          'Overcomplicating simple state that useState handles fine',
        ],
        performanceTips: [
          'useReducer is preferred when next state depends on the previous state',
          'Dispatch is stable across renders — no need to wrap with useCallback',
          'Use it with useContext to create a lightweight Redux alternative',
        ],
      },
      {
        id: 'rn_uselayouteffect',
        title: 'useLayoutEffect',
        summary: 'Run effects synchronously after DOM mutations',
        difficulty: 'Advanced',
        definition:
          'useLayoutEffect fires synchronously after all DOM mutations but before the browser paints. Use it when you need to measure layout or make visible DOM changes that must happen before the user sees the update. For most cases, useEffect is preferred.',
        syntax: `useLayoutEffect(() => {
  // Runs synchronously before paint
  const { width, height } = ref.current.measure();
}, [dependencies]);`,
        example: `import React, { useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MeasureExample = () => {
  const viewRef = useRef<View>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height) => {
        setDimensions({ width, height });
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View ref={viewRef} style={styles.measuredBox}>
        <Text style={styles.text}>Measure Me!</Text>
      </View>
      <Text style={styles.info}>
        Width: {dimensions.width.toFixed(0)}, Height: {dimensions.height.toFixed(0)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  measuredBox: {
    backgroundColor: '#6C63FF', padding: 30, borderRadius: 16,
    marginBottom: 16, alignItems: 'center',
  },
  text: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  info: { fontSize: 16, color: '#666' },
});

export default MeasureExample;`,
        outputExplanation:
          'Measures the box dimensions synchronously before the screen paints, avoiding a visual flicker that useEffect could cause.',
        interviewQuestions: [
          'What is the difference between useEffect and useLayoutEffect?',
          'When should you use useLayoutEffect?',
          'Can useLayoutEffect cause performance issues?',
        ],
        commonMistakes: [
          'Using useLayoutEffect when useEffect would work fine, blocking paint unnecessarily',
          'Running expensive operations inside useLayoutEffect causing jank',
          'Not understanding that useLayoutEffect blocks visual updates',
        ],
        performanceTips: [
          'Only use useLayoutEffect when you need to measure or mutate before paint',
          'Keep useLayoutEffect callbacks as fast as possible',
          'Prefer useEffect for the vast majority of side effects',
        ],
      },
      {
        id: 'rn_custom_hooks',
        title: 'Custom Hooks',
        summary: 'Extract and reuse stateful logic',
        difficulty: 'Intermediate',
        definition:
          'Custom Hooks let you extract component logic into reusable functions. A custom hook is a function whose name starts with "use" and that may call other hooks. They are the primary mechanism for sharing stateful logic between components.',
        realWorldAnalogy:
          'Custom hooks are like power tools. Instead of building every piece of furniture from scratch with raw materials, you create reusable tools (hooks) that encapsulate common tasks — a drill for making holes, a sander for smoothing surfaces.',
        syntax: `function useCustomHook(param) {
  const [state, setState] = useState(initial);
  useEffect(() => { /* logic */ }, [param]);
  return { state, actions };
}`,
        example: `import { useState, useEffect } from 'react';

// Custom hook for fetch with loading/error states
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(json => { if (!cancelled) setData(json); })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Custom hook for toggle
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(v => !v);
  return [value, toggle] as const;
}

// Usage:
// const { data, loading, error } = useFetch('/api/users');
// const [isOpen, toggleOpen] = useToggle();`,
        outputExplanation:
          'Two reusable custom hooks: useFetch handles API calls with loading/error states, useToggle manages boolean state with a toggle function.',
        interviewQuestions: [
          'What are the rules of hooks?',
          'How do custom hooks share logic without sharing state?',
          'Give an example of a custom hook you have built in a real project.',
        ],
        commonMistakes: [
          'Forgetting to start the hook name with "use" — linting rules will not detect violations',
          'Calling hooks inside conditionals or loops',
          'Not handling cleanup in custom hooks that set up subscriptions',
        ],
        performanceTips: [
          'Return stable references using useCallback and useMemo',
          'Keep custom hooks focused on a single responsibility',
          'Use TypeScript generics for reusable, type-safe hooks',
        ],
      },
    ],
  },
  {
    title: 'APIs & Platform',
    category: 'APIs',
    data: [
      {
        id: 'rn_asyncstorage',
        title: 'AsyncStorage',
        summary: 'Persistent key-value storage',
        difficulty: 'Beginner',
        definition:
          'AsyncStorage is an unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage. It is ideal for storing small amounts of data like user preferences, tokens, and app state.',
        syntax: `await AsyncStorage.setItem('key', 'value');
const value = await AsyncStorage.getItem('key');`,
        example: `import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('theme').then(value => {
      if (value) setIsDark(value === 'dark');
    });
  }, []);

  const toggle = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a2e' : '#f5f5f5' }]}>
      <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 20 }}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={toggle}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { marginTop: 20, backgroundColor: '#6C63FF', padding: 14, borderRadius: 12 },
  buttonText: { color: '#FFF', fontWeight: '600' },
});

export default ThemeToggle;`,
        outputExplanation:
          'A toggle that switches between light and dark themes, persisting the user\'s preference across app restarts using AsyncStorage.',
        interviewQuestions: [
          'What are the limitations of AsyncStorage?',
          'When should you use AsyncStorage vs a proper database?',
          'How do you store complex objects in AsyncStorage?',
        ],
        commonMistakes: [
          'Storing large amounts of data — AsyncStorage is for small data only',
          'Not handling errors from async operations',
          'Storing sensitive data without encryption',
        ],
        performanceTips: [
          'Batch multiple operations with multiSet/multiGet',
          'Use a wrapper library like MMKV for better performance',
          'Cache frequently accessed values in memory',
        ],
      },
      {
        id: 'rn_navigation',
        title: 'React Navigation',
        summary: 'Screen navigation and routing',
        difficulty: 'Intermediate',
        definition:
          'React Navigation is the standard navigation library for React Native. It provides Stack, Tab, and Drawer navigators. It handles the navigation state, transitions, and gestures across different screens.',
        syntax: `const Stack = createNativeStackNavigator();
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
</Stack.Navigator>`,
        example: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;`,
        outputExplanation:
          'Sets up a navigation structure with bottom tabs nested inside a stack navigator — the standard pattern for production apps.',
        interviewQuestions: [
          'How do you pass parameters between screens?',
          'What is the difference between Stack and Native Stack navigator?',
          'How do you implement deep linking with React Navigation?',
        ],
        commonMistakes: [
          'Not installing required peer dependencies (screens, safe-area-context, gesture-handler)',
          'Wrapping NavigationContainer more than once',
          'Not typing navigation params with TypeScript',
        ],
        performanceTips: [
          'Use native stack navigator over JS-based stack for better performance',
          'Lazy load screens using React.lazy or dynamic imports',
          'Minimize re-renders in screen components',
        ],
      },
    ],
  },
  {
    title: 'Performance',
    category: 'Performance',
    data: [
      {
        id: 'rn_memo',
        title: 'React.memo',
        summary: 'Prevent unnecessary re-renders',
        difficulty: 'Advanced',
        definition:
          'React.memo is a higher order component that memoizes a component. If the props haven\'t changed, React will skip rendering the component and reuse the last rendered result. This is React\'s primary tool for preventing unnecessary re-renders in functional components.',
        syntax: 'const MemoizedComponent = React.memo(MyComponent);',
        example: `import React, { useState, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListItem = memo(({ title, onPress }: { title: string; onPress: () => void }) => {
  console.log('Rendering:', title);
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
  );
});

const MemoExample = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Count: {count}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setCount(c => c + 1)}>
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
      {/* ListItem won't re-render when count changes */}
      <ListItem title="Static Item" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  count: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  button: { backgroundColor: '#6C63FF', padding: 14, borderRadius: 12, marginBottom: 16, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: '600' },
  item: { padding: 16, backgroundColor: '#F0F0F0', borderRadius: 8 },
  itemText: { fontSize: 16 },
});

export default MemoExample;`,
        outputExplanation:
          'When you tap Increment, only the count text re-renders. The ListItem is memoized and won\'t re-render since its props haven\'t changed.',
        interviewQuestions: [
          'When should you use React.memo and when should you avoid it?',
          'How does React.memo\'s shallow comparison work with objects and arrays?',
          'Can you provide a custom comparison function to React.memo?',
        ],
        commonMistakes: [
          'Memoizing components that receive new object/array props on every render',
          'Using React.memo on components that always receive different props',
          'Not combining with useCallback for function props',
        ],
        performanceTips: [
          'Use React DevTools Profiler to identify components that re-render unnecessarily',
          'Combine React.memo with useCallback and useMemo for full optimization',
          'Consider moving state down closer to where it\'s used instead of memoizing',
        ],
      },
    ],
  },
  {
    title: 'Architecture',
    category: 'Architecture',
    data: [
      {
        id: 'rn_state_management',
        title: 'State Management',
        summary: 'Patterns for managing app state',
        difficulty: 'Advanced',
        definition:
          'State management refers to how you organize, share, and update state across your application. Options in React Native include useState (local), Context API (moderate sharing), and external libraries like Zustand, Redux, or Jotai (global state).',
        syntax: `// Zustand store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));`,
        example: `import { create } from 'zustand';

interface BearStore {
  bears: number;
  increase: () => void;
  reset: () => void;
}

const useBearStore = create<BearStore>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  reset: () => set({ bears: 0 }),
}));

// Usage in component:
// const { bears, increase } = useBearStore();`,
        outputExplanation:
          'Creates a Zustand store with a bears counter. Components can subscribe to specific slices of state, and only re-render when their subscribed values change.',
        interviewQuestions: [
          'Compare Context API vs Zustand vs Redux for React Native.',
          'When would you choose each state management solution?',
          'How do you handle server state vs client state?',
        ],
        commonMistakes: [
          'Putting all state in a global store instead of keeping it local when possible',
          'Using Context for frequently changing values causing unnecessary re-renders',
          'Not normalizing data in global state stores',
        ],
        performanceTips: [
          'Use selectors to subscribe to only the state you need',
          'Keep server state separate using React Query or SWR',
          'Prefer local state and lift up only when needed',
        ],
      },
    ],
  },
  {
    title: 'Native Bridge & Architecture',
    category: 'Architecture',
    data: [
      {
        id: 'rn_native_modules',
        title: 'Native Modules',
        summary: 'Call native APIs from JavaScript',
        difficulty: 'Advanced',
        definition:
          'Native Modules allow you to write custom native code (Java/Kotlin for Android, Objective-C/Swift for iOS) and expose it to JavaScript. This is used when you need access to platform-specific APIs that aren\'t available in the core library.',
        realWorldAnalogy:
          'Think of Native Modules as a translator. Your JavaScript code speaks English, but the phone\'s hardware only speaks Native. The Native Module translates your JS commands into native instructions that the hardware understands.',
        syntax: `// Android (Java)
public class MyModule extends ReactContextBaseJavaModule { ... }

// iOS (Swift)
@objc(MyModule) class MyModule: NSObject { ... }

// JS Usage
import { NativeModules } from 'react-native';
const { MyModule } = NativeModules;`,
        example: `import React from 'react';
import { View, Text, TouchableOpacity, NativeModules, StyleSheet } from 'react-native';

const { CalendarModule } = NativeModules;

const NativeModuleExample = () => {
  const onPress = () => {
    CalendarModule.createCalendarEvent('Bridge Lesson', 'React Native Hub');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Create Calendar Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#6C63FF', padding: 16, borderRadius: 12 },
  text: { color: '#FFF', fontWeight: 'bold' },
});

export default NativeModuleExample;`,
        outputExplanation:
          'When the button is pressed, it calls a method on a custom native module that interacts with the device calendar API.',
        interviewQuestions: [
          'What is the difference between Native Modules and Native Components?',
          'How do you handle asynchronous responses from Native Modules?',
          'What is RCT_EXPORT_METHOD in iOS?',
        ],
        commonMistakes: [
          'Forgetting to register the module in the native package (Android)',
          'Not using @objc and @objcMembers for Swift classes',
          'Blocking the main UI thread with heavy operations in native code',
        ],
        performanceTips: [
          'Pass small amounts of data across the bridge',
          'Avoid frequent calls to native methods in loops',
          'Use events (RCTDeviceEventEmitter) for continuous data streams',
        ],
      },
      {
        id: 'rn_new_architecture',
        title: 'New Architecture (JSI & Fabric)',
        summary: 'The future of React Native performance',
        difficulty: 'Advanced',
        definition:
          'The New Architecture replaces the legacy Bridge with JSI (JavaScript Interface). It allows direct synchronous communication between JS and Native blocks, enabling features like synchronous layout and better integration with concurrency.',
        realWorldAnalogy:
          'The legacy Bridge was like sending a letter through the mail — you had to wait for it to be processed and delivered. JSI is like a direct telephone line — you can talk to the other side instantly without waiting.',
        syntax: `// JSI allows JS to hold a reference to C++ host objects
// and call methods on them directly.`,
        example: `// Example of TurboModules (New Architecture)
// 1. Define specs in TypeScript (Codegen)
interface Spec extends TurboModule {
  getConstants(): {};
  add(a: number, b: number): Promise<number>;
}

// 2. JS Usage
import MyTurboModule from './MyTurboModule';
const result = await MyTurboModule.add(1, 2);`,
        outputExplanation:
          'TurboModules provide a more efficient way to load native modules, while Fabric improves UI rendering performance by using a shared C++ core.',
        interviewQuestions: [
          'What are the key pillars of the New Architecture?',
          'How does JSI differ from the legacy Bridge?',
          'What is Codegen and why is it needed?',
        ],
        commonMistakes: [
          'Thinking the New Architecture is just a performance boost (it\'s a total rewrite)',
          'Mixing legacy and new architecture in ways that cause conflict',
          'Not using Codegen to generate the necessary native glue code',
        ],
        performanceTips: [
          'Enable the New Architecture in gradle.properties and Podfile',
          'Migrate expensive UI components to Fabric',
          'Use TurboModules to reduce app startup time',
        ],
      },
    ],
  },
  {
    title: 'UI Enhancement',
    category: 'Core Components',
    data: [
      {
        id: 'rn_animated',
        title: 'Animated API',
        summary: 'Fluid and powerful animations',
        difficulty: 'Advanced',
        definition:
          'The Animated library is designed to make animations fluid, powerful, and easy to build and maintain. It focuses on declarative relationships between inputs and outputs, with configurable transforms in between, and start/stop methods to control time-based execution.',
        realWorldAnalogy:
          'Think of the Animated API as a puppeteer. You define the strings (Animated.Value) and how they connect to the puppet (Animated.View). When you pull a string, the puppet moves in exactly the way you programmed it.',
        syntax: `const fadeAnim = useRef(new Animated.Value(0)).current;
Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();`,
        example: `import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const FadeInView = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...styles.fadingContainer, opacity: fadeAnim }}>
      <Text style={styles.fadingText}>Fading In</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fadingContainer: { padding: 20, backgroundColor: 'powderblue' },
  fadingText: { fontSize: 28 },
});

export default FadeInView;`,
        outputExplanation:
          'The view starts with 0 opacity and smoothly fades in to full opacity over 3 seconds when the component mounts.',
        interviewQuestions: [
          'What is useNativeDriver and why should you use it?',
          'How do you chain multiple animations together?',
          'What is the difference between Animated.timing and Animated.spring?',
        ],
        commonMistakes: [
          'Forgetting to call .start() on the animation',
          'Not using useNativeDriver for performance-critical animations',
          'Animating non-layout properties without the native driver support',
        ],
        performanceTips: [
          'Always set useNativeDriver: true whenever possible (opacity, transform)',
          'Avoid animating properties that trigger layout (width, height, flex)',
          'Use Animated.View/Text/Image/ScrollView for native acceleration',
        ],
      },
      {
        id: 'rn_platform',
        title: 'Platform Module',
        summary: 'Detect and handle platform differences',
        difficulty: 'Beginner',
        definition:
          'React Native provides a module that detects the platform in which the app is running. You can use the detection logic to implement platform-specific code for iOS and Android, allowing for customized headers, status bars, and UI patterns.',
        realWorldAnalogy:
          'The Platform module is like a travel adapter. It checks which country you are in (iOS or Android) and makes sure your plug fits the local socket perfectly.',
        syntax: `import { Platform } from 'react-native';
const isIOS = Platform.OS === 'ios';
const height = Platform.select({ ios: 20, android: 0 });`,
        example: `import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const PlatformSpecific = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Running on {Platform.OS}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#E5E5EA' : '#F2F2F2',
  },
  text: {
    ...Platform.select({
      ios: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Avenir',
      },
      android: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
      },
      default: {
        fontSize: 16,
      },
    }),
  },
});

export default PlatformSpecific;`,
        outputExplanation:
          'Applies different background colors and text styles based on whether the app is running on iOS or Android.',
        interviewQuestions: [
          'What is Platform.select() and how does it help with clean code?',
          'How do you handle platform-specific files in React Native?',
          'How can you check the Android API level or iOS version?',
        ],
        commonMistakes: [
          'Hardcoding values that only look good on one platform',
          'Not handling the default case in Platform.select',
          'Using Platform.OS checks everywhere instead of Platform.select',
        ],
        performanceTips: [
          'Use component.ios.js and component.android.js for major platform differences',
          'Prefer Platform.select for style and config differences',
          'Check Platform only once at the top level if possible',
        ],
      },
      {
        id: 'rn_scrollview',
        title: 'ScrollView',
        summary: 'Scrollable container for bounded content',
        difficulty: 'Beginner',
        definition:
          'ScrollView is a generic scrolling container that can hold multiple components and views. Unlike FlatList, it renders all its children at once, making it suitable for a small number of items. For long lists, use FlatList or SectionList instead.',
        realWorldAnalogy:
          'ScrollView is like a scroll of paper — everything is written on it from top to bottom, and you simply unroll it to see more content. FlatList is like a newspaper printing press that only prints the page you are reading.',
        syntax: `<ScrollView contentContainerStyle={{ padding: 16 }}>
  {/* children */}
</ScrollView>`,
        example: `import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const ScrollViewExample = () => (
  <ScrollView
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
    bounces={true}
  >
    {Array.from({ length: 20 }, (_, i) => (
      <View key={i} style={styles.card}>
        <Text style={styles.text}>Item {i + 1}</Text>
      </View>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  content: { padding: 16 },
  card: {
    backgroundColor: '#F0F0FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  text: { fontSize: 16, fontWeight: '600' },
});

export default ScrollViewExample;`,
        outputExplanation:
          'Renders 20 cards in a vertically scrollable container. All items are rendered at once in memory.',
        interviewQuestions: [
          'When should you use ScrollView vs FlatList?',
          'What is the difference between style and contentContainerStyle?',
          'How do you make a horizontal ScrollView?',
        ],
        commonMistakes: [
          'Using ScrollView for long lists — it renders everything, causing memory issues',
          'Applying layout styles to style instead of contentContainerStyle',
          'Nesting ScrollView inside another ScrollView with the same scroll direction',
        ],
        performanceTips: [
          'Use FlatList for lists with more than ~20 items',
          'Set removeClippedSubviews={true} for off-screen optimization',
          'Avoid heavy components inside ScrollView that render all at once',
        ],
      },
      {
        id: 'rn_touchable',
        title: 'TouchableOpacity & Pressable',
        summary: 'Handle touch interactions with visual feedback',
        difficulty: 'Beginner',
        definition:
          'TouchableOpacity reduces the opacity of the wrapped view on press. Pressable is the newer, more flexible API that supports hover, press-in, press-out, and long-press states with custom styling via the pressed state.',
        realWorldAnalogy:
          'TouchableOpacity is like a physical button that dims when you press it. Pressable is like a smart button that can change color, size, and shape depending on how you interact with it.',
        syntax: `<TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
  <Text>Tap Me</Text>
</TouchableOpacity>

<Pressable onPress={handlePress} style={({ pressed }) => [
  { opacity: pressed ? 0.5 : 1 }
]}>
  <Text>Tap Me</Text>
</Pressable>`,
        example: `import React from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, Alert } from 'react-native';

const TouchExample = () => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={() => Alert.alert('TouchableOpacity pressed!')}
    >
      <Text style={styles.buttonText}>TouchableOpacity</Text>
    </TouchableOpacity>

    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? '#5A52E0' : '#6C63FF' },
      ]}
      onPress={() => Alert.alert('Pressable pressed!')}
      onLongPress={() => Alert.alert('Long pressed!')}
    >
      <Text style={styles.buttonText}>Pressable</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  button: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

export default TouchExample;`,
        outputExplanation:
          'Two buttons: TouchableOpacity dims on press, while Pressable changes its background color. Pressable also supports long press.',
        interviewQuestions: [
          'What is the difference between TouchableOpacity and Pressable?',
          'Why is Pressable recommended over TouchableOpacity in new code?',
          'How does the hitSlop prop work?',
        ],
        commonMistakes: [
          'Nesting touchables causing gesture conflicts',
          'Not providing visual feedback to the user on press',
          'Using TouchableWithoutFeedback when visual feedback is expected',
        ],
        performanceTips: [
          'Use Pressable for new code — it is the modern replacement',
          'Set hitSlop to increase touch target size for small buttons',
          'Avoid wrapping large complex views in touchables',
        ],
      },
      {
        id: 'rn_modal',
        title: 'Modal',
        summary: 'Present content above the app',
        difficulty: 'Intermediate',
        definition:
          'Modal is a basic way to present content above an enclosing view. It covers the entire screen and can be animated. Modals are commonly used for alerts, pickers, forms, and detail views.',
        syntax: `<Modal visible={isVisible} animationType="slide" transparent={true}>
  <View>{/* modal content */}</View>
</Modal>`,
        example: `import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const ModalExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.openBtn}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.btnText}>Open Modal</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Hello Modal!</Text>
            <Text style={styles.body}>This is a modal dialog.</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.btnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 24,
    width: '80%', alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  body: { fontSize: 14, color: '#666', marginBottom: 20 },
  openBtn: { backgroundColor: '#6C63FF', padding: 14, borderRadius: 12 },
  closeBtn: { backgroundColor: '#EF4444', padding: 14, borderRadius: 12, width: '100%', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});

export default ModalExample;`,
        outputExplanation:
          'A button opens a slide-up modal with a semi-transparent overlay. The modal contains a title, body text, and a close button.',
        interviewQuestions: [
          'What is the difference between transparent and non-transparent modals?',
          'How do you handle the Android back button with modals?',
          'When should you use a modal vs a new screen?',
        ],
        commonMistakes: [
          'Forgetting onRequestClose on Android causing the back button to not work',
          'Not using transparent={true} when you want a custom overlay',
          'Nesting modals causing z-index and gesture issues',
        ],
        performanceTips: [
          'Avoid rendering heavy content inside a modal until it is visible',
          'Use animationType="none" for instant display when animation is not needed',
          'Consider using react-native-modal for more advanced features',
        ],
      },
      {
        id: 'rn_sectionlist',
        title: 'SectionList',
        summary: 'Performant sectioned list component',
        difficulty: 'Intermediate',
        definition:
          'SectionList is like FlatList but with support for grouped data with section headers. It is ideal for contact lists, settings screens, and any data that needs logical grouping. Like FlatList, it uses windowing for performance.',
        syntax: `<SectionList
  sections={[{ title: 'A', data: [...] }]}
  renderItem={({ item }) => <Item />}
  renderSectionHeader={({ section }) => <Header title={section.title} />}
/>`,
        example: `import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';

const DATA = [
  { title: 'Fruits', data: ['Apple', 'Banana', 'Cherry'] },
  { title: 'Veggies', data: ['Carrot', 'Peas', 'Spinach'] },
  { title: 'Drinks', data: ['Water', 'Juice', 'Tea'] },
];

const GroupedList = () => (
  <SectionList
    sections={DATA}
    keyExtractor={(item, index) => item + index}
    renderItem={({ item }) => (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    )}
    renderSectionHeader={({ section: { title } }) => (
      <Text style={styles.header}>{title}</Text>
    )}
    stickySectionHeadersEnabled
  />
);

const styles = StyleSheet.create({
  header: {
    fontSize: 16, fontWeight: 'bold', backgroundColor: '#F0F0FF',
    padding: 12, color: '#6C63FF',
  },
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  itemText: { fontSize: 15 },
});

export default GroupedList;`,
        outputExplanation:
          'Renders a grouped list with sticky section headers for Fruits, Veggies, and Drinks.',
        interviewQuestions: [
          'What is the difference between FlatList and SectionList?',
          'How do sticky section headers work?',
          'How do you handle mixed section types in SectionList?',
        ],
        commonMistakes: [
          'Using ScrollView with manual section headers instead of SectionList',
          'Not using keyExtractor causing rendering issues',
          'Forgetting that each section needs a data array property',
        ],
        performanceTips: [
          'Same optimization tips as FlatList apply (getItemLayout, windowSize, etc.)',
          'Use React.memo on section header and item components',
          'Set initialNumToRender for faster initial load',
        ],
      },
      {
        id: 'rn_activityindicator',
        title: 'ActivityIndicator',
        summary: 'Display a loading spinner',
        difficulty: 'Beginner',
        definition:
          'ActivityIndicator displays a circular loading indicator. It is the standard way to show that something is loading in a React Native app. It supports iOS and Android native spinner styles.',
        syntax: '<ActivityIndicator size="large" color="#6C63FF" />',
        example: `import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingExample = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.doneText}>Data loaded!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#666', fontSize: 14 },
  doneText: { fontSize: 18, fontWeight: 'bold', color: '#10B981' },
});

export default LoadingExample;`,
        outputExplanation:
          'Shows a spinner for 2 seconds, then displays a success message. This mimics a typical data loading pattern.',
        interviewQuestions: [
          'How do you show a loading state while fetching data?',
          'What are the available sizes for ActivityIndicator?',
          'How do you create a custom loading component?',
        ],
        commonMistakes: [
          'Not showing any loading state causing the user to think the app froze',
          'Using a large spinner for small inline areas',
          'Not clearing timeouts on unmount causing state updates on unmounted components',
        ],
        performanceTips: [
          'Use skeleton screens instead of spinners for better perceived performance',
          'Show loading immediately, do not wait for a delay',
          'Consider using Suspense for code-split loading states',
        ],
      },
      {
        id: 'rn_alert',
        title: 'Alert API',
        summary: 'Show native alert dialogs',
        difficulty: 'Beginner',
        definition:
          'Alert launches a native alert dialog with a title, message, and action buttons. On iOS it can show up to 3 buttons. On Android, it supports neutral, negative, and positive buttons. For custom styled dialogs, use Modal instead.',
        syntax: `Alert.alert('Title', 'Message', [
  { text: 'Cancel', style: 'cancel' },
  { text: 'OK', onPress: () => handleOK() },
]);`,
        example: `import React from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

const AlertExample = () => {
  const showSimple = () => Alert.alert('Hello!', 'This is a simple alert.');

  const showConfirm = () => Alert.alert(
    'Delete Item',
    'Are you sure you want to delete this item? This cannot be undone.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => console.log('Deleted') },
    ]
  );

  const showThreeBtn = () => Alert.alert(
    'Save Changes?',
    'You have unsaved changes.',
    [
      { text: 'Discard', style: 'destructive' },
      { text: 'Cancel', style: 'cancel' },
      { text: 'Save', onPress: () => console.log('Saved') },
    ]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={showSimple}>
        <Text style={styles.text}>Simple Alert</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={showConfirm}>
        <Text style={styles.text}>Confirm Dialog</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={showThreeBtn}>
        <Text style={styles.text}>Three Button Alert</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  btn: { backgroundColor: '#6C63FF', padding: 14, borderRadius: 12, alignItems: 'center' },
  text: { color: '#FFF', fontWeight: '700' },
});

export default AlertExample;`,
        outputExplanation:
          'Three buttons that trigger different alert styles: simple info, confirm/cancel, and three-button with save/discard/cancel.',
        interviewQuestions: [
          'How does Alert.alert differ on iOS vs Android?',
          'How do you create a custom styled alert in React Native?',
          'What is the maximum number of buttons in Alert?',
        ],
        commonMistakes: [
          'Using Alert for complex interactions — use Modal instead',
          'Not providing a cancel button for destructive actions',
          'Expecting Alert.prompt to work on Android (iOS only)',
        ],
        performanceTips: [
          'Alert is a native API — it is always performant',
          'Use Alert only for simple decisions, not complex forms',
          'Consider using a custom modal library for consistent cross-platform alerts',
        ],
      },
      {
        id: 'rn_linking',
        title: 'Linking API',
        summary: 'Open URLs and handle deep links',
        difficulty: 'Intermediate',
        definition:
          'The Linking API provides a way to interact with incoming and outgoing app links. It can open external URLs (websites, email, phone), and handle deep linking into your app from other apps or URLs.',
        syntax: `import { Linking } from 'react-native';
Linking.openURL('https://example.com');
Linking.canOpenURL('tel:1234567890');`,
        example: `import React from 'react';
import { View, TouchableOpacity, Text, Linking, Alert, StyleSheet } from 'react-native';

const LinkingExample = () => {
  const openURL = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open this URL: ' + url);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => openURL('https://reactnative.dev')}
      >
        <Text style={styles.text}>Open Website</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => openURL('mailto:support@example.com')}
      >
        <Text style={styles.text}>Send Email</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => openURL('tel:+1234567890')}
      >
        <Text style={styles.text}>Make Phone Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  btn: { backgroundColor: '#6C63FF', padding: 14, borderRadius: 12, alignItems: 'center' },
  text: { color: '#FFF', fontWeight: '700' },
});

export default LinkingExample;`,
        outputExplanation:
          'Three buttons that open a website, compose an email, and initiate a phone call using the Linking API.',
        interviewQuestions: [
          'How do you handle deep links in React Navigation?',
          'What is the difference between Linking.openURL and Linking.canOpenURL?',
          'How do you set up URL schemes for your app?',
        ],
        commonMistakes: [
          'Not checking canOpenURL before calling openURL',
          'Forgetting to configure URL schemes in Info.plist (iOS) and AndroidManifest',
          'Not handling the case where no app can handle the URL',
        ],
        performanceTips: [
          'Use addEventListener to listen for incoming deep links',
          'Check deep link URL on app launch with getInitialURL()',
          'Use React Navigation deep linking config for automatic screen mapping',
        ],
      },
      {
        id: 'rn_statusbar',
        title: 'StatusBar',
        summary: 'Control the status bar appearance',
        difficulty: 'Beginner',
        definition:
          'The StatusBar component controls the app status bar at the top of the screen. You can change its background color, text color (light/dark content), visibility, and style. It can be used as a component or imperatively via static methods.',
        syntax: `<StatusBar barStyle="light-content" backgroundColor="#6C63FF" />
// or imperatively:
StatusBar.setBarStyle('dark-content');`,
        example: `import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const StatusBarExample = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6C63FF"
        translucent={false}
      />
      <Text style={styles.title}>StatusBar Example</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => StatusBar.setBarStyle('dark-content')}
      >
        <Text style={styles.btnText}>Dark Content</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => StatusBar.setBarStyle('light-content')}
      >
        <Text style={styles.btnText}>Light Content</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#6C63FF' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 20, marginTop: 40 },
  btn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 14, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '600' },
});

export default StatusBarExample;`,
        outputExplanation:
          'Displays a screen with light status bar text. Two buttons toggle between dark and light status bar content styles.',
        interviewQuestions: [
          'How does StatusBar differ between iOS and Android?',
          'What does the translucent prop do on Android?',
          'How do you handle StatusBar in React Navigation per screen?',
        ],
        commonMistakes: [
          'Setting backgroundColor on iOS where it has no effect',
          'Not handling StatusBar style when switching between dark and light screens',
          'Forgetting to set translucent on Android when using transparent status bars',
        ],
        performanceTips: [
          'Use the component approach for declarative, screen-specific status bar',
          'Use StatusBar.pushStackEntry and popStackEntry for stack-based control',
          'Set animated={true} for smooth transitions',
        ],
      },
      {
        id: 'rn_stylesheet',
        title: 'StyleSheet',
        summary: 'Optimized styling abstraction',
        difficulty: 'Beginner',
        definition:
          'StyleSheet is an abstraction for creating optimized style objects. Using StyleSheet.create validates styles at creation time and sends them to native only once, improving performance compared to inline style objects.',
        syntax: `const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  text: { fontSize: 18, color: '#333' },
});`,
        example: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StylesheetExample = () => (
  <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}>Styled Card</Text>
      <Text style={styles.subtitle}>Using StyleSheet.create</Text>
    </View>
    {/* Combining styles */}
    <View style={[styles.card, styles.highlighted]}>
      <Text style={[styles.title, { color: '#FFF' }]}>Highlighted</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  highlighted: { backgroundColor: '#6C63FF' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
});

export default StylesheetExample;`,
        outputExplanation:
          'Two cards showing basic styling and style combination. The second card overrides the background color using array syntax.',
        interviewQuestions: [
          'Why use StyleSheet.create instead of plain objects?',
          'How do you combine multiple styles in React Native?',
          'How does styling differ in React Native vs CSS?',
        ],
        commonMistakes: [
          'Using inline objects instead of StyleSheet.create, creating new objects every render',
          'Expecting CSS properties like margin: "10px 20px" — RN uses individual properties',
          'Not understanding that React Native uses Yoga (flexbox) with flexDirection defaulting to column',
        ],
        performanceTips: [
          'Always use StyleSheet.create for static styles',
          'Use style arrays [styles.base, dynamicStyle] instead of object spread',
          'StyleSheet.flatten() can merge styles but creates a new object each time',
        ],
      },
      {
        id: 'rn_dimensions',
        title: 'Dimensions & useWindowDimensions',
        summary: 'Get screen and window size',
        difficulty: 'Beginner',
        definition:
          'Dimensions provides the screen width and height. useWindowDimensions is a Hook that returns the same values but automatically updates when the device rotates or the window resizes, making it the preferred approach for responsive layouts.',
        syntax: `import { Dimensions, useWindowDimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
// or in a component:
const { width, height } = useWindowDimensions();`,
        example: `import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';

const ResponsiveLayout = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const numColumns = width > 600 ? 3 : 2;

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        {width.toFixed(0)} x {height.toFixed(0)}
      </Text>
      <Text style={styles.info}>
        {isLandscape ? 'Landscape' : 'Portrait'}
      </Text>
      <View style={[styles.grid, { flexDirection: isLandscape ? 'row' : 'column' }]}>
        {Array.from({ length: numColumns }, (_, i) => (
          <View key={i} style={[styles.box, { width: width / numColumns - 24 }]}>
            <Text style={styles.boxText}>Box {i + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center' },
  info: { fontSize: 16, color: '#666', marginBottom: 8 },
  grid: { marginTop: 20, gap: 12 },
  box: {
    height: 100, backgroundColor: '#6C63FF', borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  boxText: { color: '#FFF', fontWeight: '700' },
});

export default ResponsiveLayout;`,
        outputExplanation:
          'Displays screen dimensions and orientation, then renders a responsive grid that adapts columns based on screen width.',
        interviewQuestions: [
          'What is the difference between Dimensions.get("window") and Dimensions.get("screen")?',
          'Why is useWindowDimensions preferred over Dimensions.get?',
          'How do you build responsive layouts in React Native?',
        ],
        commonMistakes: [
          'Using Dimensions.get at module level — values become stale on rotation',
          'Not handling orientation changes when using the static Dimensions API',
          'Hardcoding dimensions instead of using percentages or flex',
        ],
        performanceTips: [
          'Always use useWindowDimensions for responsive components',
          'Cache computed values with useMemo when dimensions change',
          'Use flex and percentage-based sizing when possible',
        ],
      },
      {
        id: 'rn_controlled_uncontrolled',
        title: 'Controlled vs Uncontrolled Components',
        summary: 'Two approaches to handling form input state',
        difficulty: 'Intermediate',
        definition:
          'A controlled component has its value managed by React state — the component re-renders on every change. An uncontrolled component stores its own state internally and you read the value via a ref when needed. Controlled is the recommended React pattern for most cases.',
        realWorldAnalogy:
          'A controlled component is like a puppet — you (React state) control every movement. An uncontrolled component is like a self-driving car — it manages itself and you just read the dashboard (ref) when you need to.',
        syntax: `// Controlled
const [text, setText] = useState('');
<TextInput value={text} onChangeText={setText} />

// Uncontrolled
const inputRef = useRef<TextInput>(null);
<TextInput ref={inputRef} defaultValue="hello" />
// Read: inputRef.current?.value`,
        example: `import React, { useState, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Controlled Component
const ControlledForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Controlled:', { name, email });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Controlled</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <Text style={styles.preview}>Live: {name} | {email}</Text>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Uncontrolled Component
const UncontrolledForm = () => {
  const nameRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    // In React Native, uncontrolled is less common
    // We typically use controlled inputs
    console.log('Submitted via ref');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Uncontrolled</Text>
      <TextInput ref={nameRef} style={styles.input} defaultValue="" placeholder="Name (ref)" />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { padding: 16, gap: 8 },
  label: { fontSize: 18, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: 16 },
  preview: { color: '#666', fontSize: 13 },
  btn: { backgroundColor: '#6C63FF', padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '700' },
});`,
        outputExplanation:
          'The controlled form shows live preview as you type (state drives the value). The uncontrolled form uses refs and only reads the value on submit.',
        interviewQuestions: [
          'What is the difference between controlled and uncontrolled components?',
          'When would you choose uncontrolled over controlled?',
          'What happens if you set value without onChangeText on a TextInput?',
        ],
        commonMistakes: [
          'Setting value without onChangeText — the input becomes read-only',
          'Using uncontrolled inputs in React Native where controlled is standard',
          'Not understanding that controlled inputs re-render on every keystroke',
        ],
        performanceTips: [
          'Debounce onChangeText for search inputs to reduce re-renders',
          'Use uncontrolled for truly simple cases where you only need value on submit',
          'Isolate controlled inputs in their own component to prevent parent re-renders',
        ],
      },
      {
        id: 'rn_props_vs_state',
        title: 'Props vs State',
        summary: 'Two core data mechanisms in React',
        difficulty: 'Beginner',
        definition:
          'Props (properties) are read-only data passed from parent to child. State is mutable data managed within a component. Props flow downward (parent to child), while state is local. When state changes, the component re-renders. When props change, the child re-renders.',
        realWorldAnalogy:
          'Props are like your birth certificate — given to you by your parents and you cannot change them. State is like your mood — it is internal to you and can change over time based on what happens.',
        syntax: `// Props: passed from parent
<UserCard name="Alice" age={30} />

// State: managed internally
const [count, setCount] = useState(0);`,
        example: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Child component receives props (read-only)
const Greeting = ({ name, color }: { name: string; color: string }) => (
  <Text style={[styles.greeting, { color }]}>Hello, {name}!</Text>
);

// Parent component manages state
const App = () => {
  const [count, setCount] = useState(0);       // State (mutable)
  const userName = 'Alice';                      // Could also be a prop

  return (
    <View style={styles.container}>
      {/* Passing props to child */}
      <Greeting name={userName} color="#6C63FF" />

      {/* Using state */}
      <Text style={styles.count}>Count: {count}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => setCount(c => c + 1)}>
        <Text style={styles.btnText}>Increment</Text>
      </TouchableOpacity>

      {/* State as props */}
      <Text style={styles.info}>
        The count ({count}) is state in App but would be a prop if passed down
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  greeting: { fontSize: 22, fontWeight: 'bold' },
  count: { fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
  info: { fontSize: 13, color: '#888', textAlign: 'center' },
  btn: { backgroundColor: '#6C63FF', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '700' },
});

export default App;`,
        outputExplanation:
          'Greeting receives name and color as props (cannot modify them). App owns the count state and can change it. If count were passed to a child, it becomes a prop for that child.',
        interviewQuestions: [
          'What is the difference between props and state?',
          'Can a child component modify its props?',
          'What is "lifting state up" and when do you need it?',
        ],
        commonMistakes: [
          'Trying to modify props directly in a child component',
          'Duplicating props into state unnecessarily (derived state antipattern)',
          'Not lifting state up when siblings need to share data',
        ],
        performanceTips: [
          'Keep state as close to where it is used as possible',
          'Avoid passing many props through multiple levels — use Context or state management',
          'Memoize expensive derived values from props with useMemo',
        ],
      },
      {
        id: 'rn_lifecycle',
        title: 'Component Lifecycle',
        summary: 'Mount, update, and unmount phases',
        difficulty: 'Intermediate',
        definition:
          'React components go through three phases: Mounting (component is created and inserted into the DOM), Updating (component re-renders due to state/prop changes), and Unmounting (component is removed). In functional components, useEffect handles all lifecycle events.',
        realWorldAnalogy:
          'A component lifecycle is like a guest at a party: they arrive (mount), might change outfits during the party (update), and eventually leave (unmount). useEffect with an empty array is the arrival, the cleanup function is the departure.',
        syntax: `// Mount: runs once after first render
useEffect(() => { /* mount logic */ }, []);

// Update: runs when dependencies change
useEffect(() => { /* update logic */ }, [dep]);

// Unmount: cleanup function
useEffect(() => {
  return () => { /* cleanup / unmount logic */ };
}, []);`,
        example: `import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // componentDidMount + componentWillUnmount equivalent
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted — cleanup!');
  }, []);

  // componentDidUpdate equivalent (runs when isRunning changes)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
      console.log('Timer cleanup');
    };
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{seconds}s</Text>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: isRunning ? '#EF4444' : '#10B981' }]}
        onPress={() => setIsRunning(r => !r)}
      >
        <Text style={styles.btnText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 40 },
  time: { fontSize: 48, fontWeight: 'bold', marginBottom: 20 },
  btn: { padding: 16, borderRadius: 12, width: 120, alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
});

export default Timer;`,
        outputExplanation:
          'The timer starts/stops based on state. The first useEffect runs on mount and cleans up on unmount. The second creates/clears an interval when isRunning changes.',
        interviewQuestions: [
          'What are the three phases of a React component lifecycle?',
          'How do you replicate componentDidMount, componentDidUpdate, and componentWillUnmount with hooks?',
          'What happens if you forget to clean up in useEffect?',
        ],
        commonMistakes: [
          'Forgetting cleanup causing memory leaks (timers, subscriptions, event listeners)',
          'Not understanding that useEffect with [] runs only once vs without [] runs every render',
          'Calling setState in useEffect without proper dependencies causing infinite loops',
        ],
        performanceTips: [
          'Always clean up subscriptions, timers, and listeners in the return function',
          'Use multiple useEffect hooks for different concerns instead of one large one',
          'Avoid side effects during render — put them in useEffect',
        ],
      },
      {
        id: 'rn_virtual_dom',
        title: 'Virtual DOM & Reconciliation',
        summary: 'How React efficiently updates the UI',
        difficulty: 'Intermediate',
        definition:
          'React creates a lightweight copy of the real DOM called the Virtual DOM. When state changes, React creates a new Virtual DOM, diffs it with the previous one (reconciliation), and only updates the parts of the real DOM that actually changed. This makes updates efficient.',
        realWorldAnalogy:
          'Imagine repainting a house. Instead of repainting the entire house (real DOM update), you take a photo before and after (Virtual DOM diff) and only repaint the parts that are different. Much faster and cheaper!',
        syntax: `// React handles this automatically.
// You write declarative JSX:
return <Text>{count}</Text>;
// React figures out the minimal DOM changes needed.`,
        example: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// React will only re-render the Text that changes,
// not the entire component tree
const ReconciliationDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');

  console.log('Parent renders');

  return (
    <View style={styles.container}>
      {/* This Text re-renders when count changes */}
      <Text style={styles.text}>Count: {count}</Text>

      {/* This Text re-renders when name changes */}
      <Text style={styles.text}>Name: {name}</Text>

      {/* Static content — React knows this hasn't changed */}
      <Text style={styles.static}>I never change</Text>

      <TouchableOpacity style={styles.btn} onPress={() => setCount(c => c + 1)}>
        <Text style={styles.btnText}>Increment</Text>
      </TouchableOpacity>
    </View>
  );
};

// Keys help React identify which items changed in lists
const ListExample = () => {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);

  const removeFirst = () => setItems(items.slice(1));

  return (
    <View>
      {items.map((item) => (
        // Key helps React know which item was removed
        <Text key={item} style={styles.text}>{item}</Text>
      ))}
      <TouchableOpacity style={styles.btn} onPress={removeFirst}>
        <Text style={styles.btnText}>Remove First</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  text: { fontSize: 18 },
  static: { fontSize: 14, color: '#999' },
  btn: { backgroundColor: '#6C63FF', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '700' },
});`,
        outputExplanation:
          'When count changes, React diffs the Virtual DOM and only updates the count Text node. The name Text and static Text stay untouched. Keys help React efficiently track list items.',
        interviewQuestions: [
          'What is the Virtual DOM and why does React use it?',
          'Explain the reconciliation algorithm.',
          'Why are keys important in lists?',
        ],
        commonMistakes: [
          'Using array index as key in dynamic lists — causes bugs when items are reordered or removed',
          'Thinking Virtual DOM is always faster than direct DOM — it is a tradeoff for developer experience',
          'Not understanding that React re-renders the entire component, not just the changed JSX',
        ],
        performanceTips: [
          'Use unique, stable keys for list items (IDs, not indexes)',
          'Use React.memo to skip re-rendering components with unchanged props',
          'Avoid creating new objects/arrays in render — they fail referential equality checks',
        ],
      },
      {
        id: 'rn_keys_in_lists',
        title: 'Keys in Lists',
        summary: 'Help React identify which items changed',
        difficulty: 'Beginner',
        definition:
          'Keys are special string attributes you need to include when creating lists of elements. They help React identify which items have changed, been added, or removed. Keys should be stable, unique, and predictable — use IDs from your data, not array indexes.',
        syntax: `// Good — unique ID
{items.map(item => <Item key={item.id} data={item} />)}

// Bad — array index (causes bugs with reordering)
{items.map((item, index) => <Item key={index} data={item} />)}`,
        example: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const KeysDemo = () => {
  const [items, setItems] = useState([
    { id: 'a1', name: 'Apple' },
    { id: 'b2', name: 'Banana' },
    { id: 'c3', name: 'Cherry' },
    { id: 'd4', name: 'Date' },
  ]);

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addToTop = () => {
    const newItem = { id: Date.now().toString(), name: 'New Fruit' };
    setItems([newItem, ...items]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={addToTop}>
        <Text style={styles.btnText}>Add to Top</Text>
      </TouchableOpacity>

      {items.map(item => (
        <View key={item.id} style={styles.row}>
          <Text style={styles.text}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.remove}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, backgroundColor: '#F0F0FF', borderRadius: 10 },
  text: { fontSize: 16 },
  remove: { color: '#EF4444', fontWeight: 'bold', fontSize: 16 },
  addBtn: { backgroundColor: '#10B981', padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '700' },
});

export default KeysDemo;`,
        outputExplanation:
          'Each item has a unique id used as a key. Adding or removing items works correctly because React can track each item by its stable key.',
        interviewQuestions: [
          'Why should you not use array index as a key?',
          'What happens if two sibling elements have the same key?',
          'What makes a good key value?',
        ],
        commonMistakes: [
          'Using index as key in lists that can be reordered, filtered, or have items added/removed',
          'Using Math.random() as key — changes on every render, defeating the purpose',
          'Forgetting keys entirely — React shows a warning and performance suffers',
        ],
        performanceTips: [
          'Use database IDs or unique identifiers as keys',
          'If items have no ID, create a stable hash from the content',
          'Index as key is OK ONLY for static lists that never change order',
        ],
      },
      {
        id: 'rn_hoc',
        title: 'Higher Order Components (HOC)',
        summary: 'Functions that wrap components with extra behavior',
        difficulty: 'Advanced',
        definition:
          'A Higher Order Component is a function that takes a component and returns a new component with additional props or behavior. HOCs are a pattern for reusing component logic. While hooks have largely replaced HOCs, they are still used in many codebases and libraries.',
        realWorldAnalogy:
          'An HOC is like a phone case. The phone (component) stays the same, but the case (HOC) adds extra features like protection, a card holder, or a stand. The phone works the same way, but now it has extra abilities.',
        syntax: `function withFeature(WrappedComponent) {
  return function EnhancedComponent(props) {
    // Add extra logic or props
    return <WrappedComponent {...props} extraProp={value} />;
  };
}`,
        example: `import React, { useState, useEffect, ComponentType } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// HOC that adds loading state
function withLoading<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithLoadingComponent(props: P & { isLoading?: boolean }) {
    const { isLoading, ...rest } = props;

    if (isLoading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    return <WrappedComponent {...(rest as P)} />;
  };
}

// HOC that adds theme
function withTheme<P extends object>(WrappedComponent: ComponentType<P & { theme: string }>) {
  return function WithThemeComponent(props: P) {
    const theme = 'dark'; // Could come from context
    return <WrappedComponent {...props} theme={theme} />;
  };
}

// Base component
const UserProfile = ({ name, theme }: { name: string; theme: string }) => (
  <View style={[styles.card, { backgroundColor: theme === 'dark' ? '#333' : '#FFF' }]}>
    <Text style={{ color: theme === 'dark' ? '#FFF' : '#333', fontSize: 18 }}>
      {name}
    </Text>
  </View>
);

// Enhanced component
const EnhancedProfile = withLoading(withTheme(UserProfile));
// Usage: <EnhancedProfile name="Alice" isLoading={false} />

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#666' },
  card: { padding: 20, borderRadius: 12, margin: 16 },
});`,
        outputExplanation:
          'withLoading shows a spinner when isLoading is true. withTheme injects theme prop. They can be composed together: withLoading(withTheme(Component)).',
        interviewQuestions: [
          'What is a Higher Order Component?',
          'How do HOCs differ from custom hooks?',
          'What is the "wrapper hell" problem with HOCs?',
        ],
        commonMistakes: [
          'Creating HOCs inside render methods — creates a new component each render',
          'Not forwarding all props to the wrapped component',
          'Not hoisting static methods from the wrapped component',
        ],
        performanceTips: [
          'Define HOCs outside of components, never inside render',
          'Prefer custom hooks over HOCs in modern React — simpler and more composable',
          'Use React.forwardRef when your HOC needs to pass refs through',
        ],
      },
      {
        id: 'rn_error_boundaries',
        title: 'Error Boundaries',
        summary: 'Catch and handle rendering errors gracefully',
        difficulty: 'Advanced',
        definition:
          'Error Boundaries are React components that catch JavaScript errors in their child component tree, log them, and display a fallback UI instead of crashing the whole app. They must be class components (hooks do not support error boundaries yet).',
        syntax: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, info) { logError(error, info); }
  render() {
    if (this.state.hasError) return <FallbackUI />;
    return this.props.children;
  }
}`,
        example: `import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface State { hasError: boolean; error: Error | null }

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // Send to error reporting service
  }

  resetError = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.emoji}>!</Text>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error?.message}</Text>
          <TouchableOpacity style={styles.btn} onPress={this.resetError}>
            <Text style={styles.btnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

// Usage:
// <ErrorBoundary>
//   <MyScreen />
// </ErrorBoundary>

const styles = StyleSheet.create({
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  message: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  btn: { backgroundColor: '#6C63FF', padding: 14, borderRadius: 12 },
  btnText: { color: '#FFF', fontWeight: '700' },
});

export default ErrorBoundary;`,
        outputExplanation:
          'When a child component throws during rendering, ErrorBoundary catches it and shows a fallback UI with a "Try Again" button instead of crashing the app.',
        interviewQuestions: [
          'What are Error Boundaries and when do you need them?',
          'Can Error Boundaries catch errors in event handlers?',
          'Why do Error Boundaries have to be class components?',
        ],
        commonMistakes: [
          'Expecting Error Boundaries to catch errors in event handlers — they only catch render errors',
          'Not placing Error Boundaries at strategic levels in the component tree',
          'Forgetting that Error Boundaries do not catch errors in async code, server-side rendering, or in the boundary itself',
        ],
        performanceTips: [
          'Place Error Boundaries around route-level components and critical sections',
          'Use multiple Error Boundaries with different fallback UIs for different sections',
          'Log errors to a service like Sentry or Crashlytics in componentDidCatch',
        ],
      },
      {
        id: 'rn_forwardref',
        title: 'forwardRef & useImperativeHandle',
        summary: 'Pass refs to child components and expose custom methods',
        difficulty: 'Advanced',
        definition:
          'React.forwardRef lets you pass a ref through a component to one of its children. useImperativeHandle customizes the instance value that is exposed to parent components when using ref. Together they allow parent components to call methods on child components.',
        syntax: `const MyInput = forwardRef((props, ref) => {
  return <TextInput ref={ref} {...props} />;
});

// With useImperativeHandle
const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => inputRef.current?.clear(),
  }));
  return <TextInput ref={inputRef} {...props} />;
});`,
        example: `import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

// Custom input with exposed methods
const CustomInput = forwardRef<
  { focus: () => void; clear: () => void; getValue: () => string },
  { placeholder: string }
>((props, ref) => {
  const inputRef = useRef<TextInput>(null);
  const valueRef = useRef('');

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      inputRef.current?.clear();
      valueRef.current = '';
    },
    getValue: () => valueRef.current,
  }));

  return (
    <TextInput
      ref={inputRef}
      style={styles.input}
      placeholder={props.placeholder}
      onChangeText={(text) => { valueRef.current = text; }}
    />
  );
});

const ParentComponent = () => {
  const inputRef = useRef<{ focus: () => void; clear: () => void; getValue: () => string }>(null);

  return (
    <View style={styles.container}>
      <CustomInput ref={inputRef} placeholder="Type something..." />
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => inputRef.current?.focus()}>
          <Text style={styles.btnText}>Focus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => inputRef.current?.clear()}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 14, fontSize: 16 },
  row: { flexDirection: 'row', gap: 12 },
  btn: { backgroundColor: '#6C63FF', padding: 12, borderRadius: 10, flex: 1, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '700' },
});

export default ParentComponent;`,
        outputExplanation:
          'Parent can call focus() and clear() on the CustomInput through the ref. useImperativeHandle controls exactly which methods are exposed.',
        interviewQuestions: [
          'What is forwardRef and when do you need it?',
          'How does useImperativeHandle work?',
          'Why can you not just pass a ref prop directly to a function component?',
        ],
        commonMistakes: [
          'Trying to use ref on a function component without forwardRef — it will be null',
          'Exposing the entire internal ref instead of specific methods with useImperativeHandle',
          'Overusing imperative patterns when declarative props would be simpler',
        ],
        performanceTips: [
          'Use forwardRef sparingly — most components should be controlled via props',
          'useImperativeHandle creates a new handle only when dependencies change',
          'Prefer declarative patterns (props/state) over imperative (refs) whenever possible',
        ],
      },
      {
        id: 'rn_fragment',
        title: 'React.Fragment',
        summary: 'Group elements without adding extra DOM nodes',
        difficulty: 'Beginner',
        definition:
          'React.Fragment lets you group multiple elements without adding an extra View wrapper. This avoids unnecessary nesting and can prevent layout issues caused by extra container views. The shorthand syntax is <> ... </>.',
        syntax: `// Full syntax
<React.Fragment>
  <Text>First</Text>
  <Text>Second</Text>
</React.Fragment>

// Short syntax
<>
  <Text>First</Text>
  <Text>Second</Text>
</>`,
        example: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Without Fragment — extra View wrapper affects layout
const WithWrapper = () => (
  <View style={styles.row}>
    <View>
      <Text>A</Text>
      <Text>B</Text>
    </View>
  </View>
);

// With Fragment — no extra wrapper
const WithFragment = () => (
  <View style={styles.row}>
    <>
      <Text style={styles.text}>A</Text>
      <Text style={styles.text}>B</Text>
    </>
    <>
      <Text style={styles.text}>C</Text>
      <Text style={styles.text}>D</Text>
    </>
  </View>
);

// Fragment with key (needed in lists)
const ItemList = ({ items }: { items: { id: string; title: string; subtitle: string }[] }) => (
  <View>
    {items.map(item => (
      <React.Fragment key={item.id}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <View style={styles.divider} />
      </React.Fragment>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, padding: 16 },
  text: { fontSize: 18, padding: 8, backgroundColor: '#F0F0FF', borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#666' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 8 },
});`,
        outputExplanation:
          'Fragment groups elements without adding a View wrapper. In lists, use <React.Fragment key={...}> to provide keys (shorthand <> does not support keys).',
        interviewQuestions: [
          'What is React.Fragment and why use it?',
          'Can you pass keys to the shorthand Fragment syntax <>?',
          'When would Fragment cause layout issues in React Native?',
        ],
        commonMistakes: [
          'Adding unnecessary View wrappers when Fragment would suffice',
          'Trying to pass key to shorthand <> — you need <React.Fragment key={...}>',
          'Forgetting that Fragment does not support style props',
        ],
        performanceTips: [
          'Use Fragments to reduce unnecessary View nesting and flatten the component tree',
          'Fewer View nodes means slightly better rendering performance',
          'Fragment is especially useful inside FlatList renderItem to avoid extra wrappers',
        ],
      },
      {
        id: 'rn_lazy_suspense',
        title: 'Lazy Loading & Code Splitting',
        summary: 'Load components on demand for faster startup',
        difficulty: 'Advanced',
        definition:
          'React.lazy lets you load components dynamically. Combined with Suspense, it shows a fallback while the lazy component loads. In React Native, this is used with Metro bundler for code splitting, loading heavy screens only when the user navigates to them.',
        syntax: `const HeavyScreen = React.lazy(() => import('./HeavyScreen'));

<Suspense fallback={<ActivityIndicator />}>
  <HeavyScreen />
</Suspense>`,
        example: `import React, { Suspense, lazy, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'));
const HeavyReport = lazy(() => import('./HeavyReport'));

const LoadingFallback = () => (
  <View style={styles.loading}>
    <ActivityIndicator size="large" color="#6C63FF" />
    <Text style={styles.loadingText}>Loading component...</Text>
  </View>
);

const Dashboard = () => {
  const [showChart, setShowChart] = useState(false);
  const [showReport, setShowReport] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => setShowChart(true)}>
        <Text style={styles.btnText}>Load Chart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => setShowReport(true)}>
        <Text style={styles.btnText}>Load Report</Text>
      </TouchableOpacity>

      <Suspense fallback={<LoadingFallback />}>
        {showChart && <HeavyChart />}
        {showReport && <HeavyReport />}
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  loading: { padding: 40, alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#666' },
  btn: { backgroundColor: '#6C63FF', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: '700' },
});

export default Dashboard;`,
        outputExplanation:
          'HeavyChart and HeavyReport are only loaded when the user taps the button. Suspense shows a loading spinner while the component bundle downloads.',
        interviewQuestions: [
          'What is React.lazy and how does it work?',
          'What is Suspense and what does the fallback prop do?',
          'How does code splitting improve app performance?',
        ],
        commonMistakes: [
          'Using lazy for small components — the overhead is not worth it',
          'Not wrapping lazy components with Suspense — causes a runtime error',
          'Forgetting that React.lazy only works with default exports',
        ],
        performanceTips: [
          'Lazy load routes/screens that users may not visit during a session',
          'Preload lazy components when the user is likely to navigate soon',
          'Use route-based code splitting for the biggest impact on initial load time',
        ],
      },
      {
        id: 'rn_keyboard',
        title: 'Keyboard Handling',
        summary: 'Manage software keyboard behavior',
        difficulty: 'Intermediate',
        definition:
          'Handling the software keyboard is crucial in mobile apps. React Native provides KeyboardAvoidingView and the Keyboard module to manage layouts when the keyboard appears, ensuring inputs remain visible and allowing for programmatically dismissing the keyboard.',
        realWorldAnalogy:
          'Keyboard handling is like having a "Pop-up" shelf in a small room. When the shelf (keyboard) pops up, you need to make sure you move the chair (UI items) out of the way so they don\'t get crushed or hidden.',
        syntax: `<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
  <TextInput />
</KeyboardAvoidingView>`,
        example: `import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button
} from 'react-native';

const KeyboardExample = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Keyboard Handling</Text>
          <TextInput placeholder="Username" style={styles.input} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { padding: 24, flex: 1, justifyContent: 'space-around' },
  header: { fontSize: 36, marginBottom: 48 },
  input: { height: 40, borderColor: "#000000", borderBottomWidth: 1, marginBottom: 36 },
  btnContainer: { backgroundColor: "white", marginTop: 12 }
});

export default KeyboardExample;`,
        outputExplanation:
          'Uses KeyboardAvoidingView to push the input field up when the keyboard opens. TouchableWithoutFeedback allows dismissing the keyboard by tapping outside.',
        interviewQuestions: [
          'Why do we need different behaviors for iOS and Android in KeyboardAvoidingView?',
          'How do you dismiss the keyboard programmatically?',
          'What are keyboard listeners and when should you use them?',
        ],
        commonMistakes: [
          'Not setting flex: 1 on the container, which can break the avoidance logic',
          'Forgetting to dismiss the keyboard on form submission',
          'Using "padding" behavior on Android where "height" or "none" might be better',
        ],
        performanceTips: [
          'Use the Keyboard module for complex UI adjustments (e.g., hiding tabs)',
          'Prefer simple CSS-based solutions (flexbox) where possible',
          'Be aware of performance impact of frequent layout changes during animation',
        ],
      },
    ],
  },
];
