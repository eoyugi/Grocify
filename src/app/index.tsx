import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text className="text-red-500 text-2xl font-bold bg-blue-500">
        Edit src/app/index.tsx to edit this screen.
      </Text>
      <Link href="/about">About Screen Link</Link>

      <Image
        source={require("@/assets/images/favicon.png")} // ← Nice and clean
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
