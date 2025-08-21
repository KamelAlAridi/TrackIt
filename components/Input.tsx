import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";

type Props = {
  label: string;
  textInputConfig?: TextInputProps;
};

export default function Input({ label, textInputConfig }: Props) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
}
