import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { View } from 'react-native';
import { Slot } from 'expo-router';

// 앱 로딩이 완료되기 전에 스플래시 화면이 자동으로 사라지는 것을 방지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // 폰트가 로드되면 스플래시 화면 숨기기
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View className="flex-1">
      <Slot />
    </View>
  );
}
