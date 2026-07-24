import { useAuth } from '@clerk/expo';
import { Redirect, Tabs } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { House, Settings, CalendarDays, BarChart3 } from 'lucide-react-native';
import { useGroceryStore } from '@/store/grocery-store';

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { loadItems, items } = useGroceryStore();
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';
  const tabTintColor = isDark ? 'hsl(142 70% 54%)' : 'hsl(147 75% 33%)';

  useEffect(() => {
    loadItems();
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
        },
        tabBarActiveTintColor: tabTintColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: 'Planner',
          tabBarIcon: ({ color, size }) => <CalendarDays size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => <BarChart3 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}