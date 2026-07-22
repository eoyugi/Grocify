import { UserProfile } from '@clerk/expo/web';
import { View } from 'react-native';
import { Stack } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ title: 'Profile' }} />
      <View className="flex-1 justify-center items-center p-4">
        <View className="w-full max-w-2xl">
          <UserProfile />
        </View>
      </View>
    </View>
  );
}