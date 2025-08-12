import { View, Text } from "react-native";
import React from "react";
import { Expense } from "../types";

type Props = {
  period: string;
  expenses: Expense[];
};

export default function ExpensesSummary({ expenses, period }: Props) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View>
      <Text>{period}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
