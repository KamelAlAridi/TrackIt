import { StyleSheet, View } from "react-native";
import React from "react";
import { Expense } from "../types";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../constants/styles";

type Props = {
  expenses: Expense[];
  period: string;
};

export default function ExpensesOutput({ expenses, period }: Props) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
