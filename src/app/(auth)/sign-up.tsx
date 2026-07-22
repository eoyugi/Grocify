import { SignUp } from '@clerk/expo/web';
import { useAuth } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function SignUpScreen() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(home)');
    }
  }, [isSignedIn]);

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 px-4">
      <View className="w-full max-w-md">
        <SignUp />
      </View>
    </View>
  );
}