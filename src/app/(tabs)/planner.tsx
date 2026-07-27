import PlannerFormCard from '@/components/planner/PlannerFormCard';
import PlannerHeroImage from '@/components/planner/PlannerHeroImage';
import TabScreenBackground from '@/components/TabScreenBackground';
import { useGroceryStore } from '@/store/grocery-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Text, View } from 'react-native';

const PlannerScreen = () => {
  const { items } = useGroceryStore();

  const pendingCount = items.filter((item) => !item.purchased).length;
  const highPriorityCount = items.filter(
    (item) => !item.purchased && item.priority === 'high'
  ).length;
  const totalQuantity = items
    .filter((item) => !item.purchased)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <KeyboardAwareScrollView
      bottomOffset={80}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-background py-4"
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <TabScreenBackground />

      {/* Header + Stats card */}
      <View className="gap-4 rounded-3xl border border-border bg-card/70 p-5">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">
              Plan smarter, shop calmer
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              Organize your next grocery run with insights.
            </Text>
          </View>

          <View className="h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Text className="text-lg text-white">✓</Text>
          </View>
        </View>

        {/* Stats row */}
        <View className="flex-row gap-3">
          <View className="flex-1 rounded-2xl border border-border bg-background/80 p-3">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              Pending
            </Text>
            <Text className="mt-1 text-xl font-bold text-foreground">
              {pendingCount}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl border border-border bg-background/80 p-3">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              High Priority
            </Text>
            <Text className="mt-1 text-xl font-bold text-foreground">
              {highPriorityCount}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl border border-border bg-background/80 p-3">
            <Text className="text-xs font-medium uppercase tracking-[1px] text-muted-foreground">
              Units
            </Text>
            <Text className="mt-1 text-xl font-bold text-foreground">
              {totalQuantity}
            </Text>
          </View>
        </View>
      </View>

      {/* Hero image */}
      <PlannerHeroImage />

      {/* Build your list section */}
      <View className="px-1">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
          Build your list
        </Text>
        <Text className="mt-1 text-sm text-muted-foreground">
          Add items with the right quantity, category, and urgency.
        </Text>
      </View>

      {/* Form card */}
      <PlannerFormCard />
    </KeyboardAwareScrollView>
  );
};

export default PlannerScreen;