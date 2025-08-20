import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackNavParams } from "../types";

type Props = NativeStackScreenProps<stackNavParams, "ManageExpense">;

export default function ManageExpense({ route, navigation }: Props) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>ManageExpense</Text>
    </View>
  );
}
