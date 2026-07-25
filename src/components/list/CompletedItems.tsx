import { useGroceryStore } from '@/store/grocery-store';
import { Check, Trash2 } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

const CompletedItems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore();
  const completedItems = items.filter((item) => item.purchased);

  if (!completedItems.length) return null;

  return (
    <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
        Completed
      </Text>

      {completedItems.map((item) => (
        <View
          key={item.id}
          className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2"
        >
          <View className="flex-row items-center gap-2">
            <Pressable
              className="h-6 w-6 items-center justify-center rounded-full bg-primary"
              onPress={() => togglePurchased(item.id)}
            >
              <Check size={12} color="#ffffff" />
            </Pressable>

            <Text className="text-base text-muted-foreground line-through">
              {item.name}
            </Text>
          </View>

          <Pressable
            className="h-8 w-8 items-center justify-center rounded-xl bg-red-600"
            onPress={() => removeItem(item.id)}
          >
            <Trash2 size={12} color="#ffffff" />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default CompletedItems;