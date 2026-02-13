import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Props {
  title: string;
  icon: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'outline';
}

const AIButton: React.FC<Props> = ({ title, icon, onPress, loading = false, variant = 'outline' }) => {
  const theme = useTheme();
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary
          ? { backgroundColor: theme.primary }
          : { backgroundColor: 'transparent', borderColor: theme.primary, borderWidth: 1.5 },
      ]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator size="small" color={isPrimary ? '#FFF' : theme.primary} />
      ) : (
        <>
          <Text style={styles.icon}>{icon}</Text>
          <Text
            style={[
              styles.title,
              { color: isPrimary ? '#FFFFFF' : theme.primary },
            ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginVertical: 4,
    marginRight: 8,
    minWidth: 140,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AIButton;
