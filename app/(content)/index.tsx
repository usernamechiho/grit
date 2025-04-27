import React, { useRef, useState, useCallback } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Content() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <View className="flex-1">
      <Text className="text-white">zzz</Text>

      <Button title="Show Bottom Sheet" onPress={openBottomSheet} />

      <BottomSheet
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['50%', '50%']}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: 'gray' }}
        backgroundStyle={{ backgroundColor: '#1E1E1E' }}
      >
        <BottomSheetView style={{ flex: 1, padding: 16 }}>
          <View className="items-center mb-6">
            <Text className="text-main text-xl font-semibold">새 목표 추가하기</Text>
          </View>
          <Text className="text-main mb-2">목표일 (YYYY-MM-DD)</Text>

          <DateTimePicker
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              console.log(selectedDate);
            }}
            value={new Date()}
          />

          <BottomSheetTextInput
            className="bg-[#303030] text-main p-3 rounded-lg mb-4"
            placeholder="2023-12-31"
            placeholderTextColor="#9ca3af"
          />
          <BottomSheetTextInput
            className="bg-[#303030] text-main p-3 rounded-lg mb-4"
            placeholder="2023-12-31"
            placeholderTextColor="#9ca3af"
          />
          <Text className="text-main mb-2">목표 설명</Text>
          <BottomSheetTextInput
            className="bg-[#303030] text-main p-3 rounded-lg mb-6"
            placeholder="목표를 입력하세요"
            placeholderTextColor="#9ca3af"
            multiline
          />
          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="flex-1 bg-transparent border border-gray-600 py-3 rounded-lg items-center"
              onPress={closeBottomSheet}
            >
              <Text className="text-main font-medium">취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-[#3B82F6] py-3 rounded-lg items-center"
              onPress={() => {
                closeBottomSheet();
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
