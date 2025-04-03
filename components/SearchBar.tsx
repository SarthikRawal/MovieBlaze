import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface SearchBarProps {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: SearchBarProps) => {

  return (
    <View className="flex flex-row rounded-full items-center px-5 py-4 bg-dark-100">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        placeholder={placeholder}
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  )
};

export default SearchBar;
