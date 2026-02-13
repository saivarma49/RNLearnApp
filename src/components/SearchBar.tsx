import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({ value, onChangeText, placeholder }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search topics...'}
        placeholderTextColor={theme.textSecondary}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  input: {
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 20,
    fontSize: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default SearchBar;
