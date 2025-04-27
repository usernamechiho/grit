import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDDay = async (targetDate: string, description: string) => {
  try {
    const prev = await AsyncStorage.getItem('d-day');
    const arr = prev ? JSON.parse(prev) : [];
    arr.push({ targetDate, description });
    await AsyncStorage.setItem('d-day', JSON.stringify(arr));
  } catch (e) {
    console.error('AsyncStorage 저장 에러:', e);
  }
};

// 불러오기 함수
export const loadDDays = async () => {
  const data = await AsyncStorage.getItem('d-day');
  return data ? JSON.parse(data) : [];
};

export const deleteDDay = async (idx: number) => {
  const prev = await AsyncStorage.getItem('d-day');
  const arr = prev ? JSON.parse(prev) : [];
  arr.splice(idx, 1);
  await AsyncStorage.setItem('d-day', JSON.stringify(arr));
};
