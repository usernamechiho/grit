import { View, Text } from 'react-native';

export default function MyPage() {
  return (
    <View>
      <Text className="text-main text-5xl font-semibold">Grit,</Text>
      <Text className="text-main text-5xl font-semibold">Pebble,</Text>
      <Text className="text-main text-5xl font-semibold">Rock</Text>

      <Text className="text-sub text-4xl mt-1">Day,</Text>
      <Text className="text-sub text-4xl mt-1">Routine,</Text>
      <Text className="text-[#D4D4D4] text-4xl mt-1">Dream</Text>
    </View>
  );
}
