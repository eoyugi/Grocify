module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Add this if you use Reanimated (recommended to put it last)
    // plugins: ["react-native-reanimated/plugin"],
  };
};
