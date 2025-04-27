import React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  targetDate: string;
  description: string;
}

export default function DDayCard({ targetDate, description }: Props) {
  // D-day 계산
  const calculateDDay = () => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `D-${diffDays}`;
    if (diffDays === 0) return 'D-Day';
    return `D+${Math.abs(diffDays)}`;
  };

  // 날짜 포맷팅 (ex: 2023년 6월 15일)
  const formattedDate = () => {
    try {
      return format(new Date(targetDate), 'yyyy년 M월 d일', { locale: ko });
    } catch (e) {
      return targetDate.slice(0, 10);
    }
  };

  const dday = calculateDDay();
  const isPast = dday.includes('D+');

  return (
    <View className="bg-[#1A1A1A] rounded-xl mb-4 border pl-4 pr-4 border-[#333333] h-[80px] flex justify-center">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-white text-lg font-semibold">{formattedDate()}</Text>
        <Text className={`text-xl font-bold ${isPast ? 'text-red-300' : 'text-blue-400'}`}>{dday}</Text>
      </View>
      <Text className="text-[#BBBBBB] text-base leading-5">{description}</Text>
    </View>
  );
}
