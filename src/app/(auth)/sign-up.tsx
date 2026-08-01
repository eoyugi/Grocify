import { SignUp } from '@clerk/expo/web';
import { Image } from 'expo-image';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  return (
    <SafeAreaView className="flex-1 bg-primary dark:bg-secondary" edges={['top']}>
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Decorative background circles */}
        <View className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-primary/80 dark:bg-background/40" />
        <View className="absolute right-[-74px] top-40 h-72 w-72 rounded-full bg-primary/70 dark:bg-background/35" />

        {/* Main content */}
        <View className="px-6 pt-4">
          <Text className="text-center text-5xl font-extrabold tracking-tight text-primary-foreground uppercase font-mono dark:text-foreground">
            Grocify
          </Text>
          <Text className="mt-1 text-center text-[14px] text-primary-foreground/80 dark:text-foreground/75">
            Plan smarter. Shop happier.
          </Text>

          <View className="mt-6 rounded-[30px] border border-white/20 bg-white/10 p-3">
            <Image
              source={require('../../../assets/images/auth.png')}
              style={{ width: '100%', height: 280 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Bottom card with Clerk SignUp */}
        <View className="mt-8 flex-1 rounded-t-[36px] bg-card px-6 pb-8 pt-6 min-h-[500px]">
          <View className="self-center rounded-full bg-secondary px-3 py-1">
            <Text className="text-xs font-semibold uppercase tracking-[1px] text-secondary-foreground">
              Create Account
            </Text>
          </View>

          <Text className="mt-2 text-center text-sm leading-6 text-muted-foreground">
            Join us and start your personalized grocery experience today.
          </Text>

          <View className="mt-6 w-full">
            <SignUp fallbackRedirectUrl="/(tabs)" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}