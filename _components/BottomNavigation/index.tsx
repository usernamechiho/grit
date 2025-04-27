import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useState, useEffect } from 'react';

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('/');

  // 현재 경로에 따라 활성 탭 설정
  useEffect(() => {
    if (pathname === '/') {
      setActiveTab('/(content)');
    } else {
      setActiveTab(pathname);
    }
  }, [pathname]);

  const handleNavigation = (path: string) => {
    // 진동 효과 제공
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(path);
    router.push(path as any);
  };

  // 아이콘 및 텍스트 색상 결정 함수
  const getIconColor = (path: string) => {
    return activeTab === path ? '#111827' : '#9ca3af';
  };

  const getTextColor = (path: string) => {
    return activeTab === path ? '#374151' : '#9ca3af';
  };

  const getTextWeight = (path: string) => {
    return activeTab === path ? '500' : '400';
  };

  return (
    <View className="absolute border border-gray-300 bg-gray-50 rounded-3xl bottom-20 left-1/2 transform -translate-x-1/2 w-[150px] h-16 flex-row justify-evenly items-center">
      <TouchableOpacity
        className="items-center justify-center"
        onPress={() => handleNavigation('/(content)')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="orbit" size={20} color={getIconColor('/(content)')} />
        <Text
          style={{
            fontSize: 12,
            marginTop: 4,
            color: getTextColor('/(content)'),
            fontWeight: getTextWeight('/(content)') as '400' | '500',
          }}
        >
          Days
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center justify-center"
        onPress={() => handleNavigation('/(mypage)')}
        activeOpacity={0.7}
      >
        <Feather name="command" size={20} color={getIconColor('/(mypage)')} />
        <Text
          style={{
            fontSize: 12,
            marginTop: 4,
            color: getTextColor('/(mypage)'),
            fontWeight: getTextWeight('/(mypage)') as '400' | '500',
          }}
        >
          My
        </Text>
      </TouchableOpacity>
    </View>
  );
}
