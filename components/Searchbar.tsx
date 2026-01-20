import { icons } from "@/assets/constants/icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
interface Props {
  placeholder: string;
  onPress: () => void;
  onChangeText?: (text:string) => void;
  value?: string;
}

const Searchbar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-100 rounded-full px-5 py-1 mb-6">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        className="flex-1 ml-2 text-white"
        onChangeText={onChangeText}
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({});
