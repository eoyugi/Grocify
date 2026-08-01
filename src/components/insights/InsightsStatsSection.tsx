import { useGroceryStore } from "@/store/grocery-store";
import { Check, Clock3, Layers3 } from "lucide-react-native";
import { Text, View } from "react-native";

export default function InsightsStatsSection() {
  const { items } = useGroceryStore();

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.purchased).length;
  const pendingItems = totalItems - completedItems;

  const completionRate = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <View className="gap-3">
      <View className="flex-row gap-2">
        <View className="flex-1 rounded-3xl border border-border bg-card p-4">
          <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <Clock3 size={18} color="#fff" />
          </View>
          <Text className="mt-3 text-xs uppercase tracking-[1px] text-muted-foreground">
            Pending
          </Text>
          <Text className="mt-1 text-3xl font-extrabold text-foreground">{pendingItems}</Text>
        </View>

        <View className="flex-1 rounded-3xl border border-border bg-card p-4">
          <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <Check size={18} color="#fff" />
          </View>
          <Text className="mt-3 text-xs uppercase tracking-[1px] text-muted-foreground">
            Completed
          </Text>
          <Text className="mt-1 text-3xl font-extrabold text-foreground">{completedItems}</Text>
        </View>

        <View className="flex-1 rounded-3xl border border-border bg-card p-4">
          <View className="h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <Layers3 size={18} color="#fff" />
          </View>
          <Text className="mt-3 text-xs uppercase tracking-[1px] text-muted-foreground">Total</Text>
          <Text className="mt-1 text-3xl font-extrabold text-foreground">{totalItems}</Text>
        </View>
      </View>

      <View className="rounded-3xl border border-border bg-card p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-foreground">Completion rate</Text>
          <Text className="text-sm font-semibold text-primary">{completionRate}%</Text>
        </View>
        <View className="mt-3 overflow-hidden rounded-full bg-secondary">
          <View
            className="h-3 rounded-full bg-ring"
            style={{ width: `${Math.max(2, completionRate)}%` }}
          />
        </View>
      </View>
    </View>
  );
}