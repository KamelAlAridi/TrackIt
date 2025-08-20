import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { Children, ReactNode } from "react";
import { GlobalStyles } from "../constants/styles";

type Props = {
  children: ReactNode;
  onPress: () => void;
  mode: string;
};

export default function Button({ children, onPress, mode }: Props) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
