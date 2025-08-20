import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Expense } from "../types";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../constants/styles";

type Props = {
  expenses: Expense[];
  period: string;
  fallbackText: string;
};

export default function ExpensesOutput({
  expenses,
  period,
  fallbackText,
}: Props) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period} />
      {content}
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
  infoText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginTop: 32,
  },
});
