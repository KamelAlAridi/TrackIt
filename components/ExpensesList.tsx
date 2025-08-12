import { View, Text, FlatList } from "react-native";
import React from "react";
import { Expense } from "../types";
import ExpenseItem from "./ExpenseItem";

type Props = {
  expenses: Expense[];
};

function renderExpenseItem(itemData: { item: Expense }) {
  return <ExpenseItem expense={itemData.item} />;
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
