import { View } from "react-native";
import React from "react";
import { Expense } from "../types";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

type Props = {
  expenses?: Expense[];
  period: string;
};

const DUMMYEX: Expense[] = [
  {
    id: "e1",
    description: "a pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "tv",
    amount: 109.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e3",
    description: "ps5",
    amount: 499.99,
    date: new Date("2021-11-19"),
  },
  {
    id: "e4",
    description: "food",
    amount: 59.99,
    date: new Date("2025-8-12"),
  },
];

export default function ExpensesOutput({ expenses, period }: Props) {
  return (
    <View>
      <ExpensesSummary expenses={DUMMYEX} period={period} />
      <ExpensesList expenses={DUMMYEX} />
    </View>
  );
}
