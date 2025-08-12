import { View, Text, FlatList } from "react-native";
import React from "react";
import { Expense } from "../types";

type Props = {
  expenses: Expense[];
};

function renderExpenseItem(itemData: { item: Expense }) {
  return <Text>{itemData.item.description}</Text>;
}

export default function ExpensesList({ expenses }: Props) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}
