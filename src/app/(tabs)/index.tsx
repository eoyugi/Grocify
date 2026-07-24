import { useAuth, useUser } from '@clerk/expo';
import { UserButton } from '@clerk/expo/web';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  // Signed out state
  if (!isSignedIn) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-white">
        <Text className="text-2xl font-bold mb-6">Welcome!</Text>
        <Link
          href="/(auth)/sign-in"
          className="bg-blue-500 rounded-lg p-4 w-full items-center text-center"
        >
          <Text className="text-white font-semibold">Sign In</Text>
        </Link>
      </View>
    );
  }

  // Signed in state with UserButton
  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Welcome back!</Text>
      <Text className="text-gray-600 mb-8">
        {user?.emailAddresses[0]?.emailAddress}
      </Text>

      {/* Clerk's pre-built UserButton - avatar + dropdown menu */}
      <UserButton />

      <Text className="text-gray-400 text-sm mt-8 text-center">
        Click your avatar to manage your account
      </Text>
    </View>
  );
}