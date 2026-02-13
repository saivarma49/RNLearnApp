import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import TopicListScreen from '../screens/TopicListScreen';
import TopicDetailScreen from '../screens/TopicDetailScreen';
import AITutorScreen from '../screens/AITutorScreen';
import QuizScreen from '../screens/QuizScreen';
import ProfileScreen from '../screens/ProfileScreen';
import JSCodeScreen from '../screens/JSCodeScreen';
import JSCodeDetailScreen from '../screens/JSCodeDetailScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import QuizHistoryScreen from '../screens/QuizHistoryScreen';
import BadgesScreen from '../screens/BadgesScreen';
import AboutScreen from '../screens/AboutScreen';
import JSCompilerScreen from '../screens/JSCompilerScreen';

// Custom Drawer
import CustomDrawerContent from '../components/CustomDrawerContent';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// ---- Tab Icon Component ----
const TabIcon = ({ icon, focused, color }: { icon: string; focused: boolean; color: string }) => (
  <Text style={[styles.tabIcon, { opacity: focused ? 1 : 0.6 }]}>{icon}</Text>
);

// ---- Bottom Tab Navigator ----
const TabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          paddingTop: 4,
          height: 85,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: -2,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon={'\u{1F3E0}'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ReactNative"
        component={TopicListScreen}
        initialParams={{ type: 'rn' }}
        options={{
          title: 'React Native',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon={'\u{1F4F1}'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="JavaScript"
        component={TopicListScreen}
        initialParams={{ type: 'js' }}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon={'\u{1F4DC}'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="JSCode"
        component={JSCodeScreen}
        options={{
          title: 'JS Code',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon={'\u{1F4BB}'} focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// ---- Main Stack Navigator (existing) ----
const MainStackNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTitleStyle: { fontWeight: '700', color: theme.text, fontSize: 18 },
        headerTintColor: theme.primary,
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopicDetail"
        component={TopicDetailScreen}
        options={({ route }: any) => ({
          title: route.params?.topic?.title || 'Topic',
        })}
      />
      <Stack.Screen
        name="JSCodeDetail"
        component={JSCodeDetailScreen}
        options={({ route }: any) => ({
          title: route.params?.question?.title || 'Code Question',
        })}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={({ route }: any) => ({
          title: `Quiz: ${route.params?.topicTitle || 'Quiz'}`,
        })}
      />
    </Stack.Navigator>
  );
};

// ---- Root Drawer Navigator ----
const AppNavigator = () => {
  const theme = useTheme();
  const isDarkMode = useStore((s) => s.isDarkMode);

  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.primary,
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.border,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: theme.surface },
          headerTitleStyle: { fontWeight: '700', color: theme.text, fontSize: 18 },
          headerTintColor: theme.primary,
          headerShadowVisible: false,
          drawerStyle: {
            width: 300,
          },
        }}>
        <Drawer.Screen
          name="DrawerHome"
          component={MainStackNavigator}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Bookmarks"
          component={BookmarksScreen}
          options={{ title: 'Bookmarks' }}
        />
        <Drawer.Screen
          name="QuizHistory"
          component={QuizHistoryScreen}
          options={{ title: 'Quiz History' }}
        />
        <Drawer.Screen
          name="BadgesScreen"
          component={BadgesScreen}
          options={{ title: 'Badges' }}
        />
        <Drawer.Screen
          name="JSCompiler"
          component={JSCompilerScreen}
          options={{ title: 'JS Compiler' }}
        />
        <Drawer.Screen
          name="AITutor"
          component={AITutorScreen}
          options={{ title: 'AI Tutor' }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'About' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 22,
  },
});

export default AppNavigator;
