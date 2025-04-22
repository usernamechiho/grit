import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { SafeAreaView, View } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavigation from '@/components/BottomNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// 앱 로딩이 완료되기 전에 스플래시 화면이 자동으로 사라지는 것을 방지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-main">
        <GestureHandlerRootView>
          <View className="flex-1 px-4">
            <Slot />
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>

      <BottomNavigation />
    </SafeAreaProvider>
  );
}
