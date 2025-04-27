import 'react-native-reanimated';
import '../global.css';
import { SafeAreaView, View } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomNavigation from '@/_components/BottomNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/_providers/auth';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-main">
        <GestureHandlerRootView className="flex-1">
          <AuthProvider>
            <View className="flex-1">
              <Slot />
            </View>
          </AuthProvider>
        </GestureHandlerRootView>
      </SafeAreaView>

      <BottomNavigation />
    </SafeAreaProvider>
  );
}
