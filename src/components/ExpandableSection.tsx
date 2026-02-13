import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTheme } from '../hooks/useTheme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const ExpandableSection: React.FC<Props> = ({ title, children, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const theme = useTheme();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.7}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.icon, { color: theme.primary }]}>
          {expanded ? '\u2212' : '+'}
        </Text>
      </TouchableOpacity>
      {expanded && (
        <View style={[styles.content, { borderTopColor: theme.border }]}>{children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  content: {
    padding: 16,
    borderTopWidth: 1,
  },
});

export default ExpandableSection;
