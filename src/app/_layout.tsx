import '../../global.css';
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Platform } from 'react-native';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
  if (!publishableKey) {
    throw new Error('Add your Clerk Publishable Key to the .env file');
  }

  // tokenCache is only for native (iOS/Android), not web
  const clerkProps = Platform.OS === 'web' 
    ? { publishableKey } 
    : { publishableKey, tokenCache };

  return (
    <ClerkProvider {...clerkProps}>
      <KeyboardProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </KeyboardProvider>
    </ClerkProvider>
  );
}