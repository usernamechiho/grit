import { useState } from 'react';
import { View, Modal, Text } from 'react-native';

export default function Content() {
  const [showsModal, setShowsModal] = useState(false);

  return (
    <View>
      <Text className="text-white">zzz</Text>

      <Modal visible={showsModal} transparent={true} animationType="fade">
        <View>zzz</View>
      </Modal>
    </View>
  );
}
