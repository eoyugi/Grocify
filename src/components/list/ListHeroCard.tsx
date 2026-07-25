import { useGroceryStore } from '@/store/grocery-store';
import { Text, View } from 'react-native';

const ListHeroCard = () => {
  const { items } = useGroceryStore();

  const completedCount = items.filter((item) => item.purchased).length;
  const pendingCount = items.length - completedCount;
  const completionRate = items.length ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <View className="rounded-3xl bg-green-600 p-5">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-white/70">
        Today
      </Text>

      <Text className="mt-1 text-3xl font-extrabold text-white">
        Your Grocery Board
      </Text>

      <Text className="mt-1 text-sm text-white/80">
        {pendingCount} pending · {completedCount} completed
      </Text>

      {/* Progress bar track */}
      <View className="mt-4 h-2 overflow-hidden rounded-full bg-white/30">
        {/* Progress bar fill */}
        <View 
          className="h-full rounded-full bg-white" 
          style={{ width: `${completionRate}%` }} 
        />
      </View>
    </View>
  );
};

export default ListHeroCard;