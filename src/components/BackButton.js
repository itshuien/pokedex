import React from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function BackButton({ onPress }) {
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      color="black"
      onPress={onPress}
      style={{ marginBottom: 16 }}
    />
  )
}
