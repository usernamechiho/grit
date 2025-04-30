import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard, ScrollView, Animated } from 'react-native';
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { deleteDDay, loadDDays, saveDDay } from '@/_utils/d-day';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import DDayCard from './_components/Card';
import { Swipeable } from 'react-native-gesture-handler';

export default function Content() {
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState('');
  const [dDayList, setDDayList] = useState<any[]>([]);

  // 스와이프 컴포넌트의 참조 배열
  const swipeableRefs = useRef<(Swipeable | null)[]>([]);
  // 현재 열린 스와이프 인덱스
  const [openSwipeableIdx, setOpenSwipeableIdx] = useState<number | null>(null);

  // 처음 마운트 시 불러오기
  useEffect(() => {
    loadDDays().then((list) => {
      setDDayList(list);
      // 목록이 변경될 때마다 ref 배열 크기 조정
      swipeableRefs.current = Array(list.length).fill(null);
    });
  }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  // 저장 후 목록 갱신
  const handleSave = async () => {
    await saveDDay(date.toISOString(), description);
    const list = await loadDDays();
    setDDayList(list);

    setDate(new Date());
    setDescription('');
    // 목록이 변경되면 ref 배열 크기 조정
    swipeableRefs.current = Array(list.length).fill(null);
    closeBottomSheet();
    Keyboard.dismiss();
  };

  const handleDelete = async (idx: number) => {
    // 삭제 전에 열린 상태 초기화
    setOpenSwipeableIdx(null);

    await deleteDDay(idx);
    const list = await loadDDays();
    setDDayList(list);
    // 목록이 변경되면 ref 배열 크기 조정
    swipeableRefs.current = Array(list.length).fill(null);
  };

  // 다른 모든 스와이프 닫기
  const closeOtherSwipeables = (idx: number) => {
    if (openSwipeableIdx !== null && openSwipeableIdx !== idx) {
      // 이전에 열려있던 스와이프가 있고, 현재 idx와 다르면 닫기
      const prevRef = swipeableRefs.current[openSwipeableIdx];
      if (prevRef) {
        prevRef.close();
      }
    }
    // 현재 열린 스와이프 인덱스 업데이트
    setOpenSwipeableIdx(idx);
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, idx: number) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          className="w-20 h-[80px] justify-center items-center bg-[#282828] rounded-xl"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            handleDelete(idx);
          }}
        >
          <AntDesign name="delete" size={22} color="#999" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-main">
      <Text className="text-white text-4xl font-bold pt-4 pl-4">Grit</Text>

      <ScrollView
        className="flex-1 px-4 pt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {dDayList.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-20">
            <Text className="text-[#888] text-base mb-2">목표가 없습니다</Text>
            <Text className="text-[#666] text-sm">+ 버튼을 눌러 목표를 추가하세요</Text>
          </View>
        ) : (
          dDayList.map((item, idx) => (
            <Swipeable
              key={idx}
              ref={(ref) => (swipeableRefs.current[idx] = ref)}
              friction={3}
              overshootRight={false}
              renderRightActions={(progress) => renderRightActions(progress, idx)}
              onSwipeableOpen={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                closeOtherSwipeables(idx);
              }}
              onSwipeableClose={() => {
                if (openSwipeableIdx === idx) {
                  setOpenSwipeableIdx(null);
                }
              }}
            >
              <DDayCard targetDate={item.targetDate} description={item.description} />
            </Swipeable>
          ))
        )}
      </ScrollView>

      <View className="absolute bg-blue-500 rounded-3xl bottom-[36px] right-[20px] transform -translate-x-1/2 w-[55px] h-16 flex-row justify-evenly items-center">
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            openBottomSheet();
          }}
          className="items-center justify-center"
        >
          <MaterialCommunityIcons name="plus" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <BottomSheet
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['52%', '52%']}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: 'gray' }}
        backgroundStyle={{ backgroundColor: '#1E1E1E' }}
      >
        <BottomSheetView style={{ flex: 1, padding: 16 }}>
          <View className="items-center mb-6">
            <Text className="text-main text-xl font-semibold">새 목표 추가하기</Text>
          </View>

          <Text className="text-main mb-2">목표일</Text>

          <View className="ml-[-20px]">
            <DateTimePicker
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => {
                if (!selectedDate) return;
                setDate(selectedDate);
              }}
              value={date}
              themeVariant="dark"
              locale="ko-KR"
            />
          </View>

          <Text className="text-main mb-2 mt-6">목표 설명</Text>

          <BottomSheetTextInput
            className="bg-[#303030] text-main p-3 rounded-lg mb-6"
            placeholder="목표를 입력하세요"
            placeholderTextColor="#9ca3af"
            multiline
            onChangeText={(text) => setDescription(text)}
            value={description}
          />

          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="flex-1 bg-[#3B82F6] py-3 rounded-lg items-center"
              onPress={async () => {
                handleSave();
              }}
            >
              <Text className="text-white font-medium">추가</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
